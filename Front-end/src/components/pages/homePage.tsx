import { useEffect } from "react";
import { Navbar } from "../general/Navbar";
import { Product } from "../general/Product";
import { RiDiscountPercentFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { getProducts } from "../../state/slices/productsSlice";

export const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { products } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const onSaleProducts = products.filter((product) => product.onSale === true);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="">
        <div className="flex flex-row items-center justify-center gap-2 mt-10">
          <RiDiscountPercentFill className="text-center text-2xl md:text-4xl lg:text-6xl" />
          <h1 className="playfair text-xl md:text-4xl lg:text-5xl text-center font-light uppercase ">
            On sale right now
          </h1>
          <RiDiscountPercentFill className="text-center text-2xl md:text-4xl lg:text-6xl" />
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
