"use client"

import * as React from "react"
import CategoryScroll from "./CategoryScroll"

const categories = [
  {
    name: "Web2",
    items: [
      "Smartphones", "Laptops", "Tablets", "Smartwatches", "Headphones",
      "Cameras", "TVs", "Gaming Consoles", "Speakers", "Drones",
      "E-readers", "Printers", "Monitors", "Keyboards", "Mice",
      "External Hard Drives", "Routers", "Smart Home Devices", "Projectors", "Graphic Cards"
    ]
  },
  {
    name: "Web3",
    items: [
      "T-shirts", "Jeans", "Dresses", "Jackets", "Sweaters",
      "Shoes", "Hats", "Socks", "Underwear", "Accessories",
      "Skirts", "Pants", "Blouses", "Coats", "Swimwear",
      "Activewear", "Suits", "Ties", "Scarves", "Gloves"
    ]
  },
  {
    name: "Android",
    items: [
      "Furniture", "Kitchenware", "Bedding", "Lighting", "Decor",
      "Garden Tools", "Plants", "Outdoor Furniture", "Rugs", "Curtains",
      "Appliances", "Storage Solutions", "Bathroom Accessories", "Wall Art", "Clocks",
      "Vases", "Throw Pillows", "Candles", "Picture Frames", "Planters"
    ]
  }
]

export default function Slides() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 p-4">
      {categories.map((category) => (
        <CategoryScroll key={category.name} category={category} />
      ))}
    </div>
  )
}

