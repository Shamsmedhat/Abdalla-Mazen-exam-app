"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogOutButton() {
  return (
    <>
      <Button
        className="bg-red-50 py-2.5 text-red-600 pr-32 rounded-none hover:text-red-700 hover:bg-red-200 "
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        {" "}
        <LogOut className="rotate-180" />
        Logout
      </Button>
    </>
  );
}
