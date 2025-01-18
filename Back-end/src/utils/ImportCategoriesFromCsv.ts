import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const termsSet = new Set();

    // Read and parse the CSV file
    const filePath = "../../../MachineLearning/data/dbdata.csv"
    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Add each term to the Set
                if (row.terms) {
                    termsSet.add(row.terms.trim());
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });

    // Convert the Set to an Array
    const uniqueTerms = Array.from(termsSet);

    // Insert unique terms into the database
    for (const term of uniqueTerms) {
        try {
            await prisma.category.create({
                data: {
                    name: term as string,
                },
            });
            console.log(`Category "${term}" added.`);
        } catch (error) {
            console.error(`Error adding category "${term}":`, error);
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
