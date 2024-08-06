import React, { useEffect, useState } from "react";
import { Navbar } from "../general/Navbar";
import { Product } from "../general/Product";
import axios from "axios";
import { RiDiscountPercentFill } from "react-icons/ri";


export const HomePage = () => {
  interface ProductType {
    id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    image: string;
    rating: number;
    manufacturer: string;
    onSale: boolean;
    salePrice?: number;
  }

  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<ProductType[]>(
          "http://localhost:5000/api/products"
        );
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []); // Run only once on component mount

  const onSaleProducts = products.filter((product) => product.onSale === true);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="">
        <div className="flex flex-row items-center justify-center gap-2 mt-10">
        <RiDiscountPercentFill  className="text-center text-2xl md:text-4xl lg:text-6xl"/>
        <h1 className="playfair text-xl md:text-4xl lg:text-5xl text-center font-light uppercase ">
          On sale right now 
        </h1>
        <RiDiscountPercentFill  className="text-center text-2xl md:text-4xl lg:text-6xl"/>
        </div>
        <div className=" mr-10 ml-10 lg:grid-cols-4 grid md:grid-cols-3 sm:grid-col-2">
          {onSaleProducts.map((product) => (
            <Product
              key={product.id}
              {...product}
              description={product.description || ""}
            />
          ))}
        </div>
      </div>
    </>
  );
};
