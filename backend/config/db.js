import mongoose from "mongoose";
 export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://ahad53344:ahad123@cluster0.czppess.mongodb.net/FlavourFleetIndia').then(()=>console.log("Db connected"));
}