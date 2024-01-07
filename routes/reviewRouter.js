const express = require('express');
const { createReview, getReviews } = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/:tourId').post(protect, restrictTo('user'), createReview);
router.route('/:tourId').get(getReviews);

module.exports = router;
