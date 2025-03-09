"use client";
import { useState } from "react";
import { Calendar, Clock, Flag, GraduationCap, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";

//Select Card component
const SelectionCard = ({ options, selectedValue, onSelect, title }) => {
    return (
        <div className="space-y-2">
            <FormLabel className="text-sm font-medium">{title}</FormLabel>
            <div className="flex flex-wrap justify-center gap-2">
                {options.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => onSelect(option.value)}
                        className={`
              p-4 border rounded-lg w-36 cursor-pointer transition-all 
              ${
                  selectedValue === option.value
                      ? "border-blue-400 bg-blue-500/10 ring-1 ring-blue-400"
                      : "border-gray-200 hover:bg-gray-100"
              }
            `}
                    >
                        <div className="text-center">
                            <div className="font-semibold">{option.label}</div>
                            {option.description && (
                                <div className="text-xs text-muted-foreground mt-1">
                                    {option.description}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();
    const router = useRouter()

    const formSchema = z.object({
        concept: z
            .string()
            .min(2, { message: "Concept must be at least 2 characters long" }),
        knowledgeLevel: z.enum(["beginner", "intermediate", "advanced"], {
            errorMap: () => ({ message: "Please select a knowledge level" }),
        }),
        timeCommitment: z.enum(
            ["1-2-hours", "2-3-hours", "3-4-hours", "4-5-hours"],
            {
                errorMap: () => ({
                    message: "Please select a time commitment",
                }),
            }
        ),
        difficultyLevel: z.enum(["fast", "balanced", "in-depth"], {
            errorMap: () => ({ message: "Please select a difficulty level" }),
        }),
        completionTime: z.enum(
            ["1-week", "2-weeks", "1-month", "2-months", "3-months", "6-months"],
            {
                errorMap: () => ({
                    message: "Please select a completion time",
                }),
            }
        ),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            concept: "",
            knowledgeLevel: "",
            timeCommitment: "1-2-hours",
            difficultyLevel: "",
            completionTime: "1-week",
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        if (!session) {
            toast.error("Please login to generate your course");
            setIsSubmitting(false);
            return;
        }

        const prompt = `
            Generate a detailed, structured learning roadmap for a ${data.knowledgeLevel} 
            to master the concept of ${data.concept}. 
            If this concept is unsuitable for forming a course (analyze it for all age groups), 
            return a JSON response: { "error": 404 }.
            The user can dedicate ${data.timeCommitment} and wants an ${data.difficultyLevel} 
            learning experience, aiming to complete the roadmap in ${data.completionTime}.
        `;
        console.log(prompt);
        

        let res = await fetch("/api/user_prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });

        let responseData = await res.json();

        if (res.status === 404) {
            toast.error(
                "The provided concept is unsuitable for forming a course."
            );
            setIsSubmitting(false);
            return;
        }

        let roadmapResponse = await fetch("/api/roadmap", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roadmap: responseData }),
        });

        if (roadmapResponse.ok) {
            const id = await roadmapResponse.json()
            toast.success("Roadmap generated successfully");
            router.push(`/roadmap/${id.text}`)
        } else {
            toast.error("Failed to generate roadmap");
        }
    };

    const knowledgeLevelOptions = [
        {
            value: "beginner",
            label: "Beginner",
            description: "New to the topic",
        },
        {
            value: "intermediate",
            label: "Intermediate",
            description: "Some prior knowledge",
        },
        {
            value: "advanced",
            label: "Advanced",
            description: "Deep understanding",
        },
    ];

    const difficultyLevelOptions = [
        {
            value: "fast",
            label: "Fast-paced",
            description: "Rapid learning",
        },
        {
            value: "balanced",
            label: "Balanced",
            description: "Steady progress",
        },
        {
            value: "in-depth",
            label: "In-depth",
            description: "Comprehensive study",
        },
    ];

    return (
        <div className="min-h-screen bg-background pt-4">
            {isSubmitting && (
                <div className="w-full h-full flex flex-col gap-2 items-center justify-center absolute z-5 opacity-95 bg-background backdrop-blur-3xl">
                    <Loader2 className="animate-spin"></Loader2>Please wait
                    while we generate your roadmap
                </div>
            )}
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center flex flex-col items-center justify-center">
                    <div className="absolute w-44 h-44 bg-blue-300 rounded-full blur-[100px]"></div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Course Generator
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Create your personalized learning journey
                    </p>
                </div>

                <Card className="p-6 border-0 shadow-none">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="concept"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            Concept to Learn
                                        </FormLabel>
                                        <FormDescription>
                                            What main topic would you like to
                                            learn?
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                className={
                                                    "focus-visible:ring-blue-200 focus-visible:border-blue-400"
                                                }
                                                placeholder="e.g., Trigonometry, Web development"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-6 max-sm:flex-col">
                                <FormField
                                    control={form.control}
                                    name="knowledgeLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <SelectionCard
                                                options={knowledgeLevelOptions}
                                                selectedValue={field.value}
                                                onSelect={field.onChange}
                                                title={
                                                    <>
                                                        <GraduationCap className="h-4 w-4 inline-block mr-2" />
                                                        Current Knowledge Level
                                                    </>
                                                }
                                            />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="timeCommitment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center h-max gap-2">
                                                <Clock className="h-4 w-4" />
                                                Time Commitment
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select time commitment" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1-2-hours">
                                                        1-2 hours per day
                                                    </SelectItem>
                                                    <SelectItem value="2-3-hours">
                                                        2-3 hours per day
                                                    </SelectItem>
                                                    <SelectItem value="3-4-hours">
                                                        3-4 hours per day
                                                    </SelectItem>
                                                    <SelectItem value="4-5-hours">
                                                        4-5 hours per day
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator />

                            <div className="flex gap-6 max-sm:flex-col">
                                <FormField
                                    control={form.control}
                                    name="difficultyLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <SelectionCard
                                                options={difficultyLevelOptions}
                                                selectedValue={field.value}
                                                onSelect={field.onChange}
                                                title={
                                                    <>
                                                        <Flag className="h-4 w-4 inline-block mr-2" />
                                                        Preferred Difficulty
                                                        Level
                                                    </>
                                                }
                                            />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="completionTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Target Completion Time
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select completion time" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1-week">
                                                        1 Week
                                                    </SelectItem>
                                                    <SelectItem value="2-weeks">
                                                        2 Weeks
                                                    </SelectItem>
                                                    <SelectItem value="1-month">
                                                        1 Month
                                                    </SelectItem>
                                                    <SelectItem value="2-months">
                                                        2 Months
                                                    </SelectItem>
                                                    <SelectItem value="3-months">
                                                        3 Months
                                                    </SelectItem>
                                                    <SelectItem value="6-months">
                                                        6 Months
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Generating Roadmap..."
                                    : "Generate My Learning Roadmap"}
                            </Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
