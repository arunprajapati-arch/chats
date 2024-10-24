
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Category {
    name: string;
    items: string[];
  }
  
  interface Props {
    category: Category;
  }
  


export default function CategoryScroll({ category }: Props) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(true)
  
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
      }
    }
  
    React.useEffect(() => {
      checkScroll()
      window.addEventListener('resize', checkScroll)
      return () => window.removeEventListener('resize', checkScroll)
    }, [])
  
    const scroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const scrollAmount = direction === 'left' ? -300 : 300
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        setTimeout(checkScroll, 300) // Check scroll after animation
      }
    }
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{category.name}</h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={checkScroll}
          >
            {category.items.map((item, index) => (
              <Link key={index} href={`/chat?item=${encodeURIComponent(item)}`}>
                <Card  className="w-[250px] h-[200px] flex-shrink-0">
                  <CardContent className="p-4 flex flex-col justify-center items-center h-full">
                    <h3 className="font-semibold text-lg text-center">{item}</h3>
                  </CardContent>
                </Card>
              </Link>
  
            ))}
          </div>
          {canScrollLeft && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-background"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll Left</span>
            </Button>
          )}
          {canScrollRight && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-background"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll Right</span>
            </Button>
          )}
        </div>
      </div>
    )
  }