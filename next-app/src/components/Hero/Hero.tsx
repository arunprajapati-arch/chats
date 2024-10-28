"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Cards from "@/components/Hero/Cards";
import { useState } from "react";


const data = [
    { id: 1, title: 'Web3', rooms: ['Room A', 'Room B'] },
    { id: 2, title: 'Programming', rooms: ['Room C', 'Room D'] },
    { id: 3, title: 'Design', rooms: ['Room E', 'Room F'] },
    { id: 4, title: 'AI & ML', rooms: ['Room G', 'Room H'] },
];

export default function Hero() {
    const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

    const handlePopoverOpenChange = (open: boolean, id: number) => {
        setOpenPopoverId(open ? id : null);
    };

    return (
        <div className={`flex flex-wrap items-center justify-center gap-10 ${openPopoverId !== null ? 'blur-sm pointer-events-none' : ''}`}>
            {data.map((item) => (
                <div key={item.id} className={`dynamic-div ${openPopoverId === item.id ? 'pointer-events-auto' : ''}`}>
                    <Popover onOpenChange={(open) => handlePopoverOpenChange(open, item.id)}>
                        <PopoverTrigger>
                            <Cards title={item.title} content={`Rooms available: ${item.rooms.length}`} />
                        </PopoverTrigger>
                        <PopoverContent className="w-80 h-auto overflow-x-auto pointer-events-auto">
                            <h2 className="text-xl font-bold mb-2">{item.title} Rooms</h2>
                            <div className="space-y-4">
                                {item.rooms.map((room, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <h3>{room}</h3>
                                        <Button>Join</Button>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ))}
        </div>
    );
}
