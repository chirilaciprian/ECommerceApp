import prisma from "../config/database";

async function updatePricesTo99() {
  try {
    // Fetch all products
    const products = await prisma.product.findMany();

    for (const product of products) {
      const newPrice = Math.floor(product.price) + 0.99;
      const newSalePrice =
        product.salePrice !== null
          ? Math.floor(product.salePrice) + 0.99
          : null;

      await prisma.product.update({
        where: { id: product.id },
        data: {
          price: newPrice,
          ...(newSalePrice !== null && { salePrice: newSalePrice }),
        },
      });

      console.log(
        `Updated ${product.name}: Price $${product.price} -> $${newPrice}${
          newSalePrice !== null
            ? `, SalePrice $${product.salePrice} -> $${newSalePrice}`
            : ""
        }`
      );
    }

    console.log("Price update completed.");
  } catch (error) {
    console.error("Error updating prices:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePricesTo99();
