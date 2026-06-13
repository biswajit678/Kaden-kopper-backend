import mongoose from "mongoose";

const ConnectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    }catch(error){
    console.error("Error connecting to MongoDB");
    }
}

export default ConnectDB;