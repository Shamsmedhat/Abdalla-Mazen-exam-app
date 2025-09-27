"use client";
import React from "react";
import PasswordInput from "./password-input";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailInput from "./email-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginValues } from "@/lib/schemas/auth.schemas";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleX, LoaderCircle } from "lucide-react";
import useLogin from "../login/_hooks/use-login";

export default function LoginForm() {
  // Query
  const { isPending, error, login } = useLogin();

  // Form
  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  // Function
  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    login(values);
  };

  // Variable
  const { isValid, isSubmitted } = form.formState;

  return (
    <div className="w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Email field */}
          <EmailInput />

          {/* Password field */}
          <PasswordInput />

          {/* forgot password link */}
          <span className="flex justify-end text-blue-600 font-medium text-sm mb-10">
            <Link href="/forget">Forget your password</Link>
          </span>

          {/* Feedback */}
          {(form.formState.errors.email || form.formState.errors.password) && (
            <>
            {/* Error validation */}
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

          {/* Error from server */}
          {error && (
            <Alert variant="destructive" className="text-center mb-4">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {/* submit button */}
          <Button
            disabled={isPending || (!isValid && isSubmitted)}
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-none"
          >
            {isPending ? <LoaderCircle className="animate-spin " /> : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
