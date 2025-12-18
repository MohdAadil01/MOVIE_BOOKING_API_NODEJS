import { Router } from "express";
import { dummy } from "../controller/movie.controller";

const router = Router();

router.get("/", dummy);

export default router;
