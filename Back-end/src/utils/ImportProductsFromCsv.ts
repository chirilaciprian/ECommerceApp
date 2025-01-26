import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define a TypeScript interface for the product CSV structure
interface ProductCSV {
  sku: string;
  name: string;
  description: string;
  price: string;
  terms: string;
  section: string;
  images: string;
}

async function main() {
  // Array to store products from CSV
  const products: Array<{
    sku: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    genre: string;
    categoryName: string;
    onSale: boolean;
    salePrice: number | null;
  }> = [];

  // Read and parse the CSV file
  const filePath = "../../../MachineLearning/data/formatted_zara.csv"

  // Parse the CSV asynchronously
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row: ProductCSV) => {
        // Map the CSV data to the product model
        const product = {
          sku: row.sku,
          name: row.name,
          description: row.description,
          price: parseFloat(row.price),
          images: row.images
            .split(',') // Split images by commas
            .map(image => image.replace(/['"\[\]\s]/g, '').trim()), // Remove extra quotes, brackets, and spaces
          genre: row.section, // Map 'section' to 'genre'
          categoryName: row.terms, // Map 'terms' to 'categoryName'
          onSale: false, // Set based on your business logic
          salePrice: null, // Set based on your business logic
        };
        products.push(product);
      })
      .on('end', () => resolve())
      .on('error', (error) => reject(error));
  });

  // Insert products and their categories into the database
  for (const product of products) {
    try {
      // Find the category by name (terms in the CSV)
      let category = await prisma.category.findUnique({
        where: { name: product.categoryName },
      });

      // If no category is found, create a new category
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: product.categoryName,
          },
        });
        console.log(`Category "${product.categoryName}" added.`);
      }

      // Insert the product with the correct categoryId
      await prisma.product.create({
        data: {
          sku: product.sku,
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images, // Properly parsed image URLs
          genre: product.genre,
          categoryId: category.id, // Set the categoryId based on the found category
          onSale: product.onSale,
          salePrice: product.salePrice,
        },
      });

      console.log(`Product "${product.name}" added successfully.`);
    } catch (error) {
      console.error(`Error adding product "${product.name}":`, error);
    }
  }
}

main()
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database connection closed.');
  });
