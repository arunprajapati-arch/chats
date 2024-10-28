import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  interface ItemProps {
    title: string;
    content: string;
    
  }
export default function Cards({title,content}:ItemProps){
    return(
        <Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  
  </CardHeader>
  <CardContent>
    <p>{content}</p>
  </CardContent>
  
</Card>

    );
}