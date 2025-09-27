// "use client";
// import * as React from "react";
// import { useCallback, useEffect, useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Form, FormItem, FormControl } from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";

// import getQuestions from "@/lib/apis/questions.api";
// import TimerDonut from "../_components/timer-exam";
// import { DynamicBreadcrumb } from "@/app/dashboard/_components/bread-crumb";
// import { ChevronLeft, ChevronRight, CircleQuestionMark } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Progress } from "@/components/ui/progress";
// import { submitAnswer } from "../_actions/submit-answer.action";
// import Result from "./_component/result";
// import Link from "next/link";
// import {
//   Question,
//   ExamResultResponse,
//   Answer,
//   WrongQuestion,
//   CorrectQuestion,
//   QuestionsApiResponse,
// } from "@/lib/types/result";

// // Schema
// const answerSchema = z.object({
//   answers: z.record(z.string(), z.string().min(1, "Please choose answer")),
// });

// type AnswerValues = z.infer<typeof answerSchema>;
// type Props = { params: { id: string } };

// export default function ExamPage({ params }: Props) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [totalSeconds, setTotalSeconds] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState(false);
//   const [data, setData] = useState<ExamResultResponse | undefined>(undefined);

//   // Form
//   const form = useForm<AnswerValues>({
//     resolver: zodResolver(answerSchema),
//     defaultValues: { answers: {} },
//   });
//   const { errors } = form.formState;

//   // Submit handler
//   const handleSubmitAll = useCallback(async () => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     const payload = {
//       answers: Object.entries(answers).map(([questionId, correct]) => ({
//         questionId,
//         correct,
//       })),
//       time: totalSeconds - timeLeft,
//     };

//     try {
//       const response = await submitAnswer(
//         payload as unknown as Record<string, FormDataEntryValue>
//       );
//       const convertAnswersToRecord = (
//         answers: Answer[]
//       ): Record<string, string> => {
//         const record: Record<string, string> = {};
//         answers.forEach((answer) => {
//           record[answer.key] = answer.answer;
//         });
//         return record;
//       };

//       const transformedData: ExamResultResponse = {
//         message: response.message || "success",
//         correct: response.correct || 0,
//         wrong: response.wrong || 0,
//         total: response.total || "0%",
//         WrongQuestions: (response.WrongQuestions || []).map(
//           (wrongQ: Question): WrongQuestion => ({
//             QID: wrongQ._id,
//             Question: wrongQ.question,
//             inCorrectAnswer: answers[wrongQ._id] || "",
//             correctAnswer: wrongQ.correct,
//             answers: convertAnswersToRecord(wrongQ.answers),
//           })
//         ),
//         correctQuestions: (response.correctQuestions || []).map(
//           (correctQ: Question): CorrectQuestion => ({
//             QID: correctQ._id,
//             Question: correctQ.question,
//             correctAnswer: correctQ.correct,
//             answers: convertAnswersToRecord(correctQ.answers),
//           })
//         ),
//       };

//       setData(transformedData);
//       localStorage.removeItem("examEndTime");
//       localStorage.removeItem("idExam");
//       setResult(true);
//     } catch (error) {
//       console.error("Error submitting exam:", error);
//       setIsSubmitting(false);
//     }
//   }, [answers, isSubmitting, totalSeconds, timeLeft]);

//   // Load questions
//   useEffect(() => {
//     (async () => {
//       try {
//         const data: QuestionsApiResponse = await getQuestions({
//           params: { id: params.id },
//         });
//         setQuestions(data?.questions || []);

//         const duration = (data?.questions?.[0]?.exam?.duration || 20) * 60;
//         setTotalSeconds(duration);

//         const savedEndTime = localStorage.getItem("examEndTime");
//         const idExam = localStorage.getItem("idExam");

//         let endTime: number;
//         if (savedEndTime && idExam === params.id) {
//           endTime = parseInt(savedEndTime, 10);
//         } else {
//           endTime = Date.now() + duration * 1000;
//           localStorage.setItem("examEndTime", String(endTime));
//           localStorage.setItem("idExam", params.id);
//         }

//         const remaining = Math.max(
//           0,
//           Math.floor((endTime - Date.now()) / 1000)
//         );
//         setTimeLeft(remaining);
//       } catch (error) {
//         console.error("Error loading questions:", error);
//       }
//     })();
//   }, [params.id]);

//   // Timer
//   useEffect(() => {
//     if (!totalSeconds || timeLeft <= 0) {
//       if (timeLeft === 0 && totalSeconds > 0) handleSubmitAll();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           handleSubmitAll();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [totalSeconds, handleSubmitAll, timeLeft]);

//   // Navigation handlers
//   const handleNext = (values: AnswerValues) => {
//     const q = questions[current];
//     const currentAnswer = values.answers[q._id];

//     setAnswers((prev) => ({ ...prev, [q._id]: currentAnswer }));
//     setCurrent((c) => c + 1);

//     const nextQuestion = questions[current + 1];
//     if (nextQuestion) {
//       form.reset({
//         answers: { [nextQuestion._id]: answers[nextQuestion._id] || "" },
//       });
//     }
//   };

