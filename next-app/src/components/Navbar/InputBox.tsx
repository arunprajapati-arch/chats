import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function InputBox() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="flex overflow-hidden rounded-full border border-input bg-background ring-offset-background">
        <div className="w-0.5 bg-lime-500"></div>
        <Input
          type="search"
          placeholder="Search..."
          className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="flex items-center">
          <span className="h-4 w-px bg-gray-300 mx-2"></span>
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            className="rounded-full mr-1"
          >
            <Search className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="w-0.5 bg-lime-500"></div>
      </div>
    </div>
  )
}