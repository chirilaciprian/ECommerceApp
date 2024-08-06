import { useEffect, useState } from "react";
import { Navbar } from "../general/Navbar";
import { Product } from "../general/Product";
import SearchBar from "../general/SearchBar";
import axios from "axios";


// Define the type for a product
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

export const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<ProductType[]>("http://localhost:5000/api/products");
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="mt-10">
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
      </div>

      <div className="mr-10 ml-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <Product key={product.id} {...product} description={product.description || ""} />
        ))}
      </div>
    </>
  );
};
