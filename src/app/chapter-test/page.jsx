"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

const Page = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [overviewBar, setOverviewBar] = useState(true);
    const overviewRef = useRef(null);
    const overview = useRef(null);

    useEffect(() => {
        if (overviewRef.current) {
            overview.current.style.display = overviewBar ? "flex" : "none";
        }
    }, [overviewBar]);

    const handleSelectTopic = (index) => {
        setSelectedIndex(index);
    };

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
                {/* Sidebar Navigation */}
                <div
                    ref={overviewRef}
                    style={{
                        overflow: "hidden",
                        transition: "height 0.9s ease-in-out",
                    }}
                    className="w-full h-fit transition ease-out duration-1000 md:w-96 rounded-3xl border border-[#e5e5e5] shadow-sm p-6 flex flex-col gap-4"
                >
                    <button
                        onClick={() => setOverviewBar(!overviewBar)}
                        className="w-full  bg-black text-white dark:text-black dark:bg-white rounded-full py-4 font-medium"
                    >
                        {overviewBar ? "Hide Overview" : "Show Overview"}
                    </button>
                    <div ref={overview} className="flex flex-col">
                        {topics.map((topic, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectTopic(index)}
                                className={`w-full border rounded-full py-4 my-2 font-medium ${
                                    selectedIndex === index
                                        ? "bg-gray-200 dark:bg-[#373636]"
                                        : "bg-background"
                                }`}
                            >
                                {topic.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-background border rounded-3xl p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">
                            {topics[selectedIndex].title}
                        </h2>
                        <p className="text-lg">
                            {topics[selectedIndex].explanation}
                        </p>
                    </div>

                    <div className="mb-12">
                        <p className="text-lg">
                            YouTube:{" "}
                            <Link
                                href={topics[selectedIndex].video}
                                target="_blank"
                                className="text-blue-600 hover:underline"
                            >
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
                                selectedIndex === 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-200"
                            }`}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={selectedIndex === topics.length - 1}
                            className={`border rounded-full p-3 ${
                                selectedIndex === topics.length - 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-200"
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
