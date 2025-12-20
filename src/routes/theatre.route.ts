import { Router } from "express";
import {
  createTheatre,
  deleteTheatre,
  getAllTheatre,
  getSingleTheatre,
  updateTheatre,
} from "../controller/theatre.controller";
import { rateLimiter } from "../middleware/rateLimiter.middleware";
const router = Router();

router.post(
  "/create",
  rateLimiter({ windowSeconds: 60, maxRequests: 15 }),
  createTheatre
);
router.delete(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 15 }),
  deleteTheatre
);
router.get(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 100 }),
  getSingleTheatre
);
router.get(
  "/",
  rateLimiter({ windowSeconds: 60, maxRequests: 100 }),
  getAllTheatre
);
router.put(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 15 }),
  updateTheatre
);

export default router;
