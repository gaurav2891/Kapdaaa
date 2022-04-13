const mongoose = require("mongoose");
// const Retai

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    reuired: [true, "comment cannot be Empty"],
  },
  ratingAverage: {
    type: String,
  },
  rating: {
    type: Number,
    min: [1, "Minimum rating should be 1 "],
    max: [5, "MAximum rating should be 5 "],
    // required: [true, "please give rating"],
    default: 3,
  },
  retailer: {
    type: mongoose.Schema.ObjectId,
    ref: "retailer",
    required: [true, "please select retailer"],
  },
  wholesaler: {
    type: mongoose.Schema.ObjectId,
    ref: "wholesaler",
    required: [true, "please select retailer"],
  },
  lendingMoney: {
    type: Number,
    Min: [10000, "To comment minimum amount is 10,000 rupees"],
    Max: [50000, "To comment maximum amount is in under 50,000 rupees"],
  },
  date: {
    type: String,
    default: String(new Date().toISOString().split("T").slice(0, 1)),
  },
});

commentSchema.index({ retailer: 1, wholesaler: 1 }, { unique: true });

// Middleware

commentSchema.pre("save", function (next) {
  this.rating = this.rating.toFixed(1);
  next();
});

// commentSchema.pre(/^find/, function (next) {
//   this.populate("retailer").select("name, _id , firmName ");
//   next();
// });

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
