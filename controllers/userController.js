const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) =>
  allowedFields.reduce((r, field) => {
    if (obj[field]) r[field] = obj[field];
    return r;
  }, {});

exports.getAllUsers = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.createUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.getUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user tries to update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update! Please use /updatePassword',
      ),
      400,
    );
  }

  // 2. Filter out fields that are not in allowed fields
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
