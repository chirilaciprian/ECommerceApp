import prisma from "../config/database";

const categories = [
  "Smart TV",
  "Smartphone",
  "Smartwatch",
  "Laptop",
  "Gaming Console",
];
const products = [
  {
    name: "Samsung QLED 55-Inch Smart TV",
    price: 999,
    description:
      "The Samsung QLED 55-Inch Smart TV offers stunning 4K resolution and vibrant colors with Quantum Dot technology for an immersive viewing experience.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6P8llD_Zry5xC-8YgUqMdF_aEsztaTUsBg&s",
    rating: 4.8,
    manufacturer: "Samsung",
    onSale: true,
    salePrice: 899,
    category: "Smart TV",
  },
  {
    name: "Apple iPhone 14 Pro",
    price: 999,
    description:
      "The Apple iPhone 14 Pro features a stunning Super Retina XDR display, A15 Bionic chip, and a versatile triple-camera system for exceptional photos and videos.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-14-pro-spaceblack-202404?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1712956909430",
    rating: 4.9,
    manufacturer: "Apple",
    onSale: false,
    salePrice: null,
    category: "Smartphone",
  },
  {
    name: "Apple Watch Series 8",
    price: 399,
    description:
      "The Apple Watch Series 8 provides advanced health monitoring, GPS tracking, and a new temperature sensor for a comprehensive fitness experience.",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/HQWU2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1681150923637",
    rating: 4.7,
    manufacturer: "Apple",
    onSale: false,
    salePrice: null,
    category: "Smartwatch",
  },
  {
    name: "Dell XPS 13",
    price: 1199,
    description:
      "The Dell XPS 13 is a premium ultrabook featuring a 13.4-inch InfinityEdge display, Intel Core i7 processor, and up to 16GB RAM for high-performance computing.",
    image:
      "data:image/jpeg;base64,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",
    rating: 4.6,
    manufacturer: "Dell",
    onSale: false,
    salePrice: null,
    category: "Laptop",
  },
  {
    name: "PlayStation 5",
    price: 499,
    description:
      "The PlayStation 5 delivers next-gen gaming with ultra-fast loading, ray tracing, and a revolutionary DualSense wireless controller for an immersive gaming experience.",
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
    rating: 4.9,
    manufacturer: "Sony",
    onSale: true,
    salePrice: 449,
    category: "Gaming Console",
  },
  {
    name: "OnePlus 10 Pro",
    price: 899,
    description:
      "The OnePlus 10 Pro offers a 120Hz Fluid AMOLED display and a versatile Hasselblad camera system.",
    image:
      "https://oasis.opstatics.com/content/dam/oasis/page/2022/operation/mar/0317/EU-IN_Green.png",
    rating: 4.5,
    manufacturer: "OnePlus",
    onSale: false,
    salePrice: null,
    category: "Smartphone",
  },
  {
    name: "Samsung Galaxy S22 Ultra",
    price: 1199,
    description:
      "The Samsung Galaxy S22 Ultra boasts a dynamic AMOLED 2X display and powerful performance with its Exynos 2200 processor.",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/ph/2202/gallery/ph-galaxy-s22-ultra-s908-sm-s908edrdphl-thumb-530760382",
    rating: 4.7,
    manufacturer: "Samsung",
    onSale: true,
    salePrice: 999,
    category: "Smartphone",
  },
  {
    name: "Google Pixel 7 Pro",
    price: 899,
    description:
      "The Google Pixel 7 Pro delivers impressive camera capabilities and a smooth experience with the latest Android version.",
    image:
      "https://s13emagst.akamaized.net/products/49722/49721769/images/res_6852db588d3696e35f3908da0034f195.jpg?width=720&height=720&hash=786FB19B17547C5417200F50ABF64AC9",
    rating: 4.6,
    manufacturer: "Google",
    onSale: false,
    salePrice: null,
    category: "Smartphone",
  },
  {
    name: "Samsung Galaxy Z Fold 4",
    price: 1799,
    description:
      "The Samsung Galaxy Z Fold 4 features a stunning 7.6-inch main display and a powerful Snapdragon 8+ Gen 1 processor, offering a premium foldable experience.",
    image:
      "https://images.samsung.com/ro/smartphones/galaxy-z-fold4/images/galaxy-z-fold4_highlights_kv.jpg",
    rating: 4.7,
    manufacturer: "Samsung",
    onSale: false,
    salePrice: null,
    category: "Smartphone",
  },
  {
    name: "Xbox Series X",
    price: 499,
    description:
      "The Xbox Series X is Microsoft's most powerful console, delivering 4K gaming at 60 frames per second, with support for up to 120 fps. It features a custom SSD for fast load times and ray tracing technology for stunning visuals.",
    image:
      "https://s13emagst.akamaized.net/products/32508/32507400/images/res_206705d9f4ec5f4ef02090a56ad9af50.jpg",
    rating: 4.8,
    manufacturer: "Microsoft",
    onSale: false,
    salePrice: null,
    category: "Gaming Console",
  },
  {
    name: "Samsung QN90B Neo QLED",
    price: 1499,
    description:
      "The Samsung QN90B Neo QLED offers stunning 4K resolution with Quantum Matrix Technology for enhanced contrast and brightness. Its ultra-slim design and Quantum HDR 32x ensure vivid colors and a cinematic viewing experience.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmeJWLmASJvu8tNq1iBYncbNwirwMQDyrk2g&s",
    rating: 4.7,
    manufacturer: "Samsung",
    onSale: false,
    salePrice: null,
    category: "Smart TV",
  },
  {
    name: "LG OLED C2",
    price: 1999,
    description:
      "The LG OLED C2 delivers a breathtaking viewing experience with perfect black levels and vibrant colors thanks to its OLED technology. It features 4K resolution, Dolby Vision IQ, and Dolby Atmos for immersive audio-visual performance.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QKTubyf2yqD5zEDvWZlGFtUmcwvunY0jVw&s",
    rating: 4.9,
    manufacturer: "LG",
    onSale: false,
    salePrice: null,
    category: "Smart TV",
  },
  {
    name: "Dell XPS 15",
    price: 1599,
    description:
      "The Dell XPS 15 combines powerful performance with a sleek design. Featuring a 15.6-inch 4K UHD display, Intel Core i7 processor, 16GB RAM, and a 512GB SSD, this laptop is perfect for professionals and creatives alike.",
    image:
      "https://s13emagst.akamaized.net/products/56878/56877903/images/res_eb9b705f210153ef800eff8ab81e15b3.jpg",
    rating: 4.6,
    manufacturer: "Dell",
    onSale: false,
    salePrice: null,
    category: "Laptop",
  },
  {
    name: "Apple MacBook Pro 16-inch (2023)",
    price: 2499,
    description:
      "The Apple MacBook Pro 16-inch features the powerful M2 Pro chip, a stunning Liquid Retina XDR display, 32GB RAM, and 1TB SSD. It is designed for high-performance tasks and creative professionals seeking cutting-edge technology.",
    image:
      "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111838_macbook-pro-2023-16in.png",
    rating: 4.8,
    manufacturer: "Apple",
    onSale: false,
    salePrice: null,
    category: "Laptop",
  },
  {
    name: "Apple Watch Series 8",
    price: 399,
    description:
      "The Apple Watch Series 8 offers advanced health tracking features including ECG, blood oxygen monitoring, and an improved fitness tracker. It also includes a larger always-on display and a new temperature sensor for more comprehensive health insights.",
    image:
      "https://s13emagst.akamaized.net/products/48596/48595938/images/res_ec46f7188fe7202cc82ddd64b9cbe38e.jpg",
    rating: 4.7,
    manufacturer: "Apple",
    onSale: false,
    salePrice: null,
    category: "Smartwatch",
  },
];

async function main() {
  // Create categories and get their IDs
  const categoryMap = new Map<string, string>();

  for (const categoryName of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
    categoryMap.set(categoryName, createdCategory.id);
  }

  // Create products with category IDs
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        categoryId: categoryMap.get(product.category) || "", // Assign category ID based on product category
        image: product.image,
        rating: product.rating,
        manufacturer: product.manufacturer,
        onSale: product.onSale,
        salePrice: product.salePrice,
      },
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
