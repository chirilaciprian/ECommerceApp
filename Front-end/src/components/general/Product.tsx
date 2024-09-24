import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../index.css";
import { isAuthenticated } from "../../services/authService"
import { ProductProps } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from "../../state/store";
import { createSelector } from "@reduxjs/toolkit";
import { addToCart, getCart } from "../../state/slices/cartSlice";

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



export const Product: React.FC<ProductProps> = (product) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const cart = useSelector(selectCart);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(!!authStatus); // Set authenticated to true if authStatus is not null
    };
    checkAuth();
    dispatch(getCart());
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
    } else {
      navigate("/login");
    }
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card glass w-auto cursor-pointer">      
      <figure>
        <img
          src={product.images[0]}
          alt="product"
          className="w-auto h-auto object-cover"
          onClick={handleClick}
        />
      </figure>
      <div className="card-body p-2 lg:p-5 justify-end">
        <h2 className="card-title text-sm md:text-lg" onClick={handleClick}>
          {product.name}
        </h2>
        <div className="display flex flex-row justify-between">
        <span className="md:text-xl roboto font-bold text-xs">
            {product.onSale ? (
              <>
                {/* Original Price with strikethrough */}
                <span className="md:mr-2 mr-1">${product.salePrice}</span>
                {/* Sale Price */}
                <span className="line-through text-gray-500">${product.price}</span>
              </>
            ) : (
              `$${product.price}`
            )}
          </span>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name={`rating-${product.id}`}
                className={`mask mask-star w-4 h-4 md:w-6 md:h-6 bg-yellow-400`}
                defaultChecked={i + 1 === Math.round(product.rating)}
                disabled
              />
            ))}
          </div>
        </div>
        <div className="card-actions justify-center">
          <button
            className="btn btn-block btn-neutral"
            onClick={handleAddToCart}
          >
            Add To Cart
            <FaCartPlus className="md:text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};