import {NextApiResponse,NextApiRequest} from "next";
import { Problem } from "@/db";
import mongoose from "mongoose";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
  if(req.method==='GET'){
    let problems=await Problem.find().populate("last_user_solved");
    res.status(201).json(problems);
  }
  if(req.method==='POST'){
    let problem=new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  }  
}