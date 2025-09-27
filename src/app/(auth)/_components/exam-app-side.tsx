import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";
import React from "react";

export default function ExamAppSide() {
  return (
    <div className="relative bg-blue-50 min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* blur effect */}
      <div className="absolute inset-0 backdrop-blur-[200px]"></div>

      {/* two circle */}
      <div
        className="
        absolute w-96 h-96 bg-blue-400/40 rounded-full -bottom-28 left-4 blur-3xl
      "
      ></div>
      <div
        className="
        absolute w-96 h-96 bg-blue-400/40 rounded-full top-28 -right-16 blur-3xl
      "
      ></div>

      {/* content */}
      <div className="relative z-10 max-w-lg">
        {/* Headline */}
        <h1 className="text-2xl font-bold  text-blue-600 gap-2 flex items-center   pb-32">
          <FolderCode size={40} />
          Exam App
        </h1>
        {/* description & features */}
        <div className="container mt-4">
          {/* main tagline */}
          <p className="text-gray-800 font-bold text-3xl font-inter ">
            Empower your learning journey with our smart exam platform.
          </p>

          {/* features list */}
          <ul>
            {/* feature 1 */}
            <li className="pt-12">
              <div className="flex items-center gap-5">
                <div className="border border-blue-600 p-2 rounded-md">
                  <Brain size={24} className="text-blue-600" />
                </div>
                <h2 className="font-semibold text-blue-600 text-xl">
                  Tailored Diplomas
                </h2>
              </div>
              <p className="ps-14 w-3/4 text-left text-base text-gray-700">
                Choose from specialized tracks like Frontend, Backend, and
                Mobile Development.
              </p>
            </li>

            {/* feature 2 */}
            <li className="pt-9">
              <div className="flex items-center gap-5">
                <div className="border border-blue-600 p-2 rounded-md">
                  <BookOpenCheck size={24} className="text-blue-600" />
                </div>
                <h2 className="font-semibold text-blue-600 text-xl">
                  Focused Exams
                </h2>
              </div>
              <p className="ps-14 w-3/4 text-left text-base text-gray-700">
                Access topic-specific tests including HTML, CSS, JavaScript, and
                more.
              </p>
            </li>

            {/* feature 3 */}
            <li className="pt-9">
              <div className="flex items-center gap-5">
                <div className="border border-blue-600 p-2 rounded-md">
                  <RectangleEllipsis size={24} className="text-blue-600" />
                </div>
                <h2 className="font-semibold text-blue-600 text-xl">
                  Smart Multi-Step Forms
                </h2>
              </div>
              <p className="ps-14 w-3/4 text-left text-base text-gray-700">
                Choose from specialized tracks like Frontend, Backend, and
                Mobile Development.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
