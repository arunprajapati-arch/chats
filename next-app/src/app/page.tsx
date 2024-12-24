import Hero from "@/components/Hero/Hero";
import Leaderboard from "@/components/Hero/Leaderboard";
import Navbar from "@/components/Navbar";
import TestSignInComponent from "@/components/test-sign-in";
import Component from "@/components/test-sign-in";
import { Card } from "@/components/ui/card"










export default function Home() {

 
  return (
    <>
   
   <div className=" w-full h-screen flex flex-col  gap-8 md:p-12 bg-background  ">
    <Navbar/>
      <Hero/>
      
    </div>
    {/* <TestSignInComponent/> */}
 
    
 
    </>
  );
}
