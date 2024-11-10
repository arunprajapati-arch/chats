import React from 'react'


import Leaderboard from './Leaderboard';
import RoomCards from './RoomCards';



async function Hero() {
  
  
  
  
  return (
    <section className="grid lg:grid-cols-[1fr_300px] gap-12  rounded-lg border bg-card-foreground/5 p-8">
              <RoomCards/>
              <Leaderboard/>
            </section>
    
  )
}

export default Hero