import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { motion } from "framer-motion";

  interface ItemProps {
    title: string;
    content: string;
    
  }
export default function Cards({title,content}:ItemProps){
    return(
      <motion.div drag >
        <Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  
  </CardHeader>
  <CardContent>
    <p>{content}</p>
  </CardContent>
  
</Card>

      </motion.div>
        
    );
}