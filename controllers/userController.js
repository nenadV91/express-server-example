const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) =>
  allowedFields.reduce((r, field) => {
    if (obj[field]) r[field] = obj[field];
    return r;
  }, {});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({});

  res.status(500).send({
    status: 'error',
    data: {
      users,
    },
  });
});
exports.getUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

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

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
