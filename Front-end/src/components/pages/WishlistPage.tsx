import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { useEffect, useState } from 'react';
import { getWishlist } from '../../state/slices/wishlistSlice';

const WishlistPage: React.FC = () => {

    const wishlist = useSelector((state: RootState) => state.wishlist);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(getWishlist());
        setLoading(false);
    }, [dispatch]);


    if (loading) {
        return <div className="text-center flex items-center justify-center gap-5 mt-20">
            <span className='text-lg font-bold merriweather'>Loading wishlist...</span>
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        <>
                        
        </>
    );
};

export default WishlistPage;