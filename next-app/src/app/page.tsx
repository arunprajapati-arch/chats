"use client"

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar";
import { UserDashboard } from "@/components/Dashboard/UserDashboard";

export default function Home() {
  const session = useSession();
  return (
    <>
     <UserDashboard/>
   {/* <Navbar/>
    <Hero/>
    <div>
      {JSON.stringify(session)}
    </div>
    <div>
    <button onClick={() => signIn()}>Signin</button>
    <button onClick={() => signOut()}>Sign out</button>
  </div> */}
    </>
  );
}
