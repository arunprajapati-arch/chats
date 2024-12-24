
import React, { useState } from 'react'
import client from "@/db"
import CustomCard from '@/components/Hero/CustomCard';
import { Card } from '../ui/card';
import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';
import CreateRoomCard from './CreateRoomCard';

 
  
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
     
     
      <div className="flex flex-wrap justify-center gap-10     ">
        {roomData?.name.map((room,index) => (
          <div key={index}  className="">
            
            <CustomCard title={room.title} rooms={room.rooms}/>
            
          </div>
          
          
        ))}
        
        <CreateRoomCard/>
      </div>
     
   
    )
    }

export default RoomCards