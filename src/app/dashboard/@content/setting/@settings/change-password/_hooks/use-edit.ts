import { UpdatePassValue } from "@/lib/schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordAction } from "../_actions/update-password.action";

export default function useEdit() {
  // Mutation
  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (values: UpdatePassValue) => {
      const response = await updatePasswordAction(values);
      // Handle error
      if (response?.error || "code" in response) {
        throw new Error(response?.message || "Something went wrong");
      }
      // // Return the response if successful
      return response;
    },
  });
  return { isPending, error, update: mutate, isSuccess };
}
