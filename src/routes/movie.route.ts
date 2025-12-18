import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getSingleMovie,
} from "../controller/movie.controller";

const router = Router();

router.post("/create", createMovie);
router.get("/getall", getAllMovies);
router.delete("/:id", deleteMovie);
router.get("/:id", getSingleMovie);

export default router;
