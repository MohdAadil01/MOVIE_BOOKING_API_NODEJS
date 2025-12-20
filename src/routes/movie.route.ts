import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getSingleMovie,
  updateMovie,
} from "../controller/movie.controller";
import { rateLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();

router.post(
  "/create",
  rateLimiter({ windowSeconds: 60, maxRequests: 15 }),
  createMovie
);
router.get(
  "/getall",
  rateLimiter({ windowSeconds: 60, maxRequests: 100 }),
  getAllMovies
);
router.delete(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 15 }),
  deleteMovie
);
router.put(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 15 }),
  updateMovie
);
router.get(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 100 }),
  getSingleMovie
);

export default router;
