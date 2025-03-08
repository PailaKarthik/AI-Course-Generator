"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function Roadmap({ roadMap, id }) {
    const [height, setHeight] = useState(
        (roadMap.chapters.length - 1) * 34 * 4
    );
    const pathName = usePathname()

    useEffect(() => {
        function updateHeight() {
            if (window.innerWidth < 640) {
                setHeight((roadMap.chapters.length - 1) * 44 * 4);
            } else {
                setHeight((roadMap.chapters.length - 1) * 34 * 4);
            }
        }

        updateHeight(); 
        window.addEventListener("resize", updateHeight);
        
        return () => window.removeEventListener("resize", updateHeight);
    }, [roadMap.chapters.length]);

    return (
        <div className="flex flex-col justify-center max-w-3xl">
            <div className="ml-3 mb-3">
                <h1 className="text-2xl font-semibold">
                    {roadMap.courseTitle}
                </h1>
                <p className="text-primary ml-2">{roadMap.courseDescription}</p>
            </div>
            <div className="relative flex flex-col">
                <div
                    className="absolute w-1 top-1 left-2.5 bg-zinc-200 dark:bg-zinc-900"
                    style={{ height: `${height}px` }}
                ></div>

                {roadMap.chapters?.map((chapter, index) => (
                    <div
                        key={index}
                        className="relative flex gap-4 h-32 max-sm:h-44 last:mb-0 sm:mb-2"
                    >
                        <div className="w-6 h-6 shrink-0 rounded-full border bg-zinc-200 dark:bg-zinc-900 border-gray-300 dark:border-zinc-800 flex justify-center items-center"></div>

                        <Link
                            href={`/chapter-test/${id}/${index + 1}`}
                            className="flex flex-col border h-max max-w-xl w-[85%] rounded-md p-4"
                        >
                            <span className="text-secondary-foreground font-semibold">
                                {chapter.chapterNumber} . {chapter.chapterTitle}
                            </span>
                            <span className="text-secondary-foreground">
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