//   const handlePrevious = () => {
//     const q = questions[current];
//     const currentValues = form.getValues();
//     if (currentValues.answers[q._id]) {
//       setAnswers((prev) => ({
//         ...prev,
//         [q._id]: currentValues.answers[q._id],
//       }));
//     }

//     setCurrent((c) => c - 1);
//     const prevQuestion = questions[current - 1];
//     if (prevQuestion) {
//       form.reset({
//         answers: { [prevQuestion._id]: answers[prevQuestion._id] || "" },
//       });
//     }
//   };

//   useEffect(() => {
//     if (questions.length > 0 && questions[current]) {
//       const q = questions[current];
//       form.reset({ answers: { [q._id]: answers[q._id] || "" } });
//     }
//   }, [current, questions, answers, form]);

//   // Loading
//   if (!questions.length) {
//     return (
//        <div className="flex justify-center items-center h-64">
//             <p className="text-xl font-semibold text-blue-600 animate-pulse">
//               Loading Exam Qustions...
//             </p>
//           </div>
//     );
//   }

//   const q = questions[current];
//   if (!q) return <p>Question not found</p>;

//   return (
//     <div className="pt-0 flex flex-col min-h-screen">
//       {/* Breadcrumb */}
//       <div className="p-4">
//         <DynamicBreadcrumb />
//       </div>

