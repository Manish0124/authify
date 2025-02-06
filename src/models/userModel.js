import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  
    username:{
        type:String,
        required:[true,"please provide a username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpire:Date,
    verifyToken:String,
    verifyTokenExpire:Date


})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;