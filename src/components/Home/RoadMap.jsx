import Link from "next/link";

function Roadmap({ roadMap }) {
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
                    style={{
                        height: `${(roadMap.chapters.length - 1) * 34 * 4}px`,
                    }}
                ></div>

                {roadMap.chapters?.map((chapter, index) => (
                    <div
                        key={index}
                        className="relative flex gap-4 h-32 last:mb-0 mb-2"
                    >
                        <div className="w-6 h-6 shrink-0 rounded-full border bg-zinc-200 dark:bg-zinc-900 border-gray-300 dark:border-zinc-800 flex justify-center items-center"></div>

                        <Link
                            href={""}
                            className="flex flex-col border sm:h-max max-w-xl w-[95%] rounded-md p-2"
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
