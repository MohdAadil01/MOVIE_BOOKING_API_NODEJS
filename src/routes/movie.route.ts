import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getSingleMovie,
  updateMovie,
} from "../controller/movie.controller";

const router = Router();

router.post("/create", createMovie);
router.get("/getall", getAllMovies);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);
router.get("/:id", getSingleMovie);

export default router;
