"use client";

import { useState, useTransition } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { quizQuestions, type QuizAnswers, type QuizOption } from "@/lib/mock-data/quiz";
import { getQuizRecommendations } from "@/lib/data/products.data";
import { ProductCard } from "@/components/shared/product-card";
import type { Product } from "@/lib/types/product";

const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

export function ProductQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<Product[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const currentQuestion = quizQuestions[step];
  const totalSteps = quizQuestions.length;
  const isLastStep = step === totalSteps - 1;

  function handleSelect(option: QuizOption) {
    const updatedAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(updatedAnswers);

    if (isLastStep) {
      startTransition(async () => {
        await new Promise((r) => setTimeout(r, 600));
        const recs = await getQuizRecommendations(updatedAnswers);
        setResults(recs);
      });
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleRetake() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  if (results) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-teal" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-teal">
            Your Picks
          </span>
        </div>
        <h3 className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          We found the perfect stationery for you
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Based on your answers, here are our top recommendations.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <button
          type="button"
          onClick={handleRetake}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-teal/80"
        >
          <RotateCcw className="h-4 w-4" />
          Retake Quiz
        </button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-teal border-t-transparent" />
        <p className="font-serif text-lg font-semibold text-ink">
          Finding your matches...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Progress dots */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {quizQuestions.map((_, i) => (
          <div
            key={quizQuestions[i].id}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === step
                ? "w-6 bg-teal"
                : i < step
                  ? "bg-teal/40"
                  : "bg-rule"
            }`}
          />
        ))}
        <span className="ml-3 font-mono text-[11px] text-muted-foreground">
          Step {step + 1} of {totalSteps}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={step}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h3 className="text-center font-serif text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {currentQuestion.question}
          </h3>

          <div className="mt-6 flex flex-col gap-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleSelect(option)}
                className="group w-full rounded-xl border border-rule bg-card px-5 py-4 text-left text-sm font-medium text-ink transition-all duration-200 hover:border-teal hover:bg-teal/5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-teal"
              >
                {option.label}
              </button>
            ))}
          </div>

          {step > 0 && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleBack}
                className="text-xs text-muted-foreground transition-colors hover:text-ink"
              >
                &larr; Back
              </button>
            </div>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
