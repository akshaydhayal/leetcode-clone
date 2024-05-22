import { dbConnect } from "@/utils/dbConnect";
import { Inter } from "next/font/google";
// import { initializeApp } from "firebase/app";
import mongoose from "mongoose";
import Navbar from "@/components/Navbar";
// import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

import { Space_Mono } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
const space_mono = Space_Mono({ subsets: ["latin"],weight:"700" });

import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  // dbConnect();
  // mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL,{
  //       dbName: "Leetcode",
  //     })
  //   .then(() => {
  //   console.log("mongoose connected!!");
  // });
  
  // useEffect(() => {
  //   // Check if the current path is "/"
  //   if (router.pathname === "/") {
  //     // Redirect to "/hello-nextjs"
  //     router.push("/problems");
  //   }
  // }, [router]);

  useEffect(()=>{
    async function hello(){
      const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hello`,{
        method:"GET"
      });
    }
    hello();
  },[]);

  return (
    // <div className="w-screen h-[90vh] flex bg-cover bg-center bg-fixed bg-[url('https://images.unsplash.com/photo-1470955233021-2c79a52e5034?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
    <div className="w-screen h-[90vh] flex">
      {/* <div className="w-screen h-[90vh] bg-gradient-to-r from-purple-500 to-pink-500"> */}
      {/* {router.push('/problems')} */}
      {/* <Navbar/> */}
      <div className="w-1/2 flex flex-col justify-center px-12 gap-8">
        <p className="text-5xl font-bold tracking-wide leading-tight text-slate-100 font-serif">
          Master the Art of 
          <span className="bg-gradient-to-r from-purple-500 to-pink-400 inline-block text-transparent bg-clip-text">
          {"{Coding} "} </span> with User Friendly Design
          {/* <span className="text-pink-300">Friendly</span> Design */}
        </p>

        {/* <p className="text-5xl font-bold tracking-widest text-slate-100 space_mono.className">
          Master the Art of Coding with our User Friendly Design
        </p> */}
        <p className="text-lg font-semibold text-slate-100 space_mono.className">
          Learn to code with ease on our comprehensive website,featuring coding
          problems to practise & get prepared for coding interviews.
        </p>

        {/* <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 w-max px-8 rounded-lg font-semibold text-lg text-white">
          Try for Free
        </button>
        <button className="bg-gradient-to-r from-violet-400 to-fuchsia-600 p-2 w-max px-8 rounded-lg font-semibold text-lg text-white">
          Try for Free
        </button> */}
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 w-max px-8 rounded-lg font-semibold text-lg
         text-slate-100 space_mono.className"
          onClick={() => {
            router.push("/signin");
          }}
        >
          Try for Free
        </button>
      </div>
      <div className="w-1/2 flex items-center px-16">
        <img src="https://cdn.codechef.com/images/home/coding_boy.svg" />
      </div>
    </div>
  );
}
