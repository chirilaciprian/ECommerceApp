// src/components/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { isAuthenticated } from "../../services/authService";
import { createSelector } from "@reduxjs/toolkit";
import { RootState,AppDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../state/slices/cartSlice";

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
  const navigate = useNavigate()
  const { productId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const cart = useSelector(selectCart);
  const dispatch: AppDispatch = useDispatch();

  const fetchProduct = async () => {
    const res = await getProductById(productId || "");
    setProduct(res);
    console.log("Response:",res);
    
  }

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
      dispatch(addToCart({
        productId: product.id,
        cartId: cart.id,
        quantity: 1,
        price: 0,
        id: ""
      }))
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center mt-20">Product not found.</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg h-1/2">
        <div className="flex flex-col md:flex-row">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded-lg"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400"; // Fallback image URL
            }}
          />
          <div className="md:ml-6 mt-6 md:mt-0">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-gray-900 mb-4">
              ${product.price}
            </p>
            <p className="text-yellow-500 mb-4">Rating: {product.rating} / 5</p>
            <div className="flex flex-col gap-2">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={() => {handleAddToCart()}}>
              Add to Cart
            </button>
            <Link to="/products" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex flex-col justify-center items-center">              
              Go back to shopping
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
