import { Router } from "express";
import { createMovie } from "../controller/movie.controller";

const router = Router();

router.post("/create", createMovie);

export default router;
