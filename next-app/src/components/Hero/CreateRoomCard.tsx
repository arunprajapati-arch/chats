import React from 'react'
import { Card } from '../ui/card'
import { PlusCircle } from 'lucide-react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

function CreateRoomCard() {
  return (
    <Card className=' w-full h-96 max-w-sm flex items-center justify-between flex-col gap-4  overflow-hidden transition-all hover:shadow-lg  bg-gradient-to-t from-emerald-700 to-emerald-300/10 '>
        
    <div className='flex items-center justify-center  w-full h-full'><PlusCircle size={92} className=' '/></div>
    <Dialog>
        <DialogTrigger asChild>
    <Button className='w-full font-bold text-lg bg-emerald-300'>Create/Join a Room</Button>
    </DialogTrigger>
    <DialogContent>
        pending
    </DialogContent>
    </Dialog>
    </Card>
  )
}

export default CreateRoomCard