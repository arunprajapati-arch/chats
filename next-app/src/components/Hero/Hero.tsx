import React from 'react'


import Leaderboard from './Leaderboard';
import RoomCards from './RoomCards';



async function Hero() {
  
  
  
  
  return (
    <section className=" 2xl:h-screen flex items-center justify-center rounded-2xl bg-emerald-300/10 p-8   ">
     
       <div className='w-full '><RoomCards/></div> 
             
           {/* <div className=' '><Leaderboard/> </div>   */}
      
          
            </section>
    
  )
}

export default Hero