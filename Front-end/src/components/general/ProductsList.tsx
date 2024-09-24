import { Product } from "./Product";
import "../../index.css";
import { ProductProps } from "../../services/productService";

interface ProductsListProps {
  products: ProductProps[]; // Define props interface
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {  
  return (
    <>                  
      <div className="bg-base-200 h-auto w-auto">          
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
          {products.map((product) => (
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
