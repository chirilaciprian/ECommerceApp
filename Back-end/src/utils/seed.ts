import prisma from "../config/database";

const categories = ["Casual", "Sport", "Smartwatch"];

const products = [
  {
    name: "Fossil Neutra Chronograph Stainless Steel Watch",
    price: 180,
    description:
      "Incorporating elements from Mid-Century architecture, this chronograph features a well-balanced construction, decorated with a minimal dial and sculpted case.",
    rating: 4.5,
    manufacturer: "Fossil",
    onSale: false,
    salePrice: null,
    category: "Casual",
    genre:"Men",
    images: [
      "https://fossil.scene7.com/is/image/FossilPartners/FS5384_main?$sfcc_fos_hi-res$",
      "https://fossil.scene7.com/is/image/FossilPartners/FS5384_onwrist?$sfcc_onmodel_xlarge$",
      "https://fossil.scene7.com/is/image/FossilPartners/FS5384_2?$sfcc_fos_hi-res$",
      "https://fossil.scene7.com/is/image/FossilPartners/FS5384_10L?$sfcc_lifestyle_xlarge$",
    ],
  },
  {
    name: "Fossil Minimalist Three-Hand Brown Leather Watch",
    price: 130,
    description:
      "This 44mm Minimalist features a black sunray dial with Roman numeral and stick indices, three-hand movement and a brown leather strap.",
    rating: 4.6,
    manufacturer: "Fossil",
    onSale: false,
    salePrice: null,
    category: "Casual",
    genre:"Men",
    images: [
      "https://fossil.scene7.com/is/image/FossilPartners/FS5551_main?$sfcc_fos_hi-res$",
      "https://fossil.scene7.com/is/image/FossilPartners/FS5551_1?$sfcc_fos_hi-res$",
      "https://fossil.scene7.com/is/image/FossilPartners/FS5551_2?$sfcc_fos_hi-res$",
    ],
  },
  {
    name: "G-SHOCK GD-010-1",
    price: 120,
    description:
      "Enjoy a life of fewer battery changes with a large-case G-SHOCK with a 10-year battery you won't have to worry about for ages.The analogue-digital GA-010 delivers handy features like world time and stopwatch, as well as a high-brightness LED light, which can be easily accessed from the large button on front of the case, ensuring visibility even in the dark.Made with bio-based resin and equipped with a 10-year battery, this G-SHOCK is great if you want to reduce environmental impact.Available in a selection of black-based workstyle colour schemes for a cool design that moves with ease from casual settings to work situations.",
    rating: 4.7,
    manufacturer: "G-SHOCK",
    onSale: true,
    salePrice: 112,
    category: "Sport",
    genre:"Men",
    images: [
        "https://www.casio.com/content/dam/casio/product-info/locales/europe/en-gb/timepiece/product/watch/G/GA/ga0/ga-010-1a/assets/GA-010-1A.png",
        "https://www.casio.com/content/dam/casio/product-info/locales/europe/en-gb/timepiece/product/watch/G/GA/ga0/ga-010-1a/assets/GA-010-1A_kv.jpg",
        "https://www.casio.com/content/dam/casio/product-info/locales/europe/en-gb/timepiece/product/watch/G/GA/ga0/ga-010-1a/assets/GA-010-1A_front.jpg",
    ]
  },
  {
    name:"Timex Legacy Boyfriend 36mm Stainless Steel Bracelet Watch",
    price:139,
    description:"The Timex Legacy Boyfriend watch is a modern classic, with a minimalist dial and a comfortable stainless steel bracelet. The 36mm case is the perfect size for any wrist, and the clean design is timeless.",
    rating:4.5,
    manufacturer:"Timex",
    onSale:true,
    salePrice:103,
    category:"Casual",
    genre:"Women",
    images:[
        "https://timex.eu/cdn/shop/products/TW2U78700_51c9f6c3-c156-4f1b-ad15-e94ba9a34b1d.png?v=1687311152&width=https://timex.eu/cdn/shop/products/TW2U78700_51c9f6c3-c156-4f1b-ad15-e94ba9a34b1d.png?v=1687311152&width=768",
        "https://timex.eu/cdn/shop/products/TW2U78700_B.png?v=1687311152&width=768",
        "https://timex.eu/cdn/shop/products/TW2U78700_C.png?v=1687311152&width=768",
        "https://timex.eu/cdn/shop/products/TW2U78700_E.png?v=1687311152&width=768",
    ]
  }
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
          images: product.images,
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
