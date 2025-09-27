"use client";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../_actions/delete.action";
import { signOut } from "next-auth/react";

export default function useDelete() {
  // mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async () => {
      const response = await deleteUser();
      // Handle error
      if (response?.error) {
        throw new Error(response.error || "Something went wrong");
      }
      // If deletion succeeded sign out and redirect
      if (response?.message === "success") {
        await signOut({ callbackUrl: "/login" });
      }
      return response;
    },
  });
  return { isPending, error, deleteUser: mutate };
}
