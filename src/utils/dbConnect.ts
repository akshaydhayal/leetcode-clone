import mongoose from "mongoose";
let alreadyConnected=false;

export async function dbConnect(){
    if(alreadyConnected){
        return;
    }
    alreadyConnected=true;
    console.log("hello from dbConnect");
    await mongoose
      .connect(process.env.NEXT_PUBLIC_MONGO_URL, {
        dbName: "Leetcode",
      })
      .then(() => {
        console.log("mongoose connected!!");
      });
}