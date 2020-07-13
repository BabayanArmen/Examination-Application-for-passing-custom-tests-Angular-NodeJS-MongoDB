export interface Question {
  question: string,
  answers: string [],
  rightAnswer: number,
  category?: string,
  _id: string
};

export interface TestResult {
email: string,
phone: number,
question: string,
answer: string,
rightAnswer: string,
};

export interface SettingsData {
  timerTime: { minutes: number, seconds: number},
  categories: [{ category: string, numOfQuestions: number}],
  _id?: string
};

export interface QuestionsPerCat {
  position: number,
  category: string,
  numOfQuestions: number
  numOfQuestionsInTest: number
};

export interface CheckResult {
  id: number,
  result: boolean,
  rightAnswer: number
}

