import React from 'react'


import Leaderboard from './Leaderboard';
import RoomCards from './RoomCards';



async function Hero() {
  
  
  
  
  return (
    <section className="  2xl:h-screen  flex justify-center lg:justify-around  rounded-2xl bg-emerald-300/10 p-8  ">
     
       <div><RoomCards/></div> 
             
           <div className=' '><Leaderboard/> </div>  
      
          
            </section>
    
  )
}

export default Hero