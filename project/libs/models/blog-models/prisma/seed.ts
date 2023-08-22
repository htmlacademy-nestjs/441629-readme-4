import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.tag.upsert({
    where: { tagId: 1 },
    update: {},
    create: {
      title: 'тест',
      posts: {
        create: [
          {
            postType: 'text',
            title: 'Первая пробная публикация',
            userId: '10',
            preview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse enim, incidunt veniam facilis officia consequatur earum mollitia veritatis iste laborum aliquam, voluptatem provident. Expedita temporibus aspernatur reiciendis quia dicta laudantium!',
          },
        ]
      },
    }
  });
  await prisma.tag.upsert({
    where: { tagId: 2 },
    update: {},
    create: {
      title: 'эйнштейн',
      posts: {
        create: [
          {
            postType: 'quote',
            text: 'Стремитесь не к успеху, а к ценностям, которые он дает',
            userId: '10',
            author: 'Альберт Эйнштейн',
            comments: {
              create: [
                {
                  message: 'Интересная мысль, надо запомнить.',
                  userId: '11',
                },
              ]
            },
          },
          {
            postType: 'quote',
            text: 'Логика может привести Вас от пункта А к пункту Б, а воображение — куда угодно.',
            userId: '12',
            author: 'Альберт Эйнштейн',
          },
        ]
      }
    },
  });
  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
