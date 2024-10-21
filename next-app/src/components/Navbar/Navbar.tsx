"use client"
import { BotMessageSquare, Icon, Search } from 'lucide-react';
import { ModeToggle } from '../ui/mode-toggle';
import { Button } from '../ui/button';
import { Input } from "../ui/input"
import InputBox from './InputBox';
export default function Navbar(){
    return(
        <>
        <nav className=' w-full p-4 flex items-center justify-between '>
            <div  ><BotMessageSquare size={50} className=' rounded-lg p-2 text-lime-400  border border-input bg-background hover:bg-accent hover:text-accent-foreground  cursor-pointer' /></div>
            <div className=' flex items-center justify-center gap-5 rounded-lg p-2 px-4   border border-input bg-background '>
                <a href="">dfd</a>
                <a href="">dfd</a>
                <InputBox/>
                <a href="">dfd</a>
            </div>
            <div><ModeToggle/></div>
        </nav>
        </>
    );
}