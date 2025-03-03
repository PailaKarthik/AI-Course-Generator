import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import OpenAI from "openai";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const openai = new OpenAI({
    apiKey: process.env.GOOGLE_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
