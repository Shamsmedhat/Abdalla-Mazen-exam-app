import React from "react";
import OtpInput from "../_components/otp-input";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import ExamAppSide from "../_components/exam-app-side";

export default function OtpInputPage() {
  return (
    <>
      <main className="flex min-h-screen ">
        {/* Feature side */}
        <aside className="w-1/2">
          <ExamAppSide />
        </aside>

        <section className="w-1/2 flex justify-center flex-col  items-center  ">
          <div>
            {/* Back to forget page */}
            <div className="w-10 h-10 flex items-center justify-center border border-gray-200  mb-10">
              <Link href={"/forget"}>
                <MoveLeft size={24} className="text-gray-600" />
              </Link>
            </div>
            {/* Headline */}
            <h1 className="text-gray-800 font-bold text-3xl mb-3 ">
              Verify OTP
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 text-base">
              Please enter the 6-digits code we have sent to:
            </p>

            <div className="mb-10">
              {/* Back to forget page to edit email */}
              <span className="text-gray-800 text-base font-normal ">
                user@example.com.{" "}
                <Link
                  href="/forget"
                  className="text-blue-600 font-medium underline "
                >
                  Edit
                </Link>
              </span>
            </div>

            {/* OTP field component */}
            <div className="flex items-center justify-center flex-col gap-6">
              <OtpInput />
            </div>
          </div>

          {/* Register link */}
          <span className="mt-9 text-center text-gray-500">
            Don’t have an account ?{" "}
            <Link href="/register" className="text-blue-600">
              Create yours
            </Link>
          </span>
        </section>
      </main>
    </>
  );
}
