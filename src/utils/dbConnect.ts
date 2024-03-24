import mongoose from "mongoose";
let alreadyConnected=false;

export async function dbConnect(){
    if(alreadyConnected){
        return;
    }
    alreadyConnected=true;
    console.log("hello from dbConnect");
    await mongoose.connect("mongodb+srv://akshay:akshay@cluster0.jy7weei.mongodb.net/",{
        dbName:"Leetcode"
    }).then(()=>{
        console.log("mongoose connected!!");
    })
}