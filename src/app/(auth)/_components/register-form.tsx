"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailInput from "./email-input";
import { PhoneInput } from "./phone-input";
import PasswordInput from "./password-input";
import { registerSchema, RegisterValues } from "@/lib/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import useRegister from "../register/_hooks/use-register";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleX, LoaderCircle } from "lucide-react";

export default function RegisterForm() {
  // Query
  const { isPending, error, register } = useRegister();

  // Form
  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  // Function
  const onSubmit: SubmitHandler<RegisterValues> = async (values) => {
    const payload = {
      ...values,
      phone: values.phone.startsWith("+20")
        ? values.phone.replace("+20", "0")
        : values.phone,
    };
    register(payload);
  };
  // Variable
  const { isValid, isSubmitted } = form.formState;
  return (
    <>
      <div className=" w-96 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <div className="flex gap-2 mb-4 ">
                {/* First name field */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      {/* First name label */}
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        {/* First name input */}
                        <Input
                          className={`placeholder:text-gray-400 border rounded-none ${
                            form.formState.errors.firstName
                              ? "border-red-600"
                              : "border-gray-200"
                          }`}
                          placeholder="Abdallah"
                          {...field}
                        />
                      </FormControl>
                      {/* Message form */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* last name field */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      {/* last name label */}
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        {/* last name input */}
                        <Input
                          className={`placeholder:text-gray-400 border rounded-none ${
                            form.formState.errors.lastName
                              ? "border-red-600"
                              : "border-gray-200"
                          }`}
                          placeholder="Mazen"
                          {...field}
                        />
                      </FormControl>
                      {/* Message form */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* User */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-4">
                  {/* User label */}
                  <FormLabel>UserName</FormLabel>
                  <FormControl>
                    {/* User input */}
                    <Input
                      className={`placeholder:text-gray-400 border rounded-none ${
                        form.formState.errors.username
                          ? "border-red-600"
                          : "border-gray-200"
                      }`}
                      placeholder="user123"
                      {...field}
                    />
                  </FormControl>
                  {/* Message form */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
            <EmailInput />

            {/* Phone field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-4">
                  {/* Phone label */}
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    {/* Phone input */}
                    <PhoneInput
                      {...field}
                      className={`placeholder:text-gray-400  rounded-none ${
                        form.formState.errors.phone
                          ? "border-red-600 border"
                          : "border-gray-200"
                      }`}
                    />
                  </FormControl>
                  {/* Message form */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password  field*/}
            <PasswordInput />

            {/* confirm password field */}
            <PasswordInput label="Confirm Password" name="rePassword" />

            {/* Feedback */}
            {(form.formState.errors.email ||
              form.formState.errors.password ||
              form.formState.errors.firstName ||
              form.formState.errors.lastName ||
              form.formState.errors.phone ||
              form.formState.errors.rePassword ||
              form.formState.errors.username) && (
              <>
                {/* Error validation */}
                <div className="relative">
                  <CircleX
                    className="absolute bg-white rounded-sm w-fit translate-y-1/2 left-1/2 -translate-x-1/2 z-10"
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
                <LoaderCircle className="animate-spin " />
              ) : (
                " Create Account"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
