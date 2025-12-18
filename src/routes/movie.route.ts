import { Router } from "express";
import { createMovie, getSingleMovie } from "../controller/movie.controller";

const router = Router();

router.post("/create", createMovie);
router.get("/:name", getSingleMovie);

export default router;
