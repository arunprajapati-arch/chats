'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChevronRight, Coffee, Rocket, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

interface CardProps {
  title?: string;
  imageUrl: string;
  reference: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
  rooms: string[];
}

export default function Component({
  title = "Static Card",
  imageUrl,
  reference,
  isMobile,
  rooms,
}: CardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryClick = () => {
    setSelectedCategory(rooms);
    setIsModalOpen(true);
  };

  return (
    <motion.div drag={isMobile} dragConstraints={reference}>
      <Card className="w-80 rounded-[20px] shadow-lg">
        <CardHeader className="bg-lime-400 text-primary-foreground p-2 rounded-t-lg">
          <div className="flex items-center justify-between">
            <Coffee className="h-5 w-5" />
            <Zap className="h-5 w-5" />
            <Rocket className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent className="p-6 mt-6 flex items-center justify-center flex-col gap-8">
          <Avatar className='w-24 h-24'>
            <AvatarImage className='rounded-full' src={imageUrl} />
            <AvatarFallback><ChevronRight /></AvatarFallback>
          </Avatar>
          <h1 className='text-5xl font-bold'>{title}</h1>
        </CardContent>
        <CardFooter className="flex items-center justify-end mt-6">
          <motion.div>
            <Avatar className='cursor-pointer' onClick={handleCategoryClick}>
              <AvatarImage src="https://img.icons8.com/?size=100&id=QdQVkt5nSilU&format=png&color=000000" />
              <AvatarFallback><ChevronRight /></AvatarFallback>
            </Avatar>
          </motion.div>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title} Rooms</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedCategory.map((room, index) => (
              <div
                key={index}
                className="bg-secondary p-3 rounded-md text-secondary-foreground hover:bg-secondary/80 transition-colors flex justify-between items-center  "
              >
                {room}
                <Link
                href={`/chat?room=${encodeURIComponent(room)}`}>
                <Button size={'icon'} className=' rounded-full bg-lime-400'><ChevronRight/></Button>
                </Link>
              
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
