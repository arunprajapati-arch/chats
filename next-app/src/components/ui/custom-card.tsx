// CustomCard.tsx
import { motion } from 'framer-motion';
import React from 'react';

function CustomCard(){
  return(
    <motion.div drag className=' relative w-60 h-72 bg-lime-400 rounded-[3vw] overflow-hidden'>
      {/* <p>dfdjfndjfndj</p> */}
      <div className=' bg-sky-300 absolute bottom-0 left-0 w-full py-5'></div>
    </motion.div>
  )
  
}

export default CustomCard;
