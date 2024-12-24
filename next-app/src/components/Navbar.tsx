"use client"

import { BotMessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"
import UserImage from "./UserImage";
import { Button } from "./ui/button";
import Link from 'next/link';

export default function Navbar(){
    const { data: session, status } = useSession();


    return(
        <nav className="  flex items-center justify-between   bg-emerald-300/10 rounded-3xl md:h-24 p-4 md:p-8">
            <div className=" flex items-center justify-center gap-2">
         <BotMessageSquare size={48} className=" text-emerald-300" />
         <h1 className="font-bold text-3xl tracking-tighter">Chats</h1>
         {/* {JSON.stringify(status)} */}
         
            </div>

            <div>
               
    {session?(<div className="flex items-center justify-center gap-2"><Link href={"/dashboard"}><Button className="hidden md:block bg-emerald-300">Dashboard</Button></Link><UserImage/></div> ):(<button className="bg-emerald-300  p-4 py-2 rounded-md text-black font-semibold text-2xl shadow-md shadow-emerald-600 hover:bg-emerald-500" onClick={() => signIn()}>Login</button>)}
    
  </div>

        </nav>
    );
}