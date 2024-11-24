"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronRightCircle, Users } from 'lucide-react';
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
  
  
  return (
   <div>
       <Card className="  p-4  flex flex-col items-center justify-between rounded-3xl bg-slate-900 border border-emerald-400 ">
        <div className='flex flex-col items-center justify-evenly w-56 h-64 space-x-2 md:mx-4  '>
        <h1 className=' font-bold text-2xl text-emerald-300 tracking-tight'>{title}</h1>
        <div className=' relative w-40 h-32'>
        <Image className=' rounded-lg  '
        src="https://static.vecteezy.com/system/resources/previews/002/214/642/non_2x/web-designer-and-programmer-free-vector.jpg"
        alt='none'
       fill={true}
        />
        </div>
      </div>
        
          <Dialog>
          <DialogTrigger asChild>
            <ChevronRightCircle size={48} className='  self-end cursor-pointer hover:text-emerald-300  '  onClick={() => setIsDialogOpen(!isDialogOpen)}/>
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
                      <Button className="w-full" onClick={() => console.log(`${room.name}`)}>
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