import { useEffect, useState } from 'react';
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { getProductById, getRecommendedProducts, ProductProps } from '../../services/productService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Alert from '../general/Alert';
import RecommendedProducts from "../general/RecommendedProducts";
import { createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../state/store';
import { isAuthenticated } from '../../services/authService';
import { addToCart, getCart } from '../../state/slices/cartSlice';
import { addToWishlist, getWishlist } from '../../state/slices/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryProps, getCategoryById } from '../../services/categoryService';

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


const getLocalImageUrl = (imageId: string) => {
    return `/images/${imageId}.jpg`;  // Images stored in public/images
};

const ProductDetail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [sizesArray, setSizesArray] = useState<string[]>([]); // State for sizes array
    const [recommendedProducts, setRecommendedProducts] = useState<ProductProps[]>([]);
    const [product, setProduct] = useState<ProductProps>();
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<CategoryProps>();
    const cart = useSelector(selectCart);
    const wishlist = useSelector((state: RootState) => state.wishlist);
    const [showAlert, setShowAlert] = useState<boolean>(false);    
    const dispatch: AppDispatch = useDispatch();

    const changeImage = (src: string) => {
        setMainImage((src));
    };
    const checkAuth = async () => {
        const authStatus = await isAuthenticated();
        setAuthenticated(!!authStatus); // Set authenticated to true if authStatus is not null
    };
    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
    }    
    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any    

    const fetchProduct = async () => {
        const res = await getProductById(productId || "");
        fetchCategory(res.categoryId);
        res.images = res.images.map((image: string) => getLocalImageUrl(image));
        const recommended = await getRecommendedProducts(res.sku, 12);
        setRecommendedProducts(recommended);
        changeImage(res.images[0])
        setProduct(res);
        setLoading(false);
    };

    const fetchCategory = async (categoryId: string) => {
        const res = await getCategoryById(categoryId);
        if (res.name === 'shoes')
            setSizesArray(['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']);
        else
            setSizesArray(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
        setCategory(res);
    }

    useEffect(() => {
        // window.scrollTo({
        //     top: 0,
        // });
        checkAuth();
        fetchProduct();    
        dispatch(getCart());
        dispatch(getWishlist());
    }, [dispatch, productId]);

    useEffect(() => { }, [location]);
    const handleAddToCart = async () => {        
        if (authenticated && product) {
            dispatch(
                addToCart({
                    productId: product.id,
                    size: selectedSize,
                    cartId: cart.id,
                    quantity: 1,
                    price: 0,
                    id: "",
                })
            );
            setShowAlert(true);
            // Hide the alert after 3 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } else {
            navigate("/login");
        }
    };

    const handleAddToWishlist = async () => {
        console.log(wishlist);
        if (authenticated && product) {
            dispatch(
                addToWishlist({
                    productId: product.id,
                    wishlistId: wishlist.id,
                    id: "",                    
                })
            );
        } else {
            navigate("/login");
        }
    }

    if (loading) {
        return <div className="text-center flex items-center justify-center gap-5 mt-20">
            <span className='text-lg font-bold merriweather'>Loading product...</span>
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (!product) {
        return <div className="text-center mt-20">Product not found.</div>;
    }

    return (


        <div className='bg-base-200 h-full w-full max-w-screen'>
            <Alert
                type="success"
                message="Added to Cart!"
                isVisible={showAlert}
            />
            <div className="merriweather w-full h-full">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap -mx-4">
                        {/* Product Images */}
                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <img
                                src={mainImage || "/placeholder-image.jpg"} // Fallback to a placeholder image
                                alt={product?.name || "Product Image"}
                                className="w-full h-full md:w-3/4 md:h-3/4 rounded-lg shadow-md mb-4"
                                id="mainImage"
                            />
                            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                                {product?.images?.map((src: string, index: number) => (
                                    <img
                                        key={index}
                                        src={(src)}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-16 sm:w-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                        onClick={() => changeImage(src)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-1/2 px-4 flex flex-col gap-4 md:mt-24">
                            <h2 className="text-3xl font-bold mb-2">{product?.name || "Product Name"}</h2>
                            <div>
                                <p className={`font-bold ${product?.genre === 'MAN' ? 'text-info' : 'text-secondary'}`}>{product?.genre || "Genre"}</p>
                                <p className='font-bold uppercase text-warning'>{category?.name}</p>
                            </div>
                            <div className="mb-4">
                                {product?.onSale ? (
                                    <>
                                        <span className="text-2xl font-bold mr-2">
                                            ${product?.salePrice?.toFixed(2) || "0.00"}
                                        </span>
                                        <span className="text-gray-500 line-through">
                                            ${product?.price?.toFixed(2) || "0.00"}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold">
                                        ${product?.price?.toFixed(2) || "0.00"}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center">
                                <div className="rating">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <input
                                            key={i}
                                            type="radio"
                                            name="rating"
                                            className={`mask mask-star-2 ${product && i < product.rating ? "bg-orange-400" : ""
                                                }`}
                                            defaultChecked={product && i < product.rating}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-primary">
                                    {product?.rating?.toFixed(1) || "0.0"} (120 reviews)
                                </span>
                            </div>
                            <p className="text-gray-700">{product?.description || "No description available."}</p>

                            {/* Size Options */}
                            <div className="playfair flex flex-col gap-4">
                                <div className="flex flex-row justify-between w-full">
                                    {sizesArray.map((size) => (
                                        <button
                                            key={size}
                                            className={`btn btn-neutral flex-1 mx-1 ${selectedSize === size ? "" : "btn-outline"}`}
                                            onClick={() => handleSizeClick(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-row gap-4">
                                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-wide btn-info text-info-content" onClick={() => { handleAddToCart() }}>
                                    <FaCartPlus /> Add To Cart
                                </button>
                                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-wide btn-error text-error-content" onClick={() => { handleAddToWishlist() }}>
                                    <FaHeart /> Add To Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-4xl font-bold tracking-wider text-neutral mb-10 text-center playfair">Customers also purchased</h2>
            <RecommendedProducts products={recommendedProducts} />
        </div>
    );
};

export default ProductDetail;
