import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '../../state/slices/wishlistSlice';
import { getProductsByWishlistId, ProductProps } from '../../services/productService';
import WishlistCard from '../general/WishlistCard';
import { Link } from 'react-router-dom';
import { Navbar } from '../general/Navbar';



const WishlistPage: React.FC = () => {

    const wishlist = useSelector((state: RootState) => state.wishlist);
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const fetchProducts = async (id: string) => {
        const data = await getProductsByWishlistId(id);
        setProducts(data);
    }

    const getWishlistItemIdByProductId = (id: string) => {
        return wishlist.wishlistItems.find((item) => item.productId === id)?.id;
    }
    const deleteItem = async (id: string) => {
        await dispatch(removeFromWishlist(id));
        if (wishlist.id) {
            fetchProducts(wishlist.id);
        }
    }
    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    useEffect(() => {
        if (wishlist.id) {
            fetchProducts(wishlist.id);
            setLoading(false);
        }
    }, [wishlist.id])

    if (loading) {
        return <div className="text-center flex items-center justify-center gap-5 mt-20">
            <span className='text-lg font-bold merriweather'>Loading wishlist...</span>
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        wishlist.wishlistItems.length !== 0 ? (
            <div className='min-h-screen bg-base-200'>
                <Navbar />
                <div className="bg-base-200 flex lg:gap-20 md:gap-10 flex-col items-center merriweather lg:p-20 md:p-15 p-10">
                    <h1 className="lg:text-4xl md:text-2xl text-xl font-bold tracking-wider">
                        Wishlist Items
                    </h1>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
                        {products.map((product) => (
                            <WishlistCard
                                key={product.id}
                                product={product}
                                wishlistItemId={getWishlistItemIdByProductId(product.id) || ''}
                                deleteItem={deleteItem} />
                        ))}
                    </div>
                </div>
            </div>)
            : (
                <>

                    <div className="flex flex-col items-center  playfair bg-base-200 min-h-screen overflow-hidden">
                        <Navbar />
                        <img
                            src="https://www.foreverjewelss.com/assets/newimages/empty-wishlist.png"
                            alt="No Orders"
                            className=" mb-6"
                        />
                        <p className="mt-2 text-gray-500 md:text-xl text-md">
                            You haven’t placed any products in wishlist yet.
                        </p>
                        <Link to="/products" className="mt-6 btn btn-error text-error-content px-6 md:text-xl text-md">
                            Go To Products Page
                        </Link>
                    </div>
                </>
            )
    );
};

export default WishlistPage;