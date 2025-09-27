
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  name?: string;
  label?: string;
}

export default function PasswordInput({
  name = "password",
  label = "Password",
}: PasswordInputProps) {
  const { control , formState } = useFormContext();
  const [show, setShow] = useState(false);
 
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                placeholder="************"
                type={show ? "text" : "password"}
              className={`placeholder:text-gray-400 border rounded-none ${
  formState.errors[name] ? "border-red-600" : "border-gray-200"
}`}

                {...field}
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 "
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <FormMessage />
        
        </FormItem>
      )}
    />
  );
}
