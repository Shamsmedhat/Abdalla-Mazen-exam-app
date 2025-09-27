import { LoginValues } from "@/lib/schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      // Login error
      if (response?.error) {
        throw new Error("Invalid email or password");
      }
      // On success navigate to home
      if (response?.ok) {
        window.location.href = "/";
      }

      return response;
    },
  });
  return { isPending, error, login: mutate };
}
