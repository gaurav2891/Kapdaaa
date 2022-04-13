const Comment = require("./../models/commentModel");
const factory = require("./factoryHandler");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getUserId = catchAsync(async (req, res, next) => {
  if (!req.user._id || !req.params.retailerId) {
    return next(new AppError("Unable to get user", 404));
  }
  if (!req.body.wholesaler) req.body.wholesaler = req.user._id;
  if (!req.body.retailer) req.body.retailer = req.params.retailerId;
  next();
});

exports.getReqBodyWRComment = catchAsync(async (req, res, next) => {
  const body = {
    wholesaler: req.body.wholesaler,
    retailer: req.body.retailer,
  };
  req.find = body;
  next();
});

exports.createWRComment = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return next(new AppError("NO COMMENT ADDED", 400));
  }

  const doc = await Comment.create(req.body);

  if (!doc) {
    return next(
      new AppError("unable to create comment,Please try again later", 400)
    );
  }
  console.log(doc);
  res.status(200).json({
    status: "SUCCESS",
    data: {
      doc,
    },
  });
});

exports.getWRComment = catchAsync(async (req, res, next) => {
  const WRComment = await Comment.findOne(req.find);

  if (!WRComment) {
    return next(
      new AppError("Unable to get comment,Please try again later", 400)
    );
  }

  res.status(200).json({
    status: "SUCCESS",
    data: WRComment,
  });
});

exports.updateWRComment = catchAsync(async (req, res, next) => {
  const newBody = {
    comment: req.body.comment,
    wholesalerId: req.body.wholesaler,
    retailerId: req.body.retailer,
    date: String(new Date().toISOString().split("T").slice(0, 1)),
  };
  console.log("✍😈😈", newBody, req.body);

  const WRComment = await Comment.findOneAndUpdate(req.find, newBody);

  if (!WRComment) {
    return next(
      new AppError("Unable to update comment,Please try again later", 400)
    );
  }

  res.status(200).json({
    status: "SUCCESS",
    data: {
      WRComment,
    },
  });
});

exports.deleteWRComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findOneAndDelete(req.finds);

  if (!doc) {
    return next(
      new AppError("Unable to delete comment,Please try again later", 400)
    );
  }

  res.status(200).json({
    status: "SUCCESS",
    data: {
      doc,
    },
  });
});

exports.allComment = factory.getAll(Comment);
