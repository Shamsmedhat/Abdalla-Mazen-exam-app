"use client";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordInput from "./password-input";
import { newPassSchema, NewPassValues } from "@/lib/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoaderCircle } from "lucide-react";
import useNewPassword from "../createnewpassword/_hooks/use-newpassword";

export default function NewPasswordForm() {
  const { isPending, error, newPassword } = useNewPassword();
  const form = useForm<NewPassValues>({
    defaultValues: {
      email: localStorage.getItem("email")!,
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(newPassSchema),
  });
  const onSubmit: SubmitHandler<NewPassValues> = async (values) => {
    newPassword(values);
  };
  const { isValid, isSubmitted } = form.formState;
  return (
    <>
      <div className=" w-96 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" w-full">
              <PasswordInput />
              <PasswordInput label="Confirm Password" name="confirmPassword" />
            </div>
            {(form.formState.errors.password ||
              form.formState.errors.newPassword) && (
              <>
                <Alert variant="destructive" className="text-center mb-4">
                  <AlertDescription>Something went wrong</AlertDescription>
                </Alert>
              </>
            )}

            {error && (
              <Alert variant="destructive" className="text-center mb-4">
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            <Button
              disabled={isPending || (!isValid && isSubmitted)}
              className="w-full  bg-blue-600 text-white hover:bg-blue-700 rounded-none mt-6 text-sm"
            >
              {isPending ? (
                <LoaderCircle className="animate-spin " />
              ) : (
                " Verify Code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
