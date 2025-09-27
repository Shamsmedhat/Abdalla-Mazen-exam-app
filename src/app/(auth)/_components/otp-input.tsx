"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CodeValues, otpSchema } from "@/lib/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import React from "react";
import useVerify from "../verify/_hooks/use-verify";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import ResendCode from "./resend-timer";
import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function OtpInput() {
  // Query
  const { isPending, error, verify } = useVerify();

  // Form
  const form = useForm<CodeValues>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });

  // Function
  const onSubmit: SubmitHandler<CodeValues> = async (values) => {
    verify(values);
  };

  // Variable
  const { isValid, isSubmitted } = form.formState;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* OTP with Controller */}
        <Controller
          name="resetCode"
          control={form.control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={field.value}
              onChange={field.onChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
              </InputOTPGroup>

              <InputOTPGroup>
                <InputOTPSlot index={1} />
              </InputOTPGroup>

              <InputOTPGroup>
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPGroup>
                <InputOTPSlot index={3} />
              </InputOTPGroup>

              <InputOTPGroup>
                <InputOTPSlot index={4} />
              </InputOTPGroup>

              <InputOTPGroup>
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        <ResendCode />

        {/* Validation error */}
        {form.formState.errors.resetCode && (
          <Alert variant="destructive" className="text-center mb-2">
            <AlertDescription>
              {form.formState.errors.resetCode.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Error from server */}
        {error && (
          <Alert variant="destructive" className="text-center mb-2">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {/* submit button */}
        <Button
          disabled={isPending || (!isValid && isSubmitted)}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-none mt-4 text-sm flex items-center justify-center gap-2"
        >
          {isPending && <LoaderCircle className="animate-spin w-4 h-4" />}
          Verify Code
        </Button>
      </form>
    </FormProvider>
  );
}
