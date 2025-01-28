import React from 'react';

interface RatingProps {
  ratingValue: number; // Rating value (e.g., 4.5)  
}

const Rating: React.FC<RatingProps> = ({ ratingValue }) => {
  // Generate the stars based on the rating value (rounded to nearest integer)
  const filledStars = Math.round(ratingValue);
  const emptyStars = 5 - filledStars;

  // Create an array to render the filled and empty stars
  const stars = Array(filledStars).fill(true).concat(Array(emptyStars).fill(false));

  return (
    <div className="flex items-center gap-2">
      {/* Render stars */}
      <div className="rating">
        {stars.map((isFilled, index) => (
          <input
            key={index}
            type="radio"
            name="rating"
            className={`mask mask-star-2 ${isFilled ? 'bg-yellow-400' : 'bg-gray-300'}`}
            disabled
          />
        ))}
      </div>            
    </div>
  );
};

export default Rating;
