import { Navbar } from "../general/Navbar";
import Hero from "../general/Hero";
import { useEffect, useState } from "react";
import RecommendedProducts from "../general/RecommendedProducts";
import { getRecommendedProducts, ProductProps } from "../../services/productService";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars  
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchRecommended = async () => {
    const res = await getRecommendedProducts("311287132-251-2", 24);
    setProducts(res);
    setLoading(false);
  }
  useEffect(() => {
    fetchRecommended();    
  },[])

  if (loading) {
    return (
      <div className="h-screen bg-gray-100 pt-20 flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-base-200 text-neutral">
      {/* Navbar and Hero */}
      <Navbar />
      <Hero />

      {/* Category Section */}
      <div className="text-center py-8 roboto font-thin">
        <h2 className="text-xl md:text-3xl lg:text-4xl playfair uppercase ">
          Recommended Products For You
        </h2>
        
      </div>
      <div className="lg:p-10 md:p-7 sm:p-5 p-3">
      <RecommendedProducts products={products}/>            
      </div>
      
    </div>
  );
};

export default HomePage;
