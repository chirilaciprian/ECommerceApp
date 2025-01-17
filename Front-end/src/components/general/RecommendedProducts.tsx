import { useNavigate } from "react-router-dom";
import { ProductProps } from "../../services/productService"
import { CategoryProps, getAllCategories } from "../../services/categoryService";
import { useEffect, useState } from "react";

interface RecommendedProductsProps {
  products: ProductProps[];
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const navigate = useNavigate();
  const getLocalImageUrl = (imageId: string) => {
    return `/images/${imageId}.jpg`;  // Images stored in public/images
  };
  const handleClick = (id: string) => {
    console.log(id);
    navigate(`/product/${id}`);
  }

  const fetchCategories = async () => {
    const data = await getAllCategories();
    // Initialize categories as an array of objects with 'name' and 'id'
    let categories: { name: string; id: string }[] = [];
    // Use forEach to populate the categories array
    data.forEach((category: CategoryProps) => {
      categories.push({
        name: category.name,
        id: category.id,
      });
    });
    console.log(categories)
    setCategories(categories)
  };

  const getCategoryName = (id: string) => {
    const category = categories.find((category) => category.id === id);
    return category?.name || "";
  }

  useEffect(() => {
    const categoryIds = products.map((product) => product.categoryId);
    fetchCategories();
  }, []);

  return (
    <div className="bg-base-200 merriweather">
      <div className="md:mx-10 mx-5 pb-20">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.name}
                src={getLocalImageUrl(product.images[product.images.length - 3])} // Assuming the first image is the primary image
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                onClick={() => handleClick(product.id)}
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a onClick={() => handleClick(product.id)}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
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
                    
                    <p className="mt-1 text-sm text-success font-bold ">
                      {getCategoryName(product.categoryId).toUpperCase()}
                    </p>
                  </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
