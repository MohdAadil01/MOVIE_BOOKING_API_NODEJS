import { Router } from "express";
import {
  addShow,
  deleteShow,
  getShow,
  getShows,
  updateShow,
} from "../controller/show.controller";

const router = Router();

router.post("/", addShow);
router.get("/", getShows);
router.get("/:id", getShow);
router.put("/:id", updateShow);
router.delete("/:id", deleteShow);

export default router;
