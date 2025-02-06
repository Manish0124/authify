import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helpers/mailer'
import crypto from 'crypto';



connect();


export async function POST(request:NextRequest){
    try {
         
       const reqBody = await request.json()
       const {username, email,password} = reqBody

       //validation
       console.log(reqBody)

       const user = await User.findOne({email})

       if(user){
         return NextResponse.json({error:"user already exits"}, {status:400})
       }

       const salt = await bcryptjs.genSalt(10)
       const hashedpassword = await bcryptjs.hash(password,salt)

       //generate verification token 
       const verifyToken = crypto.randomBytes(32).toString("hex");
       const hashedVerifyToken = await bcryptjs.hash(verifyToken, 10);
       
       const newUser = new User({
          username,
          email,
          password:hashedpassword,
          verifyToken: hashedVerifyToken,  // Store hashed token in DB
          verifyTokenExpire: new Date(Date.now() + 60 * 60 * 1000)
       })

       const savedUser = await newUser.save()
       console.log(savedUser);

       const userId = savedUser._id
       console.log(userId);
       
       
       //send verification email
       await sendEmail({email,emailType:'VERYFY',userId:savedUser._id})

       return NextResponse.json({message:"user registered successfully",
        success:true,
        savedUser
       },
         

       )

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}