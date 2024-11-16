"use client"
import React, { useState } from 'react'
import { BackgroundGradient } from '../ui/background-gradient'

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
  console.log(rooms);
  
  return (
   <div>
       <Card className="font-medium p-4 h-64 w-56 flex items-start justify-between ">{title}
          <Dialog>
          <DialogTrigger asChild>
            <ChevronRightCircle size={34} className=' self-end cursor-pointer'  onClick={() => setIsDialogOpen(!isDialogOpen)}/>
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
                      <Button className="w-full" onClick={() => console.log(`Joining ${room} in ${room.name}`)}>
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