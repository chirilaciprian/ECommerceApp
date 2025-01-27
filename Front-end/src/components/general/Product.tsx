// import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
import "../../index.css";
// import { isAuthenticated } from "../../services/authService";
import { ProductProps } from "../../services/productService";
// import Alert from "./Alert";


interface ProductPropsWithMethods extends ProductProps {
  addToCart: (id: string) => void;
}

export const Product = (product:ProductPropsWithMethods) => {
  const navigate = useNavigate();  
  
  


  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const authStatus = await isAuthenticated();
  //     setAuthenticated(!!authStatus); // Set authenticated to true if authStatus is not null
  //   };
  //   checkAuth();    
  // }, []);

  // const handleAddToCart = async () => {
  //   if (authenticated) {
  //     product.addToCart(product.id);
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 1000);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  
  return (
    <>      
      <div className="card w-auto cursor-pointer shadow-sm merriweather" onClick={handleClick}>
        <figure>
          <img
            src={product.images[0]}
            alt="product"
            loading="lazy"
            className="w-auto w-max-200px h-auto h-max-400px object-cover"                        
          />
        </figure>
        <div className="justify-end md:p-2 p-1 flex flex-col gap-1">
          <h2 className="card-title text-sm md:text-md">
            {product.name}
          </h2>
          <div className="display flex flex-row justify-between">
            <span className="md:text-md font-bold text-md roboto">
              {product.onSale ? (
                <>
                  {/* Original Price with strikethrough */}
                  <span className="md:mr-2 mr-1">${product.salePrice}</span>
                  {/* Sale Price */}
                  <span className="line-through text-gray-400">
                    ${product.price}
                  </span>
                </>
              ) : (
                `$${product.price}`
              )}
            </span>
            {/* <div className="rating">
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
            </div> */}
          </div>          
        </div>
      </div>
    </>
  );
};
