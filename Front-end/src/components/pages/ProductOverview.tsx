// src/components/ProductPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById , getRecommendedProducts, ProductProps} from "../../services/productService";
import { isAuthenticated } from "../../services/authService";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../state/slices/cartSlice";
import {
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import Carousel from "../general/Carousel";
import Alert from "../general/Alert";

const selectCart = createSelector(
  [(state: RootState) => state.cart],
  (cart) => ({
    id: cart.id,
    userId: cart.userId,
    cartItems: cart.cartItems,
    totalPrice: cart.totalPrice,
    status: cart.status,
  })
);

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const cart = useSelector(selectCart);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const [recommendedProducts, setRecommendedProducts] = useState<ProductProps[]>([]);

  const fetchProduct = async () => {
    const res = await getProductById(productId || "");
    const recommended = await getRecommendedProducts(res.sku, 10);
    setRecommendedProducts(recommended);
    setProduct(res);            
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(!!authStatus); // Set authenticated to true if authStatus is not null
    };
    checkAuth();
    fetchProduct();
    setLoading(false);    
  }, [dispatch]);

  const handleAddToCart = async () => {
    if (authenticated) {
      dispatch(
        addToCart({
          productId: product.id,
          cartId: cart.id,
          quantity: 1,
          price: 0,
          id: "",
        })
      );      
      setShowAlert(true);
      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center mt-20">Product not found.</div>;
  }

  const stars = [];
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-300 text-xl" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-300 text-xl" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-300 text-xl" />);
    }
  }

  const getLocalImageUrl = (imageId: string) => {
    return `/images/${imageId}.jpg`;  // Images stored in public/images
  };
    // Map images to local URLs
  const imageUrls = product.images.map((imageId: string) => getLocalImageUrl(imageId));

  console.log(recommendedProducts);
  return (
    <>
      <Alert
        type="success"
        message="Added to Cart!"
        isVisible={showAlert}      
      />
      <div className="grid grid:cols-1 lg:grid-cols-2 lg:p-10 sm:p-5 p-2 m-0 w-screen h-screen gap-5 overflow-x-hidden">
        <Carousel images={imageUrls} />

        <div className="roboto flex flex-col gap-5 lg:mt-24 lg:p-10  p-3">
          <h1 className="md:text-4xl text-2xl font-bold playfair">
            {product.name}
          </h1>
          <h2 className="md:text-3xl text-xl font-light">${product.price}</h2>
          <div className=" flex flex-row gap-10">
            <div className="flex">{stars}</div>
            <div>
              <span className="text-xl font-extrabold p-1 px-2 rounded-lg cursor-pointer bg-neutral text-yellow-400">
                {" "}
                {product.rating}
              </span>
            </div>
          </div>
          <span className="md:text-lg sm:text-md">{product.description}</span>
          <div className="flex flex-row w-full md:mt-5">
            <button
              className="btn btn-block btn-primary text-xl  "
              onClick={() => {
                handleAddToCart();
              }}
            >
              Add to cart
            </button>
            {/* <label className="swap swap-flip m-0 p-0">
              <input type="checkbox" />
              <FaHeart className=" swap-on text-error text-3xl" />
              <FaRegHeart className="swap-off text-error text-3xl" />
            </label> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
