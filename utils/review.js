export const countRatingPerProduct = (product) => {
  const totalReviews = product?.reviews.length;

  const sumOfRatings = product?.reviews.reduce((prev, current) => {
    return prev + current.rating;
  }, 0);

  const averageOfRating = sumOfRatings / totalReviews;

  let roundedRating;

  if (averageOfRating - Math.floor(averageOfRating) < 0.5) {
    roundedRating = Math.floor(averageOfRating);
  } else {
    roundedRating = Math.floor(averageOfRating) + 1;
  }

  return { roundedRating, totalReviews };
};
