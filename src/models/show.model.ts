import mongoose, { model, Schema } from "mongoose";

const showSchema = new Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
    theatreId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Theatre",
    },
    startTime: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Show = model("Show", showSchema);
