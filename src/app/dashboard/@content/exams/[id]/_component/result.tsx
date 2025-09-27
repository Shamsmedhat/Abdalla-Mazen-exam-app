import React from "react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FolderSearch, RotateCcw } from "lucide-react";
import { ExamResultResponse } from "@/lib/types/result";

type ResultProps = {
  data?: ExamResultResponse;
};
export default function Result({ data }: ResultProps) {
  //  Prepares chart data
  const chartData = [
    { name: "correct", value: data?.correct, fill: `#00BC7D` },
    { name: "wrong", value: data?.wrong, fill: `#EF4444` },
  ];
  return (
    <>
      <section className="bg-white border-none p-6 m-6">
        {/* Headline */}
        <h3 className="text-blue-600 font-semibold text-2xl mt-6">Results:</h3>
        <div className="flex flex-row">
          {/* Pie chart  */}
          <Card className="flex flex-col border-none shadow-none  justify-center  ">
            <CardHeader className="items-center pb-0  ">
              <CardTitle className="sr-only">result</CardTitle>
              <CardDescription className="sr-only">
                exam result and correct answer
              </CardDescription>
            </CardHeader>
            <CardContent className=" pb-0">
              <ChartContainer
                config={{
                  correct: { label: "correct", color: `#00BC7D` },
                  wrong: { label: "wrong", color: `#EF4444` },
                }}
                className="mx-auto aspect-square h-52"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
            {/* Footer */}
            <CardFooter className="flex-col gap-2 text-sm items-center justify-center">
              <div className="flex items-center gap-2 leading-none text-sm font-medium  before:bg-emerald-500 before:h-3 before:w-3 before:mr-1.5">
                Correct: {data?.correct}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium leading-none  before:bg-red-500 before:h-3 before:w-3">
                Incorrect: {data?.wrong}
              </div>
            </CardFooter>
          </Card>

          <div>
            {/*  Scrollable list of wrong questions */}
            <ScrollArea className="h-[514px]  rounded-md border-none p-4 flex-grow ">
              {data?.WrongQuestions?.map((qes) => (
                <div key={qes.QID} className="mb-3 border-b pb-2">
                  <h3 className="font-semibold text-xl text-blue-600">
                    {qes.Question}
                  </h3>
                  <p
                    className="relative  text-gray-800 text-sm bg-red-50 py-4 mt-2.5
  before:content-[''] before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2
  before:h-4 before:w-4 before:rounded-full before:border before:border-red-600
  after:content-[''] after:absolute after:left-[10px] after:top-1/2 after:-translate-y-1/2  after:translate-x-0.5 pl-8
  after:h-2 after:w-2 after:rounded-full after:bg-red-600"
                  >
                    Your Answer: {qes.answers[qes.inCorrectAnswer]}
                  </p>
                  <p
                    className="relative pl-8 text-gray-800 text-sm bg-green-50 py-4 mt-2.5
  before:content-[''] before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2
  before:h-4 before:w-4 before:rounded-full before:border before:border-green-600 gap-2"
                  >
                    Correct Answer: {qes.answers[qes.correctAnswer]}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="flex pt-6 w-full gap-2.5">
          <Button className="flex-grow shadow-none bg-gray-200 text-gray-800 font-medium text-sm rounded-none hover:bg-gray-300 py-3.5 ">
            <Link href={"/dashboard/exams"} className="flex  gap-2">
              {" "}
              <RotateCcw size={18} />
              Restart
            </Link>
          </Button>
          <Button className="flex-grow shadow-none bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-none py-3.5">
            <Link href={"/dashboard"} className="flex py-3.5 gap-2">
              {" "}
              <FolderSearch />
              Explore
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
