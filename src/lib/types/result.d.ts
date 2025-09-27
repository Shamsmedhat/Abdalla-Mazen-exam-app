export type Answer= {
  answer: string;
  key: string;
}

export type Exam ={
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export type Question ={
  _id: string;
  question: string;
  answers: Answer[];
  type: string;
  correct: string;
  subject: string | null;
  exam: Exam;
  createdAt: string;
}

export type QuestionsApiResponse ={
  message: string;
  questions: Question[];
}

export type WrongQuestion = {
  QID: string;
  Question: string;
  inCorrectAnswer: string;
  correctAnswer: string;
  answers: Record<string, string>;
};

export type CorrectQuestion = {
  QID: string;
  Question: string;
  correctAnswer: string;
  answers: Record<string, string>;
};

export type ExamResultResponse = {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: WrongQuestion[];
  correctQuestions: CorrectQuestion[];
};