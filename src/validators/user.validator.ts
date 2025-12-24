import z from "zod";

import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "client", "customer"]).optional(),
  status: z.enum(["approved", "rejected", "pending"]).optional(),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(2).optional(),
    email: z.string().trim().toLowerCase().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["admin", "client", "customer"]).optional(),
    status: z.enum(["approved", "rejected", "pending"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });

//   {
//     name: {
//       type: String,
//       required: true,
//       minLength: 2,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please fill a valid email",
//       ],
//     },
//     password: {
//       type: String,
//       required: true,
//       minLength: 6,
//       select: false,
//     },
//     role: {
//       type: String,
//       required: true,
//       enum: {
//         values: ["admin", "client", "customer"],
//         message: "Invalid status for given user",
//       },
//       default: "customer",
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: {
//         values: ["approved", "rejected", "pending"],
//       },
//       default: "pending",
//     },
//   },
