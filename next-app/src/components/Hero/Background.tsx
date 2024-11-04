import React from 'react'
// Supports weights 400-700
import '@fontsource-variable/cabin';

function Background() {
  return (
    <div className=' w-full h-screen fixed z-[2]  '>
        <h1 className=' text-[12vw]  leading-none tracking-tighter font-semibold text-zinc-400  absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]'>Chats...</h1>
    </div>
  )
}

export default Background