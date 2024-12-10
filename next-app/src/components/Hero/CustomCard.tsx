"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronRightCircle, PlayCircle, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '../ui/button';
import Link from 'next/link';

interface Room {
  id:number
  name: string;
}

interface CategoryProps {
  title: string;
  rooms: Room[];
}

function CustomCard({title,rooms}:CategoryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const imageUrl = "https://files.prepinsta.com/2023/06/TCS-Digital-Coding-Question.webp"
  return (
   <div className='' >
       <Card className="   w-full max-w-sm flex items-center flex-col gap-4  overflow-hidden transition-all hover:shadow-lg  bg-gradient-to-t from-emerald-700 to-emerald-300/10   ">
       
        
        
        
        <img
          alt={title}
          className="object-cover w-full h-full ml-8 overflow-hidden transition-transform hover:scale-105 rounded-l-full"
          height="200"
          src={imageUrl}
          style={{
            aspectRatio: "300/200",
            objectFit: "cover",
            filter: "brightness(1.2) contrast(1.1)",
          }}
          width="300"
        />
        
       
        <h1 className=' font-bold  text-3xl  text-emerald-50 tracking-tighter'>{title}</h1>
      
        
          <Dialog>
          <DialogTrigger asChild>
            
          <div className="flex w-full space-x-2 ">
          <Button className="flex-1 bg-emerald-300 font-bold text-xl" variant="default" onClick={() => setIsDialogOpen(!isDialogOpen)}>            
            Rooms
            <ChevronRightCircle className="w-4 h-4 mr-2" />
            </Button>
            </div>
            {/* <ChevronRightCircle size={48} className='  self-end cursor-pointer hover:text-emerald-300  '  onClick={() => setIsDialogOpen(!isDialogOpen)}/> */}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{title} Rooms</DialogTitle>
                <DialogDescription>Select a room to join the conversation</DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[300px] w-full pr-4">
                {rooms.map((room, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <CardDescription>
                        <Users className="inline mr-2" size={16} />
                        {Math.floor(Math.random() * 50) + 1} users online
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Link href={`/chat?room=${encodeURIComponent(room.id)}`}>
                      <Button className="w-full bg-emerald-300" onClick={() => console.log(`${room.name}`)}>
                        Join Room
                      </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </Card>
        
       </div>
        
  )
}

export default CustomCard