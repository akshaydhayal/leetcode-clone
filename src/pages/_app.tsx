import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { dbConnect } from "@/utils/dbConnect";
import mongoose from "mongoose";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const firebaseConfig = {
    apiKey: "AIzaSyD06oU0fXpnzlsk_z8XcR4JXqX2mPMHdBA",
    authDomain: "leetcode-clone-e41a9.firebaseapp.com",
    projectId: "leetcode-clone-e41a9",
    storageBucket: "leetcode-clone-e41a9.appspot.com",
    messagingSenderId: "777879934323",
    appId: "1:777879934323:web:2dc63aaccbc0ebe426e106",
    measurementId: "G-XZ78GEWBK8",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // dbConnect();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        {/* <div className="m-0 p-0 bg-gray-900"> */}
        <div className="m-0 p-0 bg-cover bg-center bg-fixed bg-[url('https://images.unsplash.com/photo-1470955233021-2c79a52e5034?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
          <Toaster />
          <Navbar />
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </SessionProvider>
  );
}
