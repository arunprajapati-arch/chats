import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = await prisma.category.createMany({
      data: [
        { title: 'Web2' },
        { title: 'Android' }
        // { title: 'Design' },
        // { title: 'AI & ML' },
      ],
    });
  
    const rooms = await prisma.room.createMany({
      data: [
        { name: 'Room A', categoryId: 5 },
        { name: 'Room B', categoryId: 5 },
        { name: 'Room C', categoryId: 5 },
        { name: 'Room D', categoryId: 6 },
        { name: 'Room E', categoryId: 6 }
        // { name: 'Room F', categoryId: 3 },
        // { name: 'Room G', categoryId: 4 },
        // { name: 'Room H', categoryId: 4 },
      ],
    });
  
    console.log({ categories, rooms });
  }
  
  main()
    .catch(e => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });