import { ProductProps } from "../../services/productService"
import { CategoryProps, getAllCategories } from "../../services/categoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RecommendedProductsProps {
  products: ProductProps[];  
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {

  const [categories, setCategories] = useState<CategoryProps[]>([]);    
  

  const fetchCategories = async () => {
    const data = await getAllCategories();
    // Initialize categories as an array of objects with 'name' and 'id'
    const categories: { name: string; id: string }[] = [];
    // Use forEach to populate the categories array
    data.forEach((category: CategoryProps) => {
      categories.push({
        name: category.name,
        id: category.id,
      });
    });    
    setCategories(categories)
  };

  const getCategoryName = (id: string) => {
    const category = categories.find((category) => category.id === id);
    return category?.name || "";
  }

  
  useEffect(() => {    
    fetchCategories();
  }, []);

  return (
    <div className="bg-base-200 merriweather">
      <div className="md:mx-10 mx-5 pb-20">
        

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 md:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group relative" >
              <img
                alt={product.name}
                src={product.images[0]} // Assuming the first image is the primary image
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" 
                loading="lazy"               
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    
                  </h3>                  
                </div>
                <p className="text-sm font-medium text-gray-900 roboto">
                  {product.onSale ? `$${product.salePrice}` : `$${product.price}`}
                </p>
              </div>
              <div className="flex justify-between w-full px-1">
                    {product.genre == "MAN" ? (
                      <p className="mt-1 text-sm text-info font-bold">
                      {product.genre}
                    </p>
                    ) : (
                      <p className="mt-1 text-sm text-secondary font-bold">
                      {product.genre}
                    </p>
                    )}
                    
                    <p className="mt-1 text-sm text-warning font-bold ">
                      {getCategoryName(product.categoryId).toUpperCase()}
                    </p>
                  </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
