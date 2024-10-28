"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Cards from "@/components/Cards";
import { useState } from "react";

const data = [
    { id: 1, title: 'Web3', content: 'Explore the decentralized web.' },
    { id: 2, title: 'Programming', content: 'Discuss various programming languages and techniques.' },
    { id: 3, title: 'Design', content: 'Share and critique design projects.' },
    { id: 4, title: 'AI & ML', content: 'Dive into artificial intelligence and machine learning.' },
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
                            <Cards title={item.title} content={item.content} />
                        </PopoverTrigger>
                        <PopoverContent className="w-80 pointer-events-auto">
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold mb-2">{item.title} Rooms</h2>
                                <div className="flex items-center justify-between ">
                                    <h3 >Room 1</h3>
                                    <Button>Join</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 >Room 2</h3>
                                    <Button>Join</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ))}
        </div>
    );
}