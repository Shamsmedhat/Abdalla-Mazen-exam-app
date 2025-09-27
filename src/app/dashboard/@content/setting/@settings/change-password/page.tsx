"use client";
import PasswordInput from "@/app/(auth)/_components/password-input";
import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  UpdatePassValue,
  updatePasswordSchema,
} from "@/lib/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import useEdit from "./_hooks/use-edit";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, CircleX, LoaderCircle } from "lucide-react";
import { toast, Toaster } from "sonner";
export default function ChaangePassword() {
  // Hooks
  const { isPending, error, update, isSuccess } = useEdit();

  // Form
  const form = useForm<UpdatePassValue>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });
  const { isValid, isSubmitted } = form.formState;

  // Function
  const onSubmit: SubmitHandler<UpdatePassValue> = async (values) => {
    update(values);
  };
  if (isSuccess) {
    toast(
      <div className=" flex items-center text-white ">
        <Check className="text-emerald-500" /> Your password has been updated.
      </div>,
      {
        style: {
          background: "#1F2937",
        },
      }
    );
  }

  return (
    <>
      <div className="bg-white px-6 pt-6 h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Password fields */}
            <PasswordInput label="Current Password" name="oldPassword" />
            <PasswordInput label="New Password" name="password" />
            <PasswordInput label="Confirm New Password" name="rePassword" />
            {/* Validation error */}
            {(form.formState.errors.oldPassword ||
              form.formState.errors.rePassword ||
              form.formState.errors.password) && (
              <>
                <div className="relative">
                  <CircleX
                    className="absolute bg-white rounded-sm w-fit -translate-y-1/2 left-1/2 -translate-x-1/2 z-10"
                    color="#DC2626"
                  />
                </div>
                <Alert variant="destructive" className="text-center mb-4">
                  <AlertDescription>Something went wrong</AlertDescription>
                </Alert>
              </>
            )}
            {/* Server error */}
            {error && (
              <Alert variant="destructive" className="text-center mb-4">
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            {/* Submit button */}
            <Button
              disabled={isPending || (!isValid && isSubmitted)}
              className="w-full bg-blue-600 font-medium text-sm text-white rounded-none  hover:bg-blue-700 py-3.5"
            >
              {isPending ? (
                <LoaderCircle className="animate-spin " />
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
        <Toaster position="bottom-right" closeButton />
      </div>
    </>
  );
}
