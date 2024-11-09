import React from 'react'
import Chat from './Chat'
import Players from './Players'
import RoomSelector from './RoomSelector'

function ChatPage() {
  return (
    <div className="w-full h-screen p-6 border-red-400 border flex flex-col md:flex-row items-start justify-between gap-6">
   
    <div className="h-full w-full md:w-1/3 rounded-lg border  hidden md:block">
        <RoomSelector />
    </div>

   
    <div className="h-full w-full md:w-2/3">
        <Chat />
    </div>

    
    <div className="h-full w-full md:w-1/3 rounded-lg border  hidden md:block">
        <Players />
    </div>
</div>

  )
}

export default ChatPage