import { Router } from "express";
import {
  createTheatre,
  deleteTheatre,
  getAllTheatre,
  getSingleTheatre,
  updateTheatre,
} from "../controller/theatre.controller";
const router = Router();

router.post("/create", createTheatre);
router.delete("/:id", deleteTheatre);
router.get("/:id", getSingleTheatre);
router.get("/", getAllTheatre);
router.put("/:id", updateTheatre);

export default router;
