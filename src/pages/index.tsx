import { dbConnect } from "@/utils/dbConnect";
import { Inter } from "next/font/google";
// import { initializeApp } from "firebase/app";
import mongoose from "mongoose";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // dbConnect();
  // mongoose.connect("mongodb+srv://akshay:akshay@cluster0.jy7weei.mongodb.net/")
  //   .then(() => {
  //     console.log("mongoose connected!!");
  //   });

  return (
  <div>
    {/* <Navbar/> */}
    Hello
  </div>)
}
