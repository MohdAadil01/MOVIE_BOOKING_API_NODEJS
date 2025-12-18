import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
    },

    genres: [
      {
        type: String,
        enum: [
          "Action",
          "Comedy",
          "Drama",
          "Romance",
          "Thriller",
          "Horror",
          "Sci-Fi",
          "Fantasy",
          "Animation",
          "Documentary",
        ],
        required: true,
      },
    ],

    language: {
      type: String,
      default: "English",
      index: true,
    },

    duration: {
      type: Number, // in minutes
      required: true,
      min: 1,
    },

    releaseDate: {
      type: Date,
      required: true,
      index: true,
    },

    cast: [
      {
        name: { type: String, required: true },
        role: { type: String },
      },
    ],

    urls: {
      posterUrl: {
        type: String,
        required: true,
        match: /^https?:\/\/.+/,
      },
      trailerUrl: {
        type: String,
        match: /^https?:\/\/.+/,
      },
    },

    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
    releaseStatus: {
      type: String,
      enum: ["Upcoming", "Now Showing"],
      default: "Upcoming",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Movie = model("Movie", movieSchema);
