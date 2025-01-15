import { Product } from "./Product";
import "../../index.css";
import { ProductProps } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";

import { createSelector } from "@reduxjs/toolkit";
import { RootState,AppDispatch } from "../../state/store";
import { useEffect } from "react";
import { addToCart, getCart } from "../../state/slices/cartSlice";

interface ProductsListProps {
  products: ProductProps[]; // Define props interface
}

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



export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {  

  const cart = useSelector(selectCart);
  const dispatch: AppDispatch = useDispatch();

  const AddToCart = (productId:string) => {
    dispatch(addToCart(
      {
        productId: productId,
        quantity: 1,
        cartId: cart.id,
        price:0,
        id:"",
      }
    ))
  }

  useEffect(() => {
    dispatch(getCart());
  },[dispatch]);

  return (
    <>                  
      <div className="bg-base-200 h-auto w-auto">          
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {products.map((product) => (
            <Product
              key={product.id}
              {...product}
              addToCart={AddToCart}
            />
          ))}
        </div>
      </div>      
    </>
  );
};
