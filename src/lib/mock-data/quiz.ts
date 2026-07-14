// Quiz data — questions, options, and filtering criteria for the product finder quiz.

export interface QuizOption {
  label: string;
  categorySlug?: string;
  priceRange?: { min: number; max: number };
  tag?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export type QuizAnswers = Record<string, QuizOption>;

export const quizQuestions: QuizQuestion[] = [
  {
    id: "purpose",
    question: "What do you mostly need stationery for?",
    options: [
      {
        label: "Student",
        categorySlug: "school-essentials",
        tag: "student",
      },
      {
        label: "Office & Work",
        categorySlug: "office-supplies",
        tag: "office",
      },
      {
        label: "Art & Creativity",
        categorySlug: "art-supplies",
        tag: "art",
      },
    ],
  },
  {
    id: "budget",
    question: "What's your budget range?",
    options: [
      {
        label: "Under ৳300",
        priceRange: { min: 0, max: 300 },
      },
      {
        label: "৳300 – ৳800",
        priceRange: { min: 300, max: 800 },
      },
      {
        label: "৳800+",
        priceRange: { min: 800, max: Infinity },
      },
    ],
  },
  {
    id: "vibe",
    question: "Pick a vibe:",
    options: [
      {
        label: "Minimal & Simple",
        tag: "minimal",
      },
      {
        label: "Colorful & Fun",
        tag: "colorful",
      },
      {
        label: "Premium & Professional",
        tag: "premium",
      },
    ],
  },
];
