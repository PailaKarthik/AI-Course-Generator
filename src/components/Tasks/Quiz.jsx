"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from "lucide-react";


export default function Quiz({task}) {
    const [selectedOption, setSelectedOption] = useState("");
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);

    const handleOptionSelect = (value) => {
        if (isAnswered) return;
        setSelectedOption(value);
    };

    const checkAnswer = () => {
        const correct = selectedOption === task.answer;
        setIsCorrect(correct);
        setIsAnswered(true);
        if (correct) {
            setScore((prev) => prev + 1);
        }
    };

    const resetQuiz = () => {
        setSelectedOption("");
        setIsAnswered(false);
        setIsCorrect(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 w-[98vw]">
            <Card className="shadow-lg border-2">
                <CardHeader className="rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-semibold">
                            Multiple choice question
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="pb-2">
                    <div className="space-y-6">
                        <h2 className="mb-0 text-lg ">Question</h2>
                        <h3 className="text-lg">{task.question}</h3>
                        <RadioGroup
                            value={selectedOption}
                            className="space-y-3"
                        >
                            {task.options.map((option) => (
                                <div
                                    key={option}
                                    className={`flex items-center space-x-2 rounded-lg border-2 p-4 transition-all duration-200 ${
                                        isAnswered
                                            ? option === task.answer
                                                ? "border-green-500 dark:bg-green-950/30 bg-green-50"
                                                : option === selectedOption &&
                                                  option !== task.answer
                                                ? "border-red-500 dark:bg-red-950/30 bg-red-50"
                                                : "border-gray-200 opacity-70"
                                            : option === selectedOption
                                            ? "border-blue-300 bg-blue-50 dark:bg-blue-950"
                                            : "hover:border-blue-300 hover:bg-blue-50/10 dark:hover:bg-blue-950/20 cursor-pointer"
                                    }`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white dark:bg-zinc-900 shrink-0">
                                        <RadioGroupItem
                                            value={option}
                                            id={option}
                                            disabled={isAnswered}
                                            checked={selectedOption === option}
                                            className="sr-only"
                                        />
                                        {isAnswered &&
                                        option === task.answer ? (
                                            <CheckCircle className="h-6 w-6 text-green-500" />
                                        ) : isAnswered &&
                                          option === selectedOption &&
                                          option !== task.answer ? (
                                            <XCircle className="h-6 w-6 text-red-500" />
                                        ) : (
                                            <span className="text-lg font-medium">
                                                {String.fromCharCode(
                                                    65 +
                                                        task.options.indexOf(
                                                            option
                                                        )
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <Label
                                        htmlFor={option}
                                        className="flex-grow cursor-pointer ml-2 text-lg"
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {isAnswered && (
                        <div className="mt-6 space-y-4 animate-fadeIn">
                            <div
                                className={`p-4 rounded-lg border-l-4 ${
                                    isCorrect
                                        ? "bg-green-50 dark:bg-green-950/30 border-green-500 text-green-700 dark:text-green-400"
                                        : "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400"
                                }`}
                            >
                                <div className="font-bold text-lg mb-1">
                                    {isCorrect ? "Correct!" : "Incorrect!"}
                                </div>
                                <p>{task.explanation}</p>
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between pt-2 pb-6">
                    {!isAnswered ? (
                        <Button
                            onClick={checkAnswer}
                            disabled={!selectedOption}
                            className="w-full py-6 font-semibold"
                        >
                            Check Answer{" "}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <Button
                                variant="outline"
                                onClick={resetQuiz}
                                className="flex items-center justify-center"
                            >
                                <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                            </Button>
                            <Button
                                variant="default"
                                className="flex items-center justify-center"
                            >
                                Next Question{" "}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
