"use client";
import Page from "@/components/chapter_content/page";
import { useParams } from "next/navigation";

const ChapterPage = () => {
    const params = useParams();

    return (
        <>
            <Page roadmapId={params.roadmapId} chapter={params.chapter} />
        </>
    );
};
export default ChapterPage;
