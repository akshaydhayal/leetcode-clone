import mongoose from "mongoose";

export async function dbConnect(){
    console.log("hello from dbConnect");
    await mongoose.connect("mongodb+srv://akshay:akshay@cluster0.jy7weei.mongodb.net/",{
        dbName:"Leetcode"
    }).then(()=>{
        console.log("mongoose connected!!");
    })
}