//       {/* Exam Header */}
//       <div className="p-6 bg-gray-100">
//         <div className="flex justify-between gap-2">
//           <div className="border border-blue-600 flex items-center">
//             <Link href={"/dashboard/exams"}>
//               <ChevronLeft className="mx-2 text-blue-600" />
//             </Link>
//           </div>
//           <div className="flex bg-blue-600 p-4 gap-4 text-white w-full">
//             <CircleQuestionMark size={45} />
//             <h1 className="text-3xl font-semibold">
//               {q.exam?.title || "Questions"}
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Exam Body */}
//       {!result ? (
//         <div className="p-6 space-y-6 mx-6 bg-white flex-1">
//           <Progress
//             value={((current + 1) / questions.length) * 100}
//             className="bg-blue-50 [&>div]:bg-blue-600"
//           />

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(
//                 current < questions.length - 1 ? handleNext : handleSubmitAll
//               )}
//               className="space-y-6 h-full flex flex-col"
//             >
//               <section className="flex-1">
//                 <h2 className="text-blue-600 font-semibold text-2xl mb-6">
//                   Question {current + 1} of {questions.length}: {q.question}
//                 </h2>

//                 <Controller
//                   name={`answers.${q._id}`}
//                   control={form.control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <RadioGroup
//                           value={field.value}
//                           onValueChange={field.onChange}
//                           className="space-y-3"
//                         >
//                           {q.answers?.map((ans) => (
//                             <Label
//                               htmlFor={`${q._id}-${ans.key}`}
//                               key={ans.key}
//                               className="cursor-pointer"
//                             >
//                               <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <RadioGroupItem
//                                   value={ans.key}
//                                   id={`${q._id}-${ans.key}`}
//                                   className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600 fill-none"
//                                 />
//                                 <span className="text-sm font-medium">
//                                   {ans.answer}
//                                 </span>
//                               </div>
//                             </Label>
//                           ))}
//                         </RadioGroup>
//                       </FormControl>

//                       {errors.answers?.[q._id] && (
//                         <Alert
//                           variant="destructive"
//                           className="text-center mb-4"
//                         >
//                           <AlertDescription>
//                             Please choose the correct answer
//                           </AlertDescription>
//                         </Alert>
//                       )}
//                     </FormItem>
//                   )}
//                 />
//               </section>

//               <div className="flex justify-between items-center pt-6">
//                 <Button
//                   type="button"
//                   disabled={current === 0}
//                   onClick={handlePrevious}
//                   className="flex items-center gap-2 px-6 w-full py-3.5 rounded-none bg-gray-200 text-gray-400 font-medium text-sm hover:bg-gray-300 hover:text-gray-500"
//                 >
//                   <ChevronLeft size={16} /> Previous
//                 </Button>

//                 <div className="flex items-center gap-4">
//                   <TimerDonut totalSeconds={totalSeconds} timeLeft={timeLeft} />
//                 </div>

//                 {current < questions.length - 1 ? (
//                   <Button
//                     type="submit"
//                     className="flex items-center py-3.5 gap-2 px-6 w-full rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
//                   >
//                     Next <ChevronRight size={16} />
//                   </Button>
//                 ) : (
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-6 w-full py-3.5 rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
//                   >
//                     {isSubmitting ? "Submitting..." : "Submit Exam"}
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </div>
//       ) : (
//         <Result data={data} />
//       )}
//     </div>
//   );
// }

// "use client";
// import * as React from "react";
// import { useCallback, useEffect, useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Form, FormItem, FormControl } from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";

// import getQuestions from "@/lib/apis/questions.api";
// import TimerDonut from "../_components/timer-exam";
// import { DynamicBreadcrumb } from "@/app/dashboard/_components/bread-crumb";
// import { ChevronLeft, ChevronRight, CircleQuestionMark } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Progress } from "@/components/ui/progress";
// import { submitAnswer } from "../_actions/submit-answer.action";
// import Result from "./_component/result";
// import Link from "next/link";
// import {
//   Question,
//   ExamResultResponse,
//   Answer,
//   WrongQuestion,
//   CorrectQuestion,
//   QuestionsApiResponse,
// } from "@/lib/types/result";

// // Schema
// const answerSchema = z.object({
//   answers: z.record(z.string(), z.string().min(1, "Please choose answer")),
// });

// type AnswerValues = z.infer<typeof answerSchema>;
// type Props = { params: { id: string } };

// export default function ExamPage({ params }: Props) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [totalSeconds, setTotalSeconds] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState(false);
//   const [data, setData] = useState<ExamResultResponse | undefined>(undefined);

//   // Form
//   const form = useForm<AnswerValues>({
//     resolver: zodResolver(answerSchema),
//     defaultValues: { answers: {} },
//   });
//   const { errors } = form.formState;

//   // Submit handler
//   const handleSubmitAll = useCallback(async () => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     const payload = {
//       answers: Object.entries(answers).map(([questionId, correct]) => ({
//         questionId,
//         correct,
//       })),
//       time: totalSeconds - timeLeft,
//     };

//     try {
//       const response = await submitAnswer(
//         payload as unknown as Record<string, FormDataEntryValue>
//       );

//       // Helper function to convert answers to record format
//       const convertAnswersToRecord = (
//         answers: Answer[] | Record<string, string>
//       ): Record<string, string> => {
//         // If it's already a record/object, return it as is
//         if (!Array.isArray(answers)) {
//           return answers as Record<string, string>;
//         }

//         // If it's an array, convert it to a record
//         const record: Record<string, string> = {};
//         answers.forEach((answer) => {
//           record[answer.key] = answer.answer;
//         });
//         console.log(record)
//         console.log("res",response)
//         return record;
//       };

//       const transformedData: ExamResultResponse = {
//         message: response.message || "success",
//         correct: response.correct || 0,
//         wrong: response.wrong || 0,
//         total: response.total || "0%",
//         WrongQuestions: (response.WrongQuestions || []).map(
//           (wrongQ: Question): WrongQuestion => ({
//             QID: wrongQ._id,
//             Question: wrongQ.question,
//             inCorrectAnswer: answers[wrongQ._id] || "",
//             correctAnswer: wrongQ.correct,
//             answers: convertAnswersToRecord(wrongQ.answers),
//           })
//         ),
//         correctQuestions: (response.correctQuestions || []).map(
//           (correctQ: Question): CorrectQuestion => ({
//             QID: correctQ._id,
//             Question: correctQ.question,
//             correctAnswer: correctQ.correct,
//             answers: convertAnswersToRecord(correctQ.answers),
//           })
//         ),
//       };

//       setData(transformedData);
//       localStorage.removeItem("examEndTime");
//       localStorage.removeItem("idExam");
//       setResult(true);
//     } catch (error) {
//       console.error("Error submitting exam:", error);
//       setIsSubmitting(false);
//     }
//   }, [answers, isSubmitting, totalSeconds, timeLeft]);

//   // Load questions
//   useEffect(() => {
//     (async () => {
//       try {
//         const data: QuestionsApiResponse = await getQuestions({
//           params: { id: params.id },
//         });
//         setQuestions(data?.questions || []);

//         const duration = (data?.questions?.[0]?.exam?.duration || 20) * 60;
//         setTotalSeconds(duration);

//         const savedEndTime = localStorage.getItem("examEndTime");
//         const idExam = localStorage.getItem("idExam");

//         let endTime: number;
//         if (savedEndTime && idExam === params.id) {
//           endTime = parseInt(savedEndTime, 10);
//         } else {
//           endTime = Date.now() + duration * 1000;
//           localStorage.setItem("examEndTime", String(endTime));
//           localStorage.setItem("idExam", params.id);
//         }

//         const remaining = Math.max(
//           0,
//           Math.floor((endTime - Date.now()) / 1000)
//         );
//         setTimeLeft(remaining);
//       } catch (error) {
//         console.error("Error loading questions:", error);
//       }
//     })();
//   }, [params.id]);

//   // Timer
//   useEffect(() => {
//     if (!totalSeconds || timeLeft <= 0) {
//       if (timeLeft === 0 && totalSeconds > 0) handleSubmitAll();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           handleSubmitAll();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [totalSeconds, handleSubmitAll, timeLeft]);

//   // Navigation handlers
//   const handleNext = (values: AnswerValues) => {
//     const q = questions[current];
//     const currentAnswer = values.answers[q._id];

//     setAnswers((prev) => ({ ...prev, [q._id]: currentAnswer }));
//     setCurrent((c) => c + 1);

//     const nextQuestion = questions[current + 1];
//     if (nextQuestion) {
//       form.reset({
//         answers: { [nextQuestion._id]: answers[nextQuestion._id] || "" },
//       });
//     }
//   };

//   const handlePrevious = () => {
//     const q = questions[current];
//     const currentValues = form.getValues();
//     if (currentValues.answers[q._id]) {
//       setAnswers((prev) => ({
//         ...prev,
//         [q._id]: currentValues.answers[q._id],
//       }));
//     }

//     setCurrent((c) => c - 1);
//     const prevQuestion = questions[current - 1];
//     if (prevQuestion) {
//       form.reset({
//         answers: { [prevQuestion._id]: answers[prevQuestion._id] || "" },
//       });
//     }
//   };

//   useEffect(() => {
//     if (questions.length > 0 && questions[current]) {
//       const q = questions[current];
//       form.reset({ answers: { [q._id]: answers[q._id] || "" } });
//     }
//   }, [current, questions, answers, form]);

//   // Loading
//   if (!questions.length) {
//     return (
//        <div className="flex justify-center items-center h-64">
//             <p className="text-xl font-semibold text-blue-600 animate-pulse">
//               Loading Exam Questions...
//             </p>
//           </div>
//     );
//   }

//   const q = questions[current];
//   if (!q) return <p>Question not found</p>;

//   return (
//     <div className="pt-0 flex flex-col min-h-screen">
//       {/* Breadcrumb */}
//       <div className="p-4">
//         <DynamicBreadcrumb />
//       </div>

//       {/* Exam Header */}
//       <div className="p-6 bg-gray-100">
//         <div className="flex justify-between gap-2">
//           <div className="border border-blue-600 flex items-center">
//             <Link href={"/dashboard/exams"}>
//               <ChevronLeft className="mx-2 text-blue-600" />
//             </Link>
//           </div>
//           <div className="flex bg-blue-600 p-4 gap-4 text-white w-full">
//             <CircleQuestionMark size={45} />
//             <h1 className="text-3xl font-semibold">
//               {q.exam?.title || "Questions"}
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Exam Body */}
//       {!result ? (
//         <div className="p-6 space-y-6 mx-6 bg-white flex-1">
//           <Progress
//             value={((current + 1) / questions.length) * 100}
//             className="bg-blue-50 [&>div]:bg-blue-600"
//           />

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(
//                 current < questions.length - 1 ? handleNext : handleSubmitAll
//               )}
//               className="space-y-6 h-full flex flex-col"
//             >
//               <section className="flex-1">
//                 <h2 className="text-blue-600 font-semibold text-2xl mb-6">
//                   Question {current + 1} of {questions.length}: {q.question}
//                 </h2>

//                 <Controller
//                   name={`answers.${q._id}`}
//                   control={form.control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <RadioGroup
//                           value={field.value}
//                           onValueChange={field.onChange}
//                           className="space-y-3"
//                         >
//                           {q.answers?.map((ans) => (
//                             <Label
//                               htmlFor={`${q._id}-${ans.key}`}
//                               key={ans.key}
//                               className="cursor-pointer"
//                             >
//                               <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <RadioGroupItem
//                                   value={ans.key}
//                                   id={`${q._id}-${ans.key}`}
//                                   className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600 fill-none"
//                                 />
//                                 <span className="text-sm font-medium">
//                                   {ans.answer}
//                                 </span>
//                               </div>
//                             </Label>
//                           ))}
//                         </RadioGroup>
//                       </FormControl>

//                       {errors.answers?.[q._id] && (
//                         <Alert
//                           variant="destructive"
//                           className="text-center mb-4"
//                         >
//                           <AlertDescription>
//                             Please choose the correct answer
//                           </AlertDescription>
//                         </Alert>
//                       )}
//                     </FormItem>
//                   )}
//                 />
//               </section>

//               <div className="flex justify-between items-center pt-6">
//                 <Button
//                   type="button"
//                   disabled={current === 0}
//                   onClick={handlePrevious}
//                   className="flex items-center gap-2 px-6 w-full py-3.5 rounded-none bg-gray-200 text-gray-400 font-medium text-sm hover:bg-gray-300 hover:text-gray-500"
//                 >
//                   <ChevronLeft size={16} /> Previous
//                 </Button>

//                 <div className="flex items-center gap-4">
//                   <TimerDonut totalSeconds={totalSeconds} timeLeft={timeLeft} />
//                 </div>

//                 {current < questions.length - 1 ? (
//                   <Button
//                     type="submit"
//                     className="flex items-center py-3.5 gap-2 px-6 w-full rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
//                   >
//                     Next <ChevronRight size={16} />
//                   </Button>
//                 ) : (
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-6 w-full py-3.5 rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
//                   >
//                     {isSubmitting ? "Submitting..." : "Submit Exam"}
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </div>
//       ) : (
//         <Result data={data} />
//       )}
//     </div>
//   );
// }

// "use client";
// import * as React from "react";
// import { useCallback, useEffect, useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Form, FormItem, FormControl } from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";

// import getQuestions from "@/lib/apis/questions.api";
// import TimerDonut from "../_components/timer-exam";
// import { DynamicBreadcrumb } from "@/app/dashboard/_components/bread-crumb";
// import { ChevronLeft, ChevronRight, CircleQuestionMark } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Progress } from "@/components/ui/progress";
// import { submitAnswer } from "../_actions/submit-answer.action";
// import Result from "./_component/result";
// import Link from "next/link";
// import {
//   Question,
//   ExamResultResponse,
//   Answer,
//   WrongQuestion,
//   CorrectQuestion,
//   QuestionsApiResponse,
// } from "@/lib/types/result";

// // Schema
// const answerSchema = z.object({
//   answers: z.record(z.string(), z.string().min(1, "Please choose answer")),
// });

// type AnswerValues = z.infer<typeof answerSchema>;
// type Props = { params: { id: string } };

// export default function ExamPage({ params }: Props) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [totalSeconds, setTotalSeconds] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState(false);
//   const [data, setData] = useState<ExamResultResponse | undefined>(undefined);

//   // Form
//   const form = useForm<AnswerValues>({
//     resolver: zodResolver(answerSchema),
//     defaultValues: { answers: {} },
//   });
//   const { errors } = form.formState;

//   // Submit handler
//   const handleSubmitAll = useCallback(async () => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     const payload = {
//       answers: Object.entries(answers).map(([questionId, correct]) => ({
//         questionId,
//         correct,
//       })),
//       time: totalSeconds - timeLeft,
//     };

//     try {
//       const response = await submitAnswer(
//         payload as unknown as Record<string, FormDataEntryValue>
//       );

//       // Debug: طباعة البيانات الواردة من الخادم
//       console.log("Response from server:", response);
//       console.log("WrongQuestions:", response.WrongQuestions);
//       console.log("correctQuestions:", response.correctQuestions);

//       // Helper function to convert answers to record format
//       const convertAnswersToRecord = (
//         answers: Answer[] | Record<string, string>
//       ): Record<string, string> => {
//         // If it's already a record/object, return it as is
//         if (!Array.isArray(answers)) {
//           return answers as Record<string, string>;
//         }

//         // If it's an array, convert it to a record
//         const record: Record<string, string> = {};
//         answers.forEach((answer) => {
//           record[answer.key] = answer.answer;
//         });
//         return record;
//       };

//       const transformedData: ExamResultResponse = {
//         message: response.message || "success",
//         correct: response.correct || 0,
//         wrong: response.wrong || 0,
//         total: response.total || "0%",
//         WrongQuestions: (response.WrongQuestions || []).map(
//           (wrongQ: any, index: number): WrongQuestion => ({
//             QID: wrongQ._id || wrongQ.QID || wrongQ.id || `wrong-${index}`,
//             Question: wrongQ.question || wrongQ.Question || "Question not available",
//             inCorrectAnswer: answers[wrongQ._id || wrongQ.QID || wrongQ.id] || "No answer selected",
//             correctAnswer: wrongQ.correct || wrongQ.correctAnswer || "Correct answer not available",
//             answers: convertAnswersToRecord(wrongQ.answers || {}),
//           })
//         ),
//         correctQuestions: (response.correctQuestions || []).map(
//           (correctQ: any, index: number): CorrectQuestion => ({
//             QID: correctQ._id || correctQ.QID || correctQ.id || `correct-${index}`,
//             Question: correctQ.question || correctQ.Question || "Question not available",
//             correctAnswer: correctQ.correct || correctQ.correctAnswer || "Correct answer not available",
//             answers: convertAnswersToRecord(correctQ.answers || {}),
//           })
//         ),
//       };

//       setData(transformedData);
//       localStorage.removeItem("examEndTime");
//       localStorage.removeItem("idExam");
//       setResult(true);
//     } catch (error) {
//       console.error("Error submitting exam:", error);
//       setIsSubmitting(false);
//     }
//   }, [answers, isSubmitting, totalSeconds, timeLeft]);

//   // Load questions
//   useEffect(() => {
//     (async () => {
//       try {
//         const data: QuestionsApiResponse = await getQuestions({
//           params: { id: params.id },
//         });
//         setQuestions(data?.questions || []);

//         const duration = (data?.questions?.[0]?.exam?.duration || 20) * 60;
//         setTotalSeconds(duration);

//         const savedEndTime = localStorage.getItem("examEndTime");
//         const idExam = localStorage.getItem("idExam");

//         let endTime: number;
//         if (savedEndTime && idExam === params.id) {
//           endTime = parseInt(savedEndTime, 10);
//         } else {
//           endTime = Date.now() + duration * 1000;
//           localStorage.setItem("examEndTime", String(endTime));
//           localStorage.setItem("idExam", params.id);
//         }

//         const remaining = Math.max(
//           0,
//           Math.floor((endTime - Date.now()) / 1000)
//         );
//         setTimeLeft(remaining);
//       } catch (error) {
//         console.error("Error loading questions:", error);
//       }
//     })();
//   }, [params.id]);

//   // Timer
//   useEffect(() => {
//     if (!totalSeconds || timeLeft <= 0) {
//       if (timeLeft === 0 && totalSeconds > 0) handleSubmitAll();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           handleSubmitAll();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [totalSeconds, handleSubmitAll, timeLeft]);

//   // Navigation handlers
//   const handleNext = (values: AnswerValues) => {
//     const q = questions[current];
//     const currentAnswer = values.answers[q._id];

//     setAnswers((prev) => ({ ...prev, [q._id]: currentAnswer }));
//     setCurrent((c) => c + 1);

//     const nextQuestion = questions[current + 1];
//     if (nextQuestion) {
//       form.reset({
//         answers: { [nextQuestion._id]: answers[nextQuestion._id] || "" },
//       });
//     }
//   };

//   const handlePrevious = () => {
//     const q = questions[current];
//     const currentValues = form.getValues();
//     if (currentValues.answers[q._id]) {
//       setAnswers((prev) => ({
//         ...prev,
//         [q._id]: currentValues.answers[q._id],
//       }));
//     }

//     setCurrent((c) => c - 1);
//     const prevQuestion = questions[current - 1];
//     if (prevQuestion) {
//       form.reset({
//         answers: { [prevQuestion._id]: answers[prevQuestion._id] || "" },
//       });
//     }
//   };

//   useEffect(() => {
//     if (questions.length > 0 && questions[current]) {
//       const q = questions[current];
//       form.reset({ answers: { [q._id]: answers[q._id] || "" } });
//     }
//   }, [current, questions, answers, form]);

//   // Loading
//   if (!questions.length) {
//     return (
//        <div className="flex justify-center items-center h-64">
//             <p className="text-xl font-semibold text-blue-600 animate-pulse">
//               Loading Exam Questions...
//             </p>
//           </div>
//     );
//   }

//   const q = questions[current];
//   if (!q) return <p>Question not found</p>;

//   return (
//     <div className="pt-0 flex flex-col min-h-screen">
//       {/* Breadcrumb */}
//       <div className="p-4">
//         <DynamicBreadcrumb />
//       </div>

//       {/* Exam Header */}
//       <div className="p-6 bg-gray-100">
//         <div className="flex justify-between gap-2">
//           <div className="border border-blue-600 flex items-center">
//             <Link href={"/dashboard/exams"}>
//               <ChevronLeft className="mx-2 text-blue-600" />
//             </Link>
//           </div>
//           <div className="flex bg-blue-600 p-4 gap-4 text-white w-full">
//             <CircleQuestionMark size={45} />
//             <h1 className="text-3xl font-semibold">
//               {q.exam?.title || "Questions"}
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Exam Body */}
//       {!result ? (
//         <div className="p-6 space-y-6 mx-6 bg-white flex-1">
//           <Progress
//             value={((current + 1) / questions.length) * 100}
//             className="bg-blue-50 [&>div]:bg-blue-600"
//           />

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(
//                 current < questions.length - 1 ? handleNext : handleSubmitAll
//               )}
//               className="space-y-6 h-full flex flex-col"
//             >
//               <section className="flex-1">
//                 <h2 className="text-blue-600 font-semibold text-2xl mb-6">
//                   Question {current + 1} of {questions.length}: {q.question}
//                 </h2>

//                 <Controller
//                   name={`answers.${q._id}`}
//                   control={form.control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <RadioGroup
//                           value={field.value}
//                           onValueChange={field.onChange}
//                           className="space-y-3"
//                         >
//                           {q.answers?.map((ans) => (
//                             <Label
//                               htmlFor={`${q._id}-${ans.key}`}
//                               key={ans.key}
//                               className="cursor-pointer"
//                             >
//                               <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <RadioGroupItem
//                                   value={ans.key}
//                                   id={`${q._id}-${ans.key}`}
//                                   className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600 fill-none"
//                                 />
//                                 <span className="text-sm font-medium">
//                                   {ans.answer}
//                                 </span>
//                               </div>
//                             </Label>
//                           ))}
//                         </RadioGroup>
//                       </FormControl>

//                       {errors.answers?.[q._id] && (
//                         <Alert
//                           variant="destructive"
//                           className="text-center mb-4"
//                         >
//                           <AlertDescription>
//                             Please choose the correct answer
//                           </AlertDescription>
//                         </Alert>
//                       )}
//                     </FormItem>
//                   )}
//                 />
//               </section>

//               <div className="flex justify-between items-center pt-6">
//                 <Button
//                   type="button"
//                   disabled={current === 0}
//                   onClick={handlePrevious}
//                   className="flex items-center gap-2 px-6 w-full py-3.5 rounded-none bg-gray-200 text-gray-400 font-medium text-sm hover:bg-gray-300 hover:text-gray-500"
//                 >
//                   <ChevronLeft size={16} /> Previous
//                 </Button>

//                 <div className="flex items-center gap-4">
//                   <TimerDonut totalSeconds={totalSeconds} timeLeft={timeLeft} />
//                 </div>

//                 {current < questions.length - 1 ? (
//                   <Button
//                     type="submit"
//                     className="flex items-center py-3.5 gap-2 px-6 w-full rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
//                   >
//                     Next <ChevronRight size={16} />
//                   </Button>
//                 ) : (
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-6 w-full py-3.5 rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
//                   >
//                     {isSubmitting ? "Submitting..." : "Submit Exam"}
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </div>
//       ) : (
//         <Result data={data} />
//       )}
//     </div>
//   );
// }

"use client";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import getQuestions from "@/lib/apis/questions.api";
import TimerDonut from "../_components/timer-exam";
import { DynamicBreadcrumb } from "@/app/dashboard/_components/bread-crumb";
import { ChevronLeft, ChevronRight, CircleQuestionMark } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { submitAnswer } from "../_actions/submit-answer.action";
import Result from "./_component/result";
import Link from "next/link";
import {
  Question,
  ExamResultResponse,
  Answer,
  WrongQuestion,
  CorrectQuestion,
  QuestionsApiResponse,
} from "@/lib/types/result";

// Improved types for API response
interface ApiQuestionResult {
  _id?: string;
  QID?: string;
  id?: string;
  question?: string;
  Question?: string;
  correct?: string;
  correctAnswer?: string;
  inCorrectAnswer?: string;
  answers?: Answer[] | Record<string, string>;
}

interface ApiExamResult {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: ApiQuestionResult[];
  correctQuestions: ApiQuestionResult[];
}

// Schema
const answerSchema = z.object({
  answers: z.record(z.string(), z.string().min(1, "Please choose answer")),
});

type AnswerValues = z.infer<typeof answerSchema>;
type Props = { params: { id: string } };

export default function ExamPage({ params }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(false);
  const [data, setData] = useState<ExamResultResponse | undefined>(undefined);

  // Form
  const form = useForm<AnswerValues>({
    resolver: zodResolver(answerSchema),
    defaultValues: { answers: {} },
  });
  const { errors } = form.formState;

  // Utility functions
  const getQuestionId = (q: ApiQuestionResult): string => {
    return q._id || q.QID || q.id || "";
  };

  const getQuestionText = (q: ApiQuestionResult): string => {
    return q.question || q.Question || "Question not available";
  };

  const getCorrectAnswer = (q: ApiQuestionResult): string => {
    return q.correct || q.correctAnswer || "Not available";
  };

  const convertAnswersToRecord = (
    answers: Answer[] | Record<string, string> | undefined
  ): Record<string, string> => {
    if (!answers) return {};

    if (Array.isArray(answers)) {
      const record: Record<string, string> = {};
      answers.forEach((answer) => {
        record[answer.key] = answer.answer;
      });
      return record;
    }

    return answers;
  };

  const findOriginalQuestion = (questionId: string): Question | undefined => {
    return questions.find((q) => q._id === questionId);
  };

  const transformApiResult = (apiResult: ApiExamResult): ExamResultResponse => {
    return {
      message: apiResult.message,
      correct: apiResult.correct,
      wrong: apiResult.wrong,
      total: apiResult.total,
      WrongQuestions: apiResult.WrongQuestions.map(
        (wrongQ, index): WrongQuestion => {
          const questionId = getQuestionId(wrongQ);
          const originalQuestion = findOriginalQuestion(questionId);

          return {
            QID: questionId || `wrong-${index}`,
            Question: getQuestionText(wrongQ),
            inCorrectAnswer:
              wrongQ.inCorrectAnswer ||
              answers[questionId] ||
              "No answer selected",
            correctAnswer: getCorrectAnswer(wrongQ),
            answers: originalQuestion
              ? convertAnswersToRecord(originalQuestion.answers)
              : {},
          };
        }
      ),
      correctQuestions: apiResult.correctQuestions.map(
        (correctQ, index): CorrectQuestion => {
          const questionId = getQuestionId(correctQ);
          const originalQuestion = findOriginalQuestion(questionId);

          return {
            QID: questionId || `correct-${index}`,
            Question: getQuestionText(correctQ),
            correctAnswer: getCorrectAnswer(correctQ),
            answers: originalQuestion
              ? convertAnswersToRecord(originalQuestion.answers)
              : {},
          };
        }
      ),
    };
  };

  // Submit handler
  const handleSubmitAll = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      answers: Object.entries(answers).map(([questionId, correct]) => ({
        questionId,
        correct,
      })),
      time: totalSeconds - timeLeft,
    };

    try {
      const response = (await submitAnswer(
        payload as unknown as Record<string, FormDataEntryValue>
      )) as ApiExamResult;

      const transformedData = transformApiResult(response);

      setData(transformedData);
      localStorage.removeItem("examEndTime");
      localStorage.removeItem("idExam");
      setResult(true);
    } catch (error) {
      console.error("Error submitting exam:", error);
      setIsSubmitting(false);
    }
  }, [answers, isSubmitting, totalSeconds, timeLeft, questions]);

  // Load questions
  useEffect(() => {
    (async () => {
      try {
        const data: QuestionsApiResponse = await getQuestions({
          params: { id: params.id },
        });
        setQuestions(data?.questions || []);

        const duration = (data?.questions?.[0]?.exam?.duration || 20) * 60;
        setTotalSeconds(duration);

        const savedEndTime = localStorage.getItem("examEndTime");
        const idExam = localStorage.getItem("idExam");

        let endTime: number;
        if (savedEndTime && idExam === params.id) {
          endTime = parseInt(savedEndTime, 10);
        } else {
          endTime = Date.now() + duration * 1000;
          localStorage.setItem("examEndTime", String(endTime));
          localStorage.setItem("idExam", params.id);
        }

        const remaining = Math.max(
          0,
          Math.floor((endTime - Date.now()) / 1000)
        );
        setTimeLeft(remaining);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    })();
  }, [params.id]);

  // Timer
  useEffect(() => {
    if (!totalSeconds || timeLeft <= 0) {
      if (timeLeft === 0 && totalSeconds > 0) handleSubmitAll();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitAll();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds, handleSubmitAll, timeLeft]);

  // Navigation handlers
  const handleNext = (values: AnswerValues) => {
    const q = questions[current];
    const currentAnswer = values.answers[q._id];

    setAnswers((prev) => ({ ...prev, [q._id]: currentAnswer }));
    setCurrent((c) => c + 1);

    const nextQuestion = questions[current + 1];
    if (nextQuestion) {
      form.reset({
        answers: { [nextQuestion._id]: answers[nextQuestion._id] || "" },
      });
    }
  };

  const handlePrevious = () => {
    const q = questions[current];
    const currentValues = form.getValues();
    if (currentValues.answers[q._id]) {
      setAnswers((prev) => ({
        ...prev,
        [q._id]: currentValues.answers[q._id],
      }));
    }

    setCurrent((c) => c - 1);
    const prevQuestion = questions[current - 1];
    if (prevQuestion) {
      form.reset({
        answers: { [prevQuestion._id]: answers[prevQuestion._id] || "" },
      });
    }
  };

  useEffect(() => {
    if (questions.length > 0 && questions[current]) {
      const q = questions[current];
      form.reset({ answers: { [q._id]: answers[q._id] || "" } });
    }
  }, [current, questions, answers, form]);

  // Loading
  if (!questions.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">
          Loading Exam Questions...
        </p>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return <p>Question not found</p>;

  return (
    <div className="pt-0 flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="p-4">
        <DynamicBreadcrumb />
      </div>

      {/* Exam Header */}
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between gap-2">
          <div className="border border-blue-600 flex items-center">
            <Link href={"/dashboard/exams"}>
              <ChevronLeft className="mx-2 text-blue-600" />
            </Link>
          </div>
          <div className="flex bg-blue-600 p-4 gap-4 text-white w-full">
            <CircleQuestionMark size={45} />
            <h1 className="text-3xl font-semibold">
              {q.exam?.title || "Questions"}
            </h1>
          </div>
        </div>
      </div>

      {/* Exam Body */}
      {!result ? (
        <div className="p-6 space-y-6 mx-6 bg-white flex-1">
          <Progress
            value={((current + 1) / questions.length) * 100}
            className="bg-blue-50 [&>div]:bg-blue-600"
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                current < questions.length - 1 ? handleNext : handleSubmitAll
              )}
              className="space-y-6 h-full flex flex-col"
            >
              <section className="flex-1">
                <h2 className="text-blue-600 font-semibold text-2xl mb-6">
                  Question {current + 1} of {questions.length}: {q.question}
                </h2>

                <Controller
                  name={`answers.${q._id}`}
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="space-y-3"
                        >
                          {q.answers?.map((ans) => (
                            <Label
                              htmlFor={`${q._id}-${ans.key}`}
                              key={ans.key}
                              className="cursor-pointer"
                            >
                              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                <RadioGroupItem
                                  value={ans.key}
                                  id={`${q._id}-${ans.key}`}
                                  className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600 fill-none"
                                />
                                <span className="text-sm font-medium">
                                  {ans.answer}
                                </span>
                              </div>
                            </Label>
                          ))}
                        </RadioGroup>
                      </FormControl>

                      {errors.answers?.[q._id] && (
                        <Alert
                          variant="destructive"
                          className="text-center mb-4"
                        >
                          <AlertDescription>
                            Please choose the correct answer
                          </AlertDescription>
                        </Alert>
                      )}
                    </FormItem>
                  )}
                />
              </section>

              <div className="flex justify-between items-center pt-6">
                <Button
                  type="button"
                  disabled={current === 0}
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 w-full py-3.5 rounded-none bg-gray-200 text-gray-400 font-medium text-sm hover:bg-gray-300 hover:text-gray-500"
                >
                  <ChevronLeft size={16} /> Previous
                </Button>

                <div className="flex items-center gap-4">
                  <TimerDonut totalSeconds={totalSeconds} timeLeft={timeLeft} />
                </div>

                {current < questions.length - 1 ? (
                  <Button
                    type="submit"
                    className="flex items-center py-3.5 gap-2 px-6 w-full rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
                  >
                    Next <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 w-full py-3.5 rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Exam"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <Result data={data} />
      )}
    </div>
  );
}
