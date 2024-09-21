import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../general/Navbar";
import { Product } from "../general/Product";
import SearchBar from "../general/SearchBar";
import { RootState, AppDispatch } from "../../state/store";
import { getProducts } from "../../state/slices/productsSlice";
import "../../index.css";
import CategorySelectTest from "../general/Test";

export const ProductsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <Navbar />
      </div>
        
      <div className="flex bg-base-200">
      <CategorySelectTest/>
        <div className="bg-base-200 min-h-screen">
          <div className="pt-10">
            <SearchBar onSearch={(term) => setSearchTerm(term)} />
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <Product
                key={product.id}
                {...product}
                description={product.description || ""}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
