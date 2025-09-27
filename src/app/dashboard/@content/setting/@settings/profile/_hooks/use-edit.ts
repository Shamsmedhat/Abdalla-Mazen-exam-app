import { useMutation } from "@tanstack/react-query";
import { EditAction } from "../_actions/edit.action";

export default function useEdit() {
  // mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: Record<string, FormDataEntryValue>) => {
      const response = await EditAction(values);
      //   API errors
      if (response?.error || "code" in response) {
        console.log(response);
        throw new Error(response?.message || "Something went wrong");
      }
      return response;
    },
  });
  return { isPending, error, edit: mutate };
}
