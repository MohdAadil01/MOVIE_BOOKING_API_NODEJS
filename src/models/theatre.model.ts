import mongoose, { model, Schema, InferSchemaType } from "mongoose";

const theatreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
    },

    city: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    pincode: {
      type: String,
      match: /^[0-9]{6}$/,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },
    nowShowing: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

theatreSchema.index({ name: 1, city: 1 }, { unique: true });
export type TypeTheatre = InferSchemaType<typeof theatreSchema>;

export const Theatre = model("Theatre", theatreSchema);
