import { NewPassValues } from "@/lib/schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { newPassword } from "../_actions/new-password.action";

export default function useNewPassword() {
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: NewPassValues) => {
      const response = await newPassword(values);
      // New password error
      if (response?.error) {
        throw new Error(response.error || "Something went wrong");
      }
      // On success navigate to login
      if (response?.message === "success") {
        router.push("/login");
      }
      return response;
    },
  });
  return { isPending, error, newPassword: mutate };
}
