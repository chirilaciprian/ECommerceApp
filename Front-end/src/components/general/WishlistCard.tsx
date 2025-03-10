import React from 'react';
import { ProductProps } from '../../services/productService';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

interface WishlistItemCardProps {
    product: ProductProps;  // Add product property
    wishlistItemId: string;
    deleteItem: (id: string) => void;  // Function to handle delete
}

const WishlistCard: React.FC<WishlistItemCardProps> = ({ product, wishlistItemId, deleteItem }: WishlistItemCardProps) => {
    return (
        <div className="group relative" >
            <button className=' lg:text-2xl btn btn-circle btn-ghost absolute right-2 top-2'
                onClick={() => deleteItem(wishlistItemId)}
            ><IoClose /></button>
            <Link to={`/product/${product.id}`}>

                <img
                    alt={product.name}
                    src={product.images[product.images.length - 3]} // Assuming the first image is the primary image
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
                    loading='lazy'
                />
            </Link>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <span>{product.name}</span>
                    </h3>
                </div>
                <p className="text-sm font-medium text-gray-900 roboto">
                    {product.onSale ? `$${product.salePrice}` : `$${product.price}`}
                </p>
            </div>
        </div>
    );
};

export default WishlistCard;