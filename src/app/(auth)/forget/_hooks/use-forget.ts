import { ForgetValues } from "@/lib/schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { forgetAction } from "../_actions/forget.action";

export default function useForget() {
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: ForgetValues) => {
      const response = await forgetAction(values);
      // Handle error
      if (response?.error) {
        throw new Error(response.error || "Something went wrong");
      }
      // Handle success
      if (response?.message === "success") {
        router.push("/verify");
      }
      return response;
    },
  });
  return { isPending, error, forget: mutate };
}
