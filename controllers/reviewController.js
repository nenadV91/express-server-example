const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res) => {
  const { review, rating } = req.body;
  const tour = req.params.tourId;
  const user = req.user.id;

  const newReview = await Review.create({ review, rating, tour, user });

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.getReviews = catchAsync(async (req, res) => {
  const tour = req.params.tourId;
  const reviews = await Review.find({ tour });

  res.status(201).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
