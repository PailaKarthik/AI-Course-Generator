"use client";
import MarkDown from "@/components/MarkDown";
import RoadMap from "@/components/home/RoadMap";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
const content = "";

export default function Home() {
    const [roadmap, setRoadmap] = useState({});
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    async function handleAsk() {
        setLoading(true);
        let res = await fetch("/api/user_prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });
        let data = await res.json();
        console.log(data);
        setRoadmap(data.text);
        setLoading(false);
    }
    return (
        <div className="max-w-2xl p-4 mx-auto">
            <MarkDown content={content}></MarkDown>
            <div
                className={cn(
                    "h-[calc(100vh-200px)] relative custom-scroll ",
                    loading ? "overflow-y-hidden" : "overflow-y-scroll"
                )}
            >
                {!roadmap.chapters && !loading && (
                    <div className="flex flex-col gap-2 h-full text-xl items-center justify-center">
                        <p>What do you want to learn</p>
                    </div>
                )}
                {loading && (
                    <div className="w-full h-full flex flex-col gap-2 items-center justify-center absolute z-5 opacity-95 bg-background backdrop-blur-3xl">
                        <Loader2 className="animate-spin"></Loader2>Please wait
                        while we generate your roadmap
                    </div>
                )}

                {roadmap.chapters && <RoadMap roadMap={roadmap}></RoadMap>}
            </div>

            <div className="p-4 rounded-lg max-w-2xl w-[95%] bottom-0 bg-background border flex my-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full outline-none"
                    placeholder="Enter your course"
                />
                <Button onClick={handleAsk}>Ask</Button>
            </div>
        </div>
    );
}
