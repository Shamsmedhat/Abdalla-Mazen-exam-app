import z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

// login
export const loginSchema = z.object({
  email: z.email("Invalid Email").nonempty("Your Email is required"),
  password: z.string("Invalid password").nonempty("Your password is required"),
});
export type LoginValues = z.infer<typeof loginSchema>;

// register
export const registerSchema = z
  .object({
    firstName: z
      .string("First name must be string")
      .nonempty("First name is required"),
    lastName: z
      .string("Last name must be string")
      .nonempty("Last name is required"),
    username: z.string("Invalid").nonempty("User name is required"),
    email: z.email("Invalid Email").nonempty("Your Email is required"),
    phone: z
      .string()
      .nonempty("Your phone is required")
      .refine((val) => isValidPhoneNumber(val), {
        message: "Phone number is invalid",
      }),
    password: z
      .string("Invalid password")
      .nonempty("Your password is required"),
    rePassword: z.string().nonempty("Your confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password not identical",
    path: ["rePassword"],
  });
export type RegisterValues = z.infer<typeof registerSchema>;

// forget password
export const forgetSchema = z.object({
  email: z.email("Invalid Email").nonempty("Your Email is required"),
});
export type ForgetValues = z.infer<typeof forgetSchema>;

export const otpSchema = z.object({
  resetCode: z.string("Invalid Code").nonempty("Your Code is required"),
});
export type CodeValues = z.infer<typeof otpSchema>;

export const newPassSchema = z
  .object({
    email: z.email(),
    password: z
      .string("Invalid password")
      .nonempty("Your password is required"),
    newPassword: z.string().nonempty("Your confirm password is required"),
  })
  .refine((data) => data.password === data.newPassword, {
    message: "Password not identical",
    path: ["newPassword"],
  });
export type NewPassValues = z.infer<typeof newPassSchema>;

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string("Invalid password")
      .nonempty("Your password is required"),
    password: z
      .string("Invalid password")
      .nonempty("Your password is required"),
    rePassword: z.string().nonempty("Your confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password not identical",
    path: ["rePassword"],
  });

export type UpdatePassValue = z.infer<typeof updatePasswordSchema>;
