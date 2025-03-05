"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Roadmap({ roadMap }) {
    const [activeHeight, setActiveHeight] = useState(0);
    const roadmapRef = useRef(null);
    const chapterRefs = useRef([]); // Ref to store references to each chapter container
    const mouseYRef = useRef(0);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            mouseYRef.current = event.clientY;

            if (!animationFrameRef.current) {
                animationFrameRef.current = requestAnimationFrame(() => {
                    if (roadmapRef.current) {
                        const roadmapRect = roadmapRef.current.getBoundingClientRect();
                        const totalHeight = roadmapRef.current.scrollHeight;
                        const newHeight = Math.min(
                            totalHeight,
                            mouseYRef.current - roadmapRect.top
                        );

                        // Calculate the cumulative height of chapters up to the active one
                        let cumulativeHeight = 0;
                        let activeIndex = 0;
                        for (let i = 0; i < chapterRefs.current.length; i++) {
                            const chapterHeight = chapterRefs.current[i].offsetHeight;
                            if (cumulativeHeight + chapterHeight > newHeight) {
                                break;
                            }
                            cumulativeHeight += chapterHeight;
                            activeIndex = i;
                        }

                        // Set the active height to the cumulative height of the active chapters
                        setActiveHeight(cumulativeHeight);
                    }
                    animationFrameRef.current = null;
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div className="flex justify-center mt-10 max-w-3xl">
            <div ref={roadmapRef} className="relative flex flex-col">
                <div
                    className="absolute w-[2px] top-1 left-3"
                    style={{
                        height: `${activeHeight}px`,
                        background: `linear-gradient(to bottom, #3b82f6, #3b82f6)`,
                    }}
                ></div>

                {roadMap.chapters.map((chapter, index) => (
                    <div
                        key={index}
                        ref={(el) => (chapterRefs.current[index] = el)} // Store reference to each chapter container
                        className="relative flex gap-4 h-32 last:mb-0"
                    >
                        <div className="w-6 h-6 shrink-0 rounded-full border border-gray-300 flex justify-center items-center">
                            <div
                                className={cn(
                                    "w-4 h-4 bg-blue-500 rounded-full transition-transform",
                                    activeHeight >= (chapterRefs.current.slice(0, index).reduce((acc, el) => acc + el.offsetHeight, 0))
                                        ? "scale-100"
                                        : "scale-0"
                                )}
                            ></div>
                        </div>

                        <Link
                            href={""}
                            className="flex flex-col border sm:h-max max-w-xl w-[95%] rounded-md p-2"
                        >
                            <span className="text-gray-700 font-semibold">
                                {chapter.chapterNumber} . {chapter.chapterTitle}
                            </span>
                            <span className="text-gray-700">
                                {chapter.chapterDescription}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Roadmap;