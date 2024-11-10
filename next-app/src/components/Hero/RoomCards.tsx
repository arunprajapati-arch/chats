
import React, { useState } from 'react'
import client from "@/db"
import { BackgroundGradient } from '../ui/background-gradient';
import { Button } from '../ui/button';
import { ChevronRightCircle, ChevronRightCircleIcon } from 'lucide-react';
import {Card} from '@/components/ui/card';

import CustomCard from '@/components/Hero/CustomCard';

 
  
  async function getRoomTitles() {
    try {
      const roomTitles = await client.category.findMany({
        select: {
          title: true, 
          rooms: {
            select: {
              name: true, // Only select the 'name' field for each room
            },
          }, 
        },
      });
      console.log(JSON.stringify(roomTitles, null, 2));
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
     
      <section className="grid gap-4">
      <h2 className="text-lg font-semibold"> Rooms</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roomData?.name.map((room,index) => (
          <div key={index}  className=" ">
            <CustomCard title={room.title} rooms={room.rooms}/>
          </div>
        ))}
      </div>
    </section>
   
    )
    }

export default RoomCards