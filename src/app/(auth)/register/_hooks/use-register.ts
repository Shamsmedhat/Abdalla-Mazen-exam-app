import { RegisterValues } from "@/lib/schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../_actions/register.action";
import { useRouter } from "next/navigation";
import { RegisterResponse } from "@/lib/types/register";

export default function useRegister() {
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: RegisterValues) => {
      const response: RegisterResponse = await registerUser(values);
      //  Handle error
      if (response?.error || "code" in response) {
        throw new Error(response?.message || "Something went wrong");
      }
      // --- On success, navigate to login page
      if (response?.message === "success") {
        router.push("/login");
      }

      return response;
    },
  });
  return { isPending, error, register: mutate };
}
