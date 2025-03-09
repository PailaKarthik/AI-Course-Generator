"use client";
import Page from "@/components/chapter_content/page";
import { useParams } from "next/navigation";

const ChapterPage = () => {
    const params = useParams();

    return (
        <>
            <Page
                chapter={params.chaptername}
                subtopic={params.chapter}
            />
        </>
    );
};
export default ChapterPage;
