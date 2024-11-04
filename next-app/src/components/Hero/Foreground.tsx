import React, { useRef } from 'react'
import Cards from './Cards'
import Image from 'next/image';
import { useMediaQuery } from "react-responsive";

interface RoomCategory {
    id: number;
    name: string;
    imageUrl:string;
    rooms: string[];
  }

  // Sample data for room categories and rooms
const roomCategories: RoomCategory[] = [
    { id: 1, name: "Web2", imageUrl:"https://w7.pngwing.com/pngs/280/135/png-transparent-web-page-domain-name-internet-web-2-world-wide-web-thumbnail.png", rooms: ["Javascript", "Typescript"] },
    { id: 2, name: "Web3",imageUrl:"https://imgs.search.brave.com/6dsq5tqhS6N6WqreaJARq8EVKmDJIUA9Rj-CKa8jwRE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvd2Vi/LTMwLTNkLWljb24t/ZG93bmxvYWQtaW4t/cG5nLWJsZW5kLWZi/eC1nbHRmLWZpbGUt/Zm9ybWF0cy0tMy13/ZWJzaXRlLW9ubGlu/ZS1icm93c2VyLWlu/dGVybmV0LXBhY2st/bmV0d29yay1jb21t/dW5pY2F0aW9uLWlj/b25zLTk1NTU4MjYu/cG5nP2Y9d2VicA",  rooms: ["Solana", "Etherium", "Bitcoin"] },
    { id: 3, name: "Android", imageUrl:"https://imgs.search.brave.com/j3vhR1fSyRfj2vbcB6mlYRIQ-nu_rhHnnnMKxB5PXEI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL2FuZHJvaWQt/cG5nLWFuZHJvaWQt/bG9nby1wbmctMTAy/NC5wbmc", rooms: ["Flutter", "Kotlin"] },
     ]

 

function Foreground() {
    const ref = useRef(null);
    const isMobile = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <div ref={ref}  className='fixed top-0 left-0 z-[3] py-10 w-full h-screen flex justify-center items-center flex-wrap gap-5 overflow-y-auto  overflow-x-hidden  '>
       
       {roomCategories.map((category) => (
         <Cards
         key={category.id}
         title={category.name}
         imageUrl={category.imageUrl}
         reference={ref}
         isMobile={isMobile}
         rooms={category.rooms}
         /> 
       )) }
    </div>
    )
}

export default Foreground