
import React, { useState } from 'react'
import client from "@/db"
import CustomCard from '@/components/Hero/CustomCard';

 
  
  async function getRoomTitles() {
    try {
      const roomTitles = await client.category.findMany({
        select: {
          title: true, 
          rooms: {
            select: {
              id:true,
              name: true, 
            },
          }, 
        },
      });
      // console.log(JSON.stringify(roomTitles, null, 2));
      return {
        
        
        name: roomTitles,
        
      }
      
      
      
    }  catch(e) {
      console.log(e);
    }
  }

    async function RoomCards() {

      const roomData = await getRoomTitles();
      

    return (
     
     
      <div className="min-h-full    grid md:grid-cols-2 lg:grid-cols-3  content-evenly  gap-16         ">
        {roomData?.name.map((room,index) => (
          <div key={index}  className="">
            
            <CustomCard title={room.title} rooms={room.rooms}/>
          </div>
          
        ))}
        
      </div>
     
   
    )
    }

export default RoomCards