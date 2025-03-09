import TaskDecider from "@/components/Tasks/TaskDecider";
import { chapter } from "@/lib/sampleChapter";
const Page = () => {
    const tasks = [
        {
            "type": "multiple-choice",
            "question": "Which array method adds one or more elements to the *end* of an array?",
            "options": [
                "shift()",
                "unshift()",
                "push()",
                "pop()"
            ],
            "correctAnswer": "push()",
            "explanation": "`push()` adds elements to the end of an array. `shift()` and `pop()` remove elements, while `unshift()` adds to the beginning."
        },
        {
            "type": "coding",
            "question": "Write a function that takes an array of numbers as input and returns a new array containing only the even numbers from the original array. Use the `filter` method.",
            "answer": "```javascript\nfunction getEvenNumbers(numbers) {\n  return numbers.filter(number => number % 2 === 0);\n}\n\n// Example Usage\nlet numbers = [1, 2, 3, 4, 5, 6];\nlet evenNumbers = getEvenNumbers(numbers);\nconsole.log(evenNumbers); // Output: [2, 4, 6]\n```",
            "input": "[1, 2, 3, 4, 5, 6]",
            "expectedOutput": "[2, 4, 6]"
        },
        {
            "type": "fill-in-the-blank",
            "question": "Objects are collections of ________-value pairs.",
            "acceptableAnswers": [
                "key",
                "properties"
            ],
            "answer": "key",
            "explanation": "Objects store data in key-value pairs, where each key is associated with a specific value. They are also known as properties, therefore, properties-value can also be correct answer."
        }
    ]

    return (
        <div className="w-full mt-10 ">
            <TaskDecider task={tasks[2]}></TaskDecider>
        </div>
    );
};

export default Page;
