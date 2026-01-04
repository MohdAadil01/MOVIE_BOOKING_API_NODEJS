import mongoose, { model, Schema } from "mongoose";

const bookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    requried: true,
    ref: "User",
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Show",
  },
  seats: {
    type: [String],
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["processing", "booked", "cancelled"],
      message: "Invalid booking status",
    },
  },
});

const Booking = model("Booking", bookingSchema);

export default Booking;
