import prisma from "../config/database";

async function applyRandomDiscounts() {
    try {
        const products = await prisma.product.findMany({
            where: {
              price: { gt: 100 }, // Only products over $100
            },
          });
  
      for (const product of products) {
        if (Math.random() < 0.25) { // 1/4 probability
          const discountPercentage = Math.random() * 40; // Random discount up to 40%
          const discountFactor = 1 - discountPercentage / 100;
          const newSalePrice = parseFloat((product.price * discountFactor).toFixed(2));
  
          await prisma.product.update({
            where: { id: product.id },
            data: {
              onSale: true,
              salePrice: newSalePrice,
            },
          });
        }
      }
  
      console.log("Discounts applied successfully!");
    } catch (error) {
      console.error("Error applying discounts:", error);
    } finally {
      await prisma.$disconnect();
    }
  }

  applyRandomDiscounts();