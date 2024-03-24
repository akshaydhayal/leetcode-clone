import {NextApiRequest,NextApiResponse} from "next";
import { User } from "@/db";

export default async function handlert(
    req:NextApiRequest,res:NextApiResponse
){
    if(req.method==='GET'){
        console.log("email in user api"+req.headers.email);
        // console.log("username in user api"+req.headers.username);
        // const user=await User.findOne({username:req.headers.username})
        const user=await User.findOne({email:req.headers.email})
        console.log("user found in user api"+user);
        if(user){
            res.status(201).json({user:user});
        }else{
            res.status(201).json({user:null});
        }
    }
}