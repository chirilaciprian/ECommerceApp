import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Generate 10 users
    const users = [];
    for (let i = 0; i < 100; i++) {
        users.push({
            id: faker.string.uuid(),
            email: faker.internet.email(),
            username: faker.internet.username(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
        });
    }

    // Insert users into the database
    await prisma.user.createMany({ data: users });
    console.log('10 users have been created.');

    // Fetch all products (assuming products already exist in the database)
    const products = await prisma.product.findMany();
    if (products.length === 0) {
        throw new Error('No products found in the database.');
    }

    // Generate 50 unique reviews
    const reviews = [];
    const reviewedProducts: { [userId: string]: Set<string> } = {};

    for (let i = 0; i < 1000; i++) {
        let randomUser;
        let randomProduct;

        do {
            randomUser = faker.helpers.arrayElement(users);
            randomProduct = faker.helpers.arrayElement(products);

            if (!reviewedProducts[randomUser.id]) {
                reviewedProducts[randomUser.id] = new Set();
            }
        } while (reviewedProducts[randomUser.id].has(randomProduct.id));

        reviewedProducts[randomUser.id].add(randomProduct.id);

        reviews.push({
            id: faker.string.uuid(),
            userId: randomUser.id,
            productId: randomProduct.id,
            rating: faker.number.int({ min: 1, max: 5 }),
            message: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
        });
    }

    // Insert reviews into the database
    await prisma.rating.createMany({ data: reviews });
    console.log('50 unique reviews have been created.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
