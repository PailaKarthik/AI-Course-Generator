"use client";
import React, { use, useState} from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Sidebar from "../sidebar/page";

// Sample topic data
const topics = [
  {
    title: "What is Python?",
    explanation:
      "Python is a powerful and versatile programming language that is widely used for a variety of applications, from web development and data analysis to artificial intelligence and automation.",
    video: "https://www.youtube.com/watch?v=rfscVS0vtbw",
  },
  {
    title: "Why Learn Python?",
    explanation:
      "Python is beginner-friendly and has a wide range of applications in web development, data science, and artificial intelligence.",
    video: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
  },
  {
    title: "Installing Python and VS Code",
    explanation:
      "To start with Python, you need to install Python and set up an IDE like VS Code for better coding experience.",
    video: "https://www.youtube.com/watch?v=YYXdXT2l-Gg",
  },
  {
    title: "Basic Syntax and Indentation",
    explanation:
      "Python uses indentation to define code blocks, making the code more readable compared to other programming languages.",
    video: "https://www.youtube.com/watch?v=hwW6TnN21Nw",
  },
  {
    title: "Data Types and Variables",
    explanation:
      "Python has several built-in data types such as integers, floats, strings, and booleans.",
    video: "https://www.youtube.com/watch?v=khKv-8q7YmY",
  },
];

const Page = (chapterTitle,subtopic) => {
  const [selectedIndex, setSelectedIndex] = useState(chapterTitle.subtopic);
  console.log(chapterTitle.chapterTitle);
  // useEffect(async() => {
  //   data=fetch("/api/chapter-promt"
  //   ,{
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({chapterTitle.chapterTitle}),
  //   })
  //   .then((response) => response.json())
  // }, [])
  
   

  const handleNext = () => {
    if (selectedIndex < topics.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar/>

        {/* Content Area */}
        <div className="flex-1 bg-background border rounded-3xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{topics[selectedIndex].title}</h2>
            <p className="text-lg">{topics[selectedIndex].explanation}</p>
          </div>

          <div className="mb-12">
            <p className="text-lg">
              YouTube:{" "}
              <Link href={topics[selectedIndex].video} target="_blank" className="text-blue-600 hover:underline">
                Watch Video
              </Link>
            </p>
          </div>

          {/* Next and Previous Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              className={`border rounded-full p-3 ${
                selectedIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={selectedIndex === topics.length - 1}
              className={`border rounded-full p-3 ${
                selectedIndex === topics.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
