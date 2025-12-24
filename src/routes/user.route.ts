import { Router } from "express";
import { rateLimiter } from "../middleware/rateLimiter.middleware";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controller/user.controller";

const router = Router();

router.post(
  "/",
  rateLimiter({ windowSeconds: 60, maxRequests: 20 }),
  createUser
);

router.put(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 20 }),
  updateUser
);

router.get(
  "/",
  rateLimiter({ windowSeconds: 60, maxRequests: 100 }),
  getAllUsers
);

router.delete(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 20 }),
  deleteUser
);

router.get(
  "/:id",
  rateLimiter({ windowSeconds: 60, maxRequests: 200 }),
  getSingleUser
);

export default router;
