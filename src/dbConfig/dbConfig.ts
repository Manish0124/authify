import mongoose from "mongoose";

export async function connect(){
    try {

      await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("Monogdb connected")
        })

        connection.on('error',(err)=>{
            console.log("Mongodb connection error , make sure mongodb is running" + err)
            process.exit()
        })
        
    } catch (error) {
        console.log("error while connecting to db")
        console.log(error)
    }
}