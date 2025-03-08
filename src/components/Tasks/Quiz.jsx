"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, XCircle } from "lucide-react";

const task = {
    type: "multiple-choice",
    question: "What is the period of the function y = cos(4x)?",
    options: ["π/4", "π/2", "π", "2π"],
    answer: "π/2",
    explanation:
        "The period of y = cos(Bx) is 2π/|B|. In this case, B = 4, so the period is 2π/4 = π/2.",
};

export default function Quiz({}) {
    const [selectedOption, setSelectedOption] = useState("");
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleOptionSelect = (value) => {
        if (isAnswered) return;
        setSelectedOption(value);
    };

    const checkAnswer = () => {
        let correct = false;
        correct = selectedOption === task.answer;

        setIsCorrect(correct);
        setIsAnswered(true);
        if (correct) {
            setScore((prev) => prev + 1);
        }
    };

    return (
        <div className="max-w-2xl ">
            <Card className={"p-8"}>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">{task.question}</h3>
                    <RadioGroup value={selectedOption} className="space-y-3">
                        {task.options.map((option) => (
                            <div
                                key={option}
                                className={`flex items-center space-x-2 rounded-md border p-3 ${
                                    isAnswered
                                        ? option === task.answer
                                            ? "border-green-500 bg-green-50"
                                            : option === selectedOption &&
                                              option !== task.answer
                                            ? "border-red-500 bg-red-50"
                                            : ""
                                        : "hover:bg-muted"
                                }`}
                                onClick={() => handleOptionSelect(option)}
                            >
                                <RadioGroupItem
                                    value={option}
                                    id={option}
                                    disabled={isAnswered}
                                    checked={selectedOption === option}
                                />
                                <Label
                                    htmlFor={option}
                                    className="flex-grow cursor-pointer"
                                >
                                    {option}
                                </Label>
                                {isAnswered && option === task.answer && (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                                {isAnswered &&
                                    option === selectedOption &&
                                    option !== task.answer && (
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {isAnswered && (
                    <div
                        className={`p-4 rounded-md ${
                            isCorrect
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                        }`}
                    >
                        {isCorrect ? "Correct!" : "Incorrect!"}
                    </div>
                )}
                <CardFooter className="flex justify-between">
                    {!isAnswered && (
                        <Button
                            onClick={checkAnswer}
                            disabled={
                                task.type === "multiple-choice" &&
                                !selectedOption
                            }
                            className="w-full"
                        >
                            Check Answer
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
