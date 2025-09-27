import React from "react";
import ExamAppSide from "../_components/exam-app-side";
import { MoveLeft } from "lucide-react";
import NewPasswordForm from "../_components/new-password-form";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default function page() {
  return (
    <>
      <main className="flex">
        {/* Feature side */}
        <aside className="w-1/2">
          <ExamAppSide />
        </aside>

        <section className="w-1/2 flex justify-center flex-col  items-center">
          <div>
            {/* Back to verify page */}
            <div className="w-10 h-10 flex items-center justify-center border border-gray-200  mb-10">
              <Link href={"/verify"}>
                <MoveLeft size={24} className="text-gray-600" />
              </Link>
            </div>
            {/* Headline */}
            <h1 className="text-gray-800 font-bold text-3xl mb-3 font-inter ">
              Create a New Password
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 text-base">
              Create a new strong password for your account.
            </p>
            {/* New password component */}
            <div className="flex items-center justify-center w-96 flex-col mb-10">
              <NewPasswordForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
