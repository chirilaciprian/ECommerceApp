import { Navbar } from "../general/Navbar";
import Hero from "../general/Hero";
import { useEffect, useState } from "react";
import RecommendedProducts from "../general/RecommendedProducts";
import {
  fetchPaginatedProducts,
  ProductProps,
} from "../../services/productService";
import { getRecommendedProductsHomePage } from "../../services/recommendationService";
import { isAuthenticated } from "../../services/authService";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductProps[]
  >([]);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchRecommended = async () => {
    const res = await getRecommendedProductsHomePage();
    if (res) {
      setRecommendedProducts(res);
    } else {
      setRecommendedProducts([]);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    const data = await fetchPaginatedProducts(25, 12);
    setProducts(data.products);
  };

  const checkAuth = async () => {
    const res = await isAuthenticated();
    if (res) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    fetchProducts();
    checkAuth();
  }, []);

  useEffect(() => {

    if (isAuth) fetchRecommended();
    else {
      setLoading(false);
    }
  }, [isAuth]);

  if (loading) {
    return (
      <div className="h-screen bg-gray-100 pt-20 flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 text-neutral min-h-screen">
      {/* Navbar and Hero */}
      <Navbar />
      <Hero />

      {/* Category Section */}

      <div className="text-center py-5 roboto font-thin">
        <h2 className="text-xl md:text-3xl playfair uppercase ">
          Best Sellers
        </h2>
        <div className="lg:px-10 md:p-7 sm:p-5 p-3">
          <RecommendedProducts products={products} />
        </div>
      </div>
      {recommendedProducts.length != 0 ? (
        <div className="text-center py-8 roboto font-thin">
          <h2 className="text-xl md:text-3xl playfair uppercase ">
            Recommended Products For You
          </h2>
          <div className="lg:p-10 md:p-7 sm:p-5 p-3">
            <RecommendedProducts products={recommendedProducts} />
          </div>
        </div>
      ) : (
        // <div className="text-center py-8 roboto font-thin">
        //   <h2 className="text-xl md:text-3xl lg:text-4xl playfair uppercase">
        //     No Recommended Products
        //   </h2>
        //   <p className="text-lg md:text-xl">
        //     To get recommended products, you need to place orders or add items
        //     to your wishlist.
        //   </p>
        // </div>
        <></>
      )}
    </div>
  );
};

export default HomePage;
