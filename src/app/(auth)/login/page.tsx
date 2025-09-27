import React from "react";
import ExamAppSide from "../_components/exam-app-side";
import LoginForm from "../_components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <main className="flex">
        {/* Feature side */}
        <aside className="w-1/2">
          <ExamAppSide />
        </aside>

        {/* Login side */}
        <section className="w-1/2 flex justify-center flex-col  items-center">
          <div className=" flex flex-col space-y-4 ">
            {/* Headline */}
            <h1 className="font-bold text-3xl py-6 text-gray-800 font-inter">
              Login
            </h1>

            {/* Login component */}
            <LoginForm />

            {/* Register link */}
            <span className="mt-9 text-center text-gray-500">
              Don’t have an account ?{" "}
              <Link href="/register" className="text-blue-600">
                Create yours
              </Link>
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
