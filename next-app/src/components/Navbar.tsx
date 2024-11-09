"use client"

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"

export default function Navbar(){
    const session = useSession();


    return(
        <nav className=" flex items-center justify-between fixed z-10">
            <div>
            {JSON.stringify(session)}
            </div>
            <div>
    <button onClick={() => signIn()}>Signin</button>
    <button onClick={() => signOut()}>Sign out</button>
  </div>

        </nav>
    );
}