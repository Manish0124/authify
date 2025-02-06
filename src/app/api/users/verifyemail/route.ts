import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {

    console.log("recieved request");
    
     
    const reqBody =  await request.json()

    const {token} = reqBody
    console.log("Recieved token" , token);
  
    const user = await User.findOne({ verifyToken: { $exists: true } });

  //  const user =  await User.findOne({verifyToken:token,  verifyTokenExpire:{ $gt: Date.now() } });

   console.log(user);

   if(!user){
    console.log("invalid token");
    
    return NextResponse.json({error:"invalid token"}, {status:400})
   }

   console.log("user found : ",user);

   user.isVerified = true
   user.verifyToken = undefined
   user.verifyTokenExpire = undefined
 
   await user.save()

   console.log("User verified and saved");

   return NextResponse.json({
    message: "Email verifed successfully",
    success: true
   }, {status:200})
    


  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
