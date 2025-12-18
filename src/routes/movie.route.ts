import { Router } from "express";
import {
  createMovie,
  getAllMovies,
  getSingleMovie,
} from "../controller/movie.controller";

const router = Router();

router.post("/create", createMovie);
router.get("/getall", getAllMovies);
router.get("/:name", getSingleMovie);

export default router;
