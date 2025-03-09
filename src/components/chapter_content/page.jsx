"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Sidebar from "../sidebar/page";
import MarkDown from "../MarkDown";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const Page = ({ chapter, roadmapId }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const subtopicParam = searchParams.get("subtopic");

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [chapterData, setChapterData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setGenerating] = useState(false);
    const [error, setError] = useState(null);
    const [roadmap, setRoadmap] = useState({});

    async function getRoadmap() {
        try {
            
            const response = await fetch(`/api/roadmap/${roadmapId}`);
            if (response.ok) {
                const data = await response.json();
                setRoadmap(data);
                return data;
            }
            console.error("Roadmap not found");
            return null;
        } catch (error) {
            console.error("Error fetching roadmap:", error);
            setError("Failed to fetch roadmap data. Please try again later.");
            return null;
        }
    }

    async function fetchChapter() {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/get-chapter/${roadmapId}/${chapter}`
            );

            if (response.status === 404) {
                const roadmap = await getRoadmap();

                if (!roadmap) {
                    setNotFound(true);
                    setIsLoading(false);
                    return;
                }

                const chapterDetails = roadmap.chapters.find(
                    (ch) => ch.chapterNumber === Number(chapter)
                );

                if (!chapterDetails) {
                    setNotFound(true);
                    setIsLoading(false);
                    return;
                }
                setGenerating(true);

                const chapterResponse = await fetch(`/api/chapter-prompt`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: chapterDetails }),
                });

                if (!chapterResponse.ok) {
                    throw new Error("Failed to generate chapter content");
                }
                setGenerating(false);

                const chapterData = await chapterResponse.json();
                setChapterData(chapterData.text);
                await addChapter(chapterData.text);
            } else if (response.ok) {
                const data = await response.json();
                setChapterData(data.chapter.content);
            } else {
                throw new Error(`Failed to fetch chapter: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching chapter:", error);
            setError("Failed to load chapter content. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    async function addChapter(chapterContent) {
        try {
            const response = await fetch(`/api/get-chapter`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roadmapId,
                    chapter,
                    content: chapterContent,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to save chapter: ${response.status}`);
            }
        } catch (error) {
            console.error("Error adding chapter:", error);
        }
    }

    const updateUrl = (index) => {
        const params = new URLSearchParams(searchParams);
        params.set("subtopic", index.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleNext = () => {
        if (selectedIndex < (chapterData?.subtopics?.length || 0) - 1) {
            const newIndex = selectedIndex + 1;
            setSelectedIndex(newIndex);
            updateUrl(newIndex);
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        if (selectedIndex > 0) {
            const newIndex = selectedIndex - 1;
            setSelectedIndex(newIndex);
            updateUrl(newIndex);
            window.scrollTo(0, 0);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") {
            handleNext();
        } else if (e.key === "ArrowLeft") {
            handlePrev();
        }
    };

    useEffect(() => {
        if (subtopicParam && chapterData && chapterData.subtopics) {
            const parsedIndex = parseInt(subtopicParam, 10);
            if (
                !isNaN(parsedIndex) &&
                parsedIndex >= 0 &&
                parsedIndex < chapterData.subtopics.length
            ) {
                setSelectedIndex(parsedIndex);
            }
        }
    }, [subtopicParam, chapterData]);

    useEffect(() => {
        if (roadmapId && chapter) {
            fetchChapter();
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [roadmapId, chapter]);

    useEffect(() => {
        getRoadmap();
    }, []);

    if (isLoading) {
        return (
            <div>
                <Sidebar roadmap={roadmap} id={roadmapId} />
                <div className="min-h-[calc(100vh-64px)] lg:w-[60vw] lg:ml-96 bg-background p-6 flex flex-col gap-2 items-center justify-center">
                    <Loader2 className="animate-spin"></Loader2>
                    <p className="text-lg text-gray-500">
                        {isGenerating ? "Please wait while we generate your chapter, first visit might take a while." : "Loading your chapter"}
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => fetchChapter()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Chapter Not Found
                    </h2>
                    <p className="mb-6">
                        The chapter you're looking for doesn't exist.
                    </p>
                    <Link
                        href={`/roadmap/${roadmapId}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Return to Roadmap
                    </Link>
                </div>
            </div>
        );
    }

    if (
        !chapterData ||
        !chapterData.subtopics ||
        chapterData.subtopics.length === 0
    ) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <p className="text-lg text-gray-500">
                    No content available for this chapter.
                </p>
            </div>
        );
    }

    const subtopics = chapterData.subtopics || [];
    const currentTopic = subtopics[selectedIndex] || {};

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background ">
            <div className="flex flex-col md:flex-row">
                <Sidebar roadmap={roadmap} id={roadmapId} />
                <div className="flex-1 p-8 lg:ml-96 w-[96vw] lg:w-[60vw] max-sm:p-4 bg-background ">
                    {chapterData.chapterTitle && (
                        <h1 className="text-4xl font-bold mb-4 w-[80vw]">
                            {chapterData.chapterTitle}
                        </h1>
                    )}

                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>
                                Topic {selectedIndex + 1} of {subtopics.length}
                            </span>
                            <span>
                                {Math.round(
                                    ((selectedIndex + 1) / subtopics.length) *
                                        100
                                )}
                                % complete
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                    width: `${
                                        ((selectedIndex + 1) /
                                            subtopics.length) *
                                        100
                                    }%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-4">
                            {currentTopic.title}
                        </h2>
                        <div className="text-lg">
                            {currentTopic.content?.map((item, index) => {
                                switch (item.type) {
                                    case "header1":
                                        return (
                                            <h2
                                                key={index}
                                                className="text-3xl font-bold mt-6 mb-3"
                                            >
                                                {item.content}
                                            </h2>
                                        );
                                    case "header2":
                                        return (
                                            <h2
                                                key={index}
                                                className="text-2xl font-bold mt-6 mb-3"
                                            >
                                                {item.content}
                                            </h2>
                                        );
                                    case "header3":
                                        return (
                                            <h2
                                                key={index}
                                                className="text-xl font-bold mt-6 mb-3"
                                            >
                                                {item.content}
                                            </h2>
                                        );
                                    case "para":
                                        return (
                                            <p
                                                key={index}
                                                className="mb-4 leading-relaxed"
                                            >
                                                {item.content}
                                            </p>
                                        );
                                    case "code":
                                        return (
                                            <MarkDown
                                                key={index}
                                                content={item.content}
                                            ></MarkDown>
                                        );
                                    case "points":
                                        return (
                                            <ul
                                                key={index}
                                                className="list-disc pl-6 mb-4 space-y-2"
                                            >
                                                {Array.isArray(item.content) &&
                                                    item.content.map(
                                                        (point, i) => (
                                                            <li
                                                                key={i}
                                                                className="leading-relaxed"
                                                            >
                                                                <MarkDown
                                                                    content={
                                                                        point
                                                                    }
                                                                />
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    </div>

                    {currentTopic.videoSuggestions &&
                        currentTopic.videoSuggestions.length > 0 && (
                            <div className="mb-12 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">
                                    Additional Resources
                                </h3>
                                <div className="space-y-2">
                                    {currentTopic.videoSuggestions.map(
                                        (video, idx) => (
                                            <p
                                                key={idx}
                                                className="flex items-center"
                                            >
                                                <span className="mr-2">📹</span>
                                                <Link
                                                    href={video}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {video.includes(
                                                        "youtube.com"
                                                    ) ||
                                                    video.includes("youtu.be")
                                                        ? "Watch YouTube tutorial"
                                                        : "View resource"}{" "}
                                                    {idx > 0
                                                        ? `#${idx + 1}`
                                                        : ""}
                                                </Link>
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                    <div className="flex justify-between mt-12 mb-4">
                        <Button
                            variant={"outline"}
                            onClick={handlePrev}
                            disabled={selectedIndex === 0}
                        >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            <span>Previous</span>
                        </Button>

                        <Button
                            onClick={handleNext}
                            variant={"outline"}
                            disabled={selectedIndex >= subtopics.length - 1}
                            className={
                                selectedIndex >= subtopics.length - 1 &&
                                "opacity-50 cursor-not-allowed"
                            }
                        >
                            <span>Next</span>
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
