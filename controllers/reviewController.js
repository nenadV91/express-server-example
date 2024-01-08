const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createReview = catchAsync(async (req, res) => {
  const { review, rating } = req.body;
  const tour = req.params.tourId;
  const user = req.user.id;

  const data = { review, rating };

  if (tour) data.tour = tour;
  if (user) data.user = user;

  const newReview = await Review.create(data);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.getReviews = catchAsync(async (req, res) => {
  const filter = {};
  const { tourId } = req.params;

  if (tourId) filter.tour = tourId;

  const reviews = await Review.find(filter);

  res.status(201).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.deleteReview = factory.deleteOne(Review);
