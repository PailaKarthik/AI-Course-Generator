"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQ() {
  return (
    <section
      id="faq"
      className="bg-zinc-50 w-screen min-h-[calc(100vh-64px)] dark:bg-zinc-900/60 py-16 md:py-20"
    >
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about InnoVision's AI-powered
              learning platform.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-12 space-y-4">
          <FAQItem
            question="How does InnoVision generate personalized courses?"
            answer="InnoVision uses advanced AI to analyze your topic of interest and creates a structured, chapter-by-chapter course tailored to your learning needs. Our algorithm considers the complexity of the subject, logical progression of concepts, and includes interactive elements to enhance understanding."
          />

          <FAQItem
            question="What topics can I learn with InnoVision?"
            answer="You can learn virtually any topic with InnoVision. From technical subjects like programming, data science, and engineering to humanities, arts, business skills, and more. If you can describe it, our AI can create a structured learning path for it."
          />

          <FAQItem
            question="How long does it take to generate a course?"
            answer="Course generation typically takes just a few seconds. The AI analyzes your topic, creates a comprehensive roadmap, and then generates detailed chapter content ready for you to start learning immediately."
          />

          <FAQItem
            question="Can I track my learning progress?"
            answer="Yes, InnoVision provides detailed progress tracking. You can monitor which chapters you've completed, view your performance on exercises and assessments, and see statistics about your learning journey."
          />

          <FAQItem
            question="Do I need to create an account to use InnoVision?"
            answer="Yes, you'll need to create a free account to generate and access courses. This allows us to save your progress, provide personalized recommendations, and ensure you can return to your learning materials anytime."
          />

          <FAQItem
            question="How does InnoVision ensure the quality of course content?"
            answer="Our AI is trained on high-quality educational materials and continuously improved based on user feedback. We also implement regular quality checks and updates to ensure accuracy and effectiveness of the generated content."
          />
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-t-lg p-4 text-left font-medium"
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-muted-foreground">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default FAQ;
