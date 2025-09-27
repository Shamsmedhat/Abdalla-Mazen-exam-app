import { BookOpenCheck, ChevronLeft, Timer } from "lucide-react";
import { DynamicBreadcrumb } from "../../_components/bread-crumb";
import getExams from "@/lib/apis/exams.api";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function page() {
  let data;
  // Fetch exams
  try {
    data = await getExams();
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <div className="bg-white pt-0">
        {/* Breadcrumb navigation */}
        <div className="p-4">
          <DynamicBreadcrumb />
        </div>

        <div className="p-6 bg-gray-100">
          {/* Header */}
          <div className="flex justify-between gap-2">
            <div className="border border-blue-600 flex items-center">
              <Link href={"/dashboard"}>
              <ChevronLeft className="mx-2 text-blue-600" />
              </Link>
            </div>
            <div className="flex bg-blue-600 p-4 gap-4 text-white w-full">
              <BookOpenCheck size={45} />
              {/* Headline */}
              <h1 className="text-3xl font-semibold"> Exams</h1>
            </div>
          </div>
          {/* Exam list */}
          <div className="bg-white  my-6">
            <div className="flex  flex-wrap items-center align-middle  ">
              {data?.exams?.map((d) => (
                <Link
                  key={d._id}
                  className="bg-blue-50 flex flex-wrap w-full justify-between mt-6 mb-4 px-4 mx-6 items-center"
                  href={`/dashboard/exams/${d._id}`}
                >
                  <div className="flex justify-between flex-col">
                    {/* Exam title & number of questions */}
                    <h2 className="text-blue-600 font-semibold text-xl mb-1">
                      {d.title}
                    </h2>
                    <span className="text-gray-500">
                      {d.numberOfQuestions} Questions
                    </span>
                  </div>
                  {/* Exam duration */}
                  <div className="flex py-7 items-center">
                    <Timer size={24} className="text-gray-800 mr-1.5" />
                    <p className="text-gray-800 text-sm ">
                      Duration: 20 minutes
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
