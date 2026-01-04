import mongoose, { model, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Booking",
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "processing", "failed", "success", "refunded"],
        message: "Invalid payment status.",
        default: "pending",
      },
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    paymentMethod: {
      type: String,
      deault: "unknown",
    },
  },
  { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);
