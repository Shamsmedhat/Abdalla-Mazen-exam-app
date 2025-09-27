import React from "react";
import RegisterForm from "../_components/register-form";
import ExamAppSide from "../_components/exam-app-side";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <main className="flex min-h-screen ">
        {/* Feature side */}
        <aside className="w-1/2">
          <ExamAppSide />
        </aside>

        {/* Register side */}
        <section className="w-1/2 flex justify-center flex-col  items-center  ">
          <div className=" flex flex-col space-y-4 ">
            {/* Headline */}
            <h1 className="text-gray-800 font-bold text-3xl mb-4   ">
              {" "}
              Create Account
            </h1>
            {/* Register component */}
            <RegisterForm />

            {/* Login link */}
            <span className="mt-9 text-center text-gray-500">
              Already have an account ?{" "}
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
