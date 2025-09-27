"use client";
import { Form } from "@/components/ui/form";
import { forgetSchema, ForgetValues } from "@/lib/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import EmailInput from "./email-input";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleX, LoaderCircle } from "lucide-react";
import useForget from "../forget/_hooks/use-forget";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgetPassword() {
  // Query
  const { isPending, error, forget } = useForget();

  // Form
  const form = useForm<ForgetValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetSchema),
  });

  // Function
  const onSubmit: SubmitHandler<ForgetValues> = (values) => {
    forget(values);
    localStorage.setItem("email", values.email);
  };

  // Variable
  const { isValid, isSubmitted } = form.formState;
  return (
    <>
      <div className=" w-96">
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email field */}
              <EmailInput />

              {/* Feedback */}
              {form.formState.errors.email && (
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
                className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-none mt-6"
              >
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Continue <ArrowRight size={18} />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    </>
  );
}
