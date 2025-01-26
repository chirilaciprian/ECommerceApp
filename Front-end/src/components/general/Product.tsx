import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../index.css";
import { isAuthenticated } from "../../services/authService";
import { ProductProps } from "../../services/productService";
import Alert from "./Alert";


interface ProductPropsWithMethods extends ProductProps {
  addToCart: (id: string) => void;
}

export const Product = (product:ProductPropsWithMethods) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  
  


  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(!!authStatus); // Set authenticated to true if authStatus is not null
    };
    checkAuth();    
  }, []);

  const handleAddToCart = async () => {
    if (authenticated) {
      product.addToCart(product.id);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    } else {
      navigate("/login");
    }
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const getLocalImageUrl = (imageId: string) => {
    // Use relative path to images in the public folder
    return `/images/${imageId}.jpg`;  // This assumes the images are in public/images/
  };
  return (
    <>
      <Alert type={"success"} message={"Added to cart"} isVisible={showAlert} />
      <div className="card w-auto cursor-pointer shadow-sm">
        <figure>
          <img
            src={getLocalImageUrl(product.images[0])}
            alt="product"
            className="w-auto w-max-200px h-auto h-max-400px object-cover"            
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
                  <span className="line-through text-gray-500">
                    ${product.price}
                  </span>
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
    </>
  );
};
