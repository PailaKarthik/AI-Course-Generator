"use client";
import MarkDown from "@/components/MarkDown";
import RoadMap from "@/components/home/RoadMap";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { jsRoadmap } from "@/lib/sampleRoadmap";
const content = "home Page";

export default function Home() {
    const [roadmap, setRoadmap] = useState({...jsRoadmap});
    const [prompt, setPrompt] = useState("");
    async function handleAsk() {
        let res = await fetch("/api/user_prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });
        let data = await res.json();
        console.log(data);
        setRoadmap(data.text);
    }
    return (
        <div className="max-w-2xl p-4 mx-auto">
            <MarkDown content={content}></MarkDown>
            <div className="h-[calc(100vh-156px)] custom-scroll overflow-y-scroll">
                {roadmap.chapters && (
                    <RoadMap roadMap={roadmap}></RoadMap>
                )}
            </div>

            <div className="p-4 rounded-lg  max-w-2xl w-[95%] bottom-0 bg-background border flex my-4">
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
