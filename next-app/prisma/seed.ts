import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = await prisma.category.createMany({
      data: [
        { title: 'Web3' },
        { title: 'Programming' },
        { title: 'Design' },
        { title: 'AI & ML' },
      ],
    });
  
    const rooms = await prisma.room.createMany({
      data: [
        { name: 'Room A', categoryId: 1 },
        { name: 'Room B', categoryId: 1 },
        { name: 'Room C', categoryId: 2 },
        { name: 'Room D', categoryId: 2 },
        { name: 'Room E', categoryId: 3 },
        { name: 'Room F', categoryId: 3 },
        { name: 'Room G', categoryId: 4 },
        { name: 'Room H', categoryId: 4 },
      ],
    });
  
    console.log({ categories, rooms });
  }
  
  main()
    .catch(e => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });