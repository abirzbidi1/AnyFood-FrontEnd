import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useCreateRatingMutation, useShowRestaurantQuery } from '../../../redux/api/restaurant/restoApi';

interface RatingProps {
  restaurantId: number;
}

const RatingForm: React.FC<RatingProps> = ({ restaurantId }) => {
  const [rating, setRating] = useState<number| null>(1);
  const [createRating] = useCreateRatingMutation();
  const { data: restaurant } = useShowRestaurantQuery(restaurantId);

  /*useEffect(() => {
    const fetchRestaurantData = () => {
      const response = restaurant;
      if (response)
        setRating(response.rating);
    };
    fetchRestaurantData();
  });*/

  const handleRatingChange = (newValue: number|null) => {
    if (newValue) {
      setRating(newValue);
      createRating({ restaurantId, rating: newValue });
    }
  };

  return (
    <form>
      <Box component="fieldset" borderColor="transparent">
        <Rating
          name={`rating-${restaurantId}`}
          value={rating}
          onChange={(event, newValue) => handleRatingChange(newValue)}
        />
      </Box>
    </form>
  );
};

export default RatingForm;