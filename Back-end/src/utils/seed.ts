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
    genre: "Men",
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
    genre: "Men",
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
    genre: "Men",
    images: [
      "https://www.casio.com/content/dam/casio/product-info/locales/europe/en-gb/timepiece/product/watch/G/GA/ga0/ga-010-1a/assets/GA-010-1A.png",
      "https://www.casio.com/content/dam/casio/product-info/locales/europe/en-gb/timepiece/product/watch/G/GA/ga0/ga-010-1a/assets/GA-010-1A_kv.jpg",
      "https://www.casio.com/content/dam/casio/product-info/locales/europe/en-gb/timepiece/product/watch/G/GA/ga0/ga-010-1a/assets/GA-010-1A_front.jpg",
    ],
  },
  {
    name: "Timex Legacy Boyfriend 36mm Stainless Steel Bracelet Watch",
    price: 139,
    description:
      "The Timex Legacy Boyfriend watch is a modern classic, with a minimalist dial and a comfortable stainless steel bracelet. The 36mm case is the perfect size for any wrist, and the clean design is timeless.",
    rating: 4.5,
    manufacturer: "Timex",
    onSale: true,
    salePrice: 103,
    category: "Casual",
    genre: "Women",
    images: [
      "https://timex.eu/cdn/shop/products/TW2U78700_51c9f6c3-c156-4f1b-ad15-e94ba9a34b1d.png?v=1687311152&width=https://timex.eu/cdn/shop/products/TW2U78700_51c9f6c3-c156-4f1b-ad15-e94ba9a34b1d.png?v=1687311152&width=768",
      "https://timex.eu/cdn/shop/products/TW2U78700_B.png?v=1687311152&width=768",
      "https://timex.eu/cdn/shop/products/TW2U78700_C.png?v=1687311152&width=768",
      "https://timex.eu/cdn/shop/products/TW2U78700_E.png?v=1687311152&width=768",
    ],
  },
  {
    name: "Emporio Armani Armani Chronograph Black Fabric Watch",
    price: 80,
    description:
      "Emporio Armani's 46mm watch features a gray sunray dial, white indexes, chronograph movement and black fabric strap.",
    rating: 4.6,
    manufacturer: "Emporio Armani",
    onSale: false,
    salePrice: null,
    category: "Casual",
    genre: "Men",
    images: [
      "https://www.watchshop.com/images/products/86217701_l.jpg",
      "https://www.watchshop.com/images/products/86217701_l_a1.jpg",
      "https://www.watchshop.com/images/products/86217701_l_a2.jpg",
      "https://www.watchshop.com/images/products/86217701_l_a4.jpg",
      "https://www.watchshop.com/images/products/86217701_l_a6.jpg",
    ],
  },
  {
    name: "Apple Watch Series 4 44mm GPS Space Grey Refurbished",
    price: 160,
    description:
      "The display is the defining feature of Apple Watch, and Series 4 pushes it further than ever. The challenge was to make it bigger without noticeably increasing the size of the case or compromising the battery life. Narrower borders enable a viewing area that’s over 30% larger, while display technology called LTPO improves power efficiency, helping you get through the day on a single charge.",
    rating: 4.2,
    manufacturer: "Apple",
    onSale: false,
    salePrice: null,
    category: "Smartwatch",
    genre: "Men",
    images: [
      "https://www.watchshop.com/images/products/38366690_l.jpg",
      "https://m.media-amazon.com/images/I/51boOLKUfDL._AC_UF894,1000_QL80_.jpg",
    ],
  },
  {
    name: "Fossil Gen 6 Smartwatch Rose Gold FTW6082",
    price: 299,
    description:
      "Fossil Gen 6 Ladies Smartwatch, Rose Gold IP Plated Stainless Steel Case and Mesh Bracelet. Automatically tracks activity goals, steps, sleep, heart rate, cardio level, SPO2 (blood oxygen), and more. Activity modes with GPS keep you on track with your distance and path. Control your Music, Google Pay, GPS, Heart Rate Tracking, Interchangeable Watch Band, Notifications from your phone, as well as Personalised dials. Advanced sensors provide the data to power all your health and fitness apps. 1.28 Colour AMOLED / 416 x 416 / 326ppi. Bluetooth 5.0 LE, GPS, NFC SE, WiFi, Charges in 30 minutes to 80%. Accelerometer, Altimeter, Ambient Light, Compass, Gyroscope, Off-Body IR, PPG Heart Rate, SP02.",
    rating: 4.7,
    manufacturer: "Fossil",
    onSale: true,
    salePrice: 219,
    category: "Smartwatch",
    genre:"Women",
    images:[
      "https://www.watchshop.com/images/products/38500090_l.jpg",
      "https://www.watchshop.com/images/products/38500090_l_a1.jpg",
      "https://www.watchshop.com/images/products/38500090_l_a2.jpg",
      "https://www.watchshop.com/images/products/38500090_l_a3.jpg",
      "https://www.watchshop.com/images/products/38500090_l_a4.jpg",
    ]
  },
  {
    name:"Skagen Stainless Steel Digital Quartz Wear Os Watch",
    price: 199,
    description: "Introducing an advanced update to our most popular smartwatch. The Falster 3 Smartwatch boasts an interactive, swimproof touchscreen and a range of smart features powered with Wear OS by Google including, heart rate tracking, Google Assistant, smartphone notifications, activity tracking, Google Pay, GPS and more. Get things done on the go with help from the Google Assistant on your wrist.",
    rating: 3.7,
    manufacturer: "Skagen",
    onSale: false,
    salePrice: null,
    category: "Smartwatch",
    genre:"Women",
    images:[
      "https://www.watchshop.com/images/products/86577801_l.jpg",
      "https://www.watchshop.com/images/products/86577801_l_a1.jpg",
      "https://www.watchshop.com/images/products/86577801_l_a2.jpg",
      "https://www.watchshop.com/images/products/86577801_l_a3.jpg",
      "https://www.watchshop.com/images/products/86577801_l_a5.jpg",
      "https://www.watchshop.com/images/products/86577801_l_a6.jpg",
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
        genre: product.genre,
      },
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
