import { z } from "zod";

export const usernameSchema = z
  .string({ message: "username is required" })
  .min(5, { message: "Must be 5 or more characters long" });

// export const passwordSchema = z
//   .string({ message: "Password is required" })
//   .min(8, { message: "Password must be at least 8 characters" })
//   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
//     message:
//       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//   });