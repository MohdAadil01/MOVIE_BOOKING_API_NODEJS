import { InferSchemaType, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 8;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "client", "customer"],
        message: "Invalid status for given user",
      },
      default: "customer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["approved", "rejected", "pending"],
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("User", userSchema);

export type TypeUser = InferSchemaType<typeof userSchema> & {
  isValidPassword(password: string): Promise<boolean>;
};
