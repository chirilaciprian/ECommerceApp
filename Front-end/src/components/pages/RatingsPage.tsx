import React, { useEffect, useState } from 'react';
import Rating from '../general/Rating';
import { createRating, getRatingsByProductId, RatingProps } from '../../services/ratingService';
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';
import { toast } from 'react-toastify';

// Define types for reviews
const ReviewSection: React.FC = () => {

    const { productId } = useParams<{ productId: string }>();
    const [rating, setRating] = useState<number>(0);
    const [message, setMessage] = useState<string>('');    
    const [hasReviewed, setHasReviewed] = useState<boolean>(false);
   
    const handleCreateRating = async () => {

        if (rating === 0) {
            toast.warning('Please select a rating');
            return;
        }
        if (message === '') {
            toast.warning('Please enter a message');
            return;
        }

        if (productId) {
            await createRating(rating, message, productId);
            fetchReviews();
            toast.success('Review submitted successfully');
        } else {
            console.error("Product ID is undefined");
        }
        fetchReviews();
    }
    const handleRatingChange = (value: number) => {
        setRating(value); // Update the rating when a star is selected        
    };

    const [reviews, setReviews] = useState<RatingProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const fetchReviews = async () => {
        const data = await getRatingsByProductId(productId as string);
        const user = await isAuthenticated();
        if (user) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setHasReviewed(data.find((r: { userId: any; }) => r.userId === user.id) ? true : false);
        }
        console.log(data);
        setReviews(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchReviews();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    if (loading) {
        return <div className="text-center flex items-center justify-center gap-5 mt-20">
            <span className='text-lg font-bold merriweather'>Loading reviews...</span>
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }


    return (
        <div className="max-w-4xl mx-auto p-4 bg-white merriweather">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

            <div className="flex items-center mb-6">
                <div className="mr-4">
                    <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
                    <Rating ratingValue={parseFloat(averageRating.toFixed(1)) || 0}/>
                    <p className="text-sm text-gray-500">{reviews.length} reviews</p>
                </div>
                <div className="flex-grow">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                            <span className="w-4 text-sm">{rating}</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 ml-2">
                                <div
                                    className="bg-black h-2 rounded-full"
                                    style={{ width: `${(reviews.filter(r => r.rating === rating).length / reviews.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full mr-3 border-2 border-gray-300">
                                    <span className="text-sm">{review.userName.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold">{review.userName}</p>
                                <Rating ratingValue={review.rating} />
                            </div>
                        </div>
                        <p className="text-gray-700 mb-2">{review.message}</p>
                    </div>
                ))}
            </div>
            {!hasReviewed ? (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Add a Review</h3>
                    <div className="flex mb-4">
                        <div className="rating">
                            <input type="radio" name="rating-9" className={`rating-hidden ${rating >= 0 ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                            <input type="radio" name="rating-9" className={`mask mask-star-2 ${rating >= 1 ? 'bg-yellow-400' : 'bg-gray-400'}`} onClick={() => handleRatingChange(1)} />
                            <input type="radio" name="rating-9" className={`mask mask-star-2 ${rating >= 2 ? 'bg-yellow-400' : 'bg-gray-400'}`} onClick={() => handleRatingChange(2)} />
                            <input type="radio" name="rating-9" className={`mask mask-star-2 ${rating >= 3 ? 'bg-yellow-400' : 'bg-gray-400'}`} onClick={() => handleRatingChange(3)} />
                            <input type="radio" name="rating-9" className={`mask mask-star-2 ${rating >= 4 ? 'bg-yellow-400' : 'bg-gray-400'}`} onClick={() => handleRatingChange(4)} />
                            <input type="radio" name="rating-9" className={`mask mask-star-2 ${rating >= 5 ? 'bg-yellow-400' : 'bg-gray-400'}`} onClick={() => handleRatingChange(5)} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea
                            placeholder="Write your review here..."
                            rows={4}
                            className="w-full p-2 border rounded-lg"
                            value={message} // Bind state to textarea
                            onChange={(e) => { setMessage(e.target.value) }} // Handle text changes
                            required
                        ></textarea>
                    </div>
                    <button className="btn btn-primary btn-primary-content text-lg"
                        onClick={() => { handleCreateRating() }}
                    >
                        Submit Review
                    </button>
                </div>
            ) : (<div></div>)}
        </div>
    );
};

export default ReviewSection;
