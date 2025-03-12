import { Loader2 } from "lucide-react";
import Sidebar from "../sidebar/page";

const ChapterLoading = ({ roadmap, roadmapId, isGenerating }) => {
    return (
        <div>
            <Sidebar roadmap={roadmap} id={roadmapId} />
            <div className="min-h-[calc(100vh-64px)] lg:w-[60vw] lg:ml-96 bg-background p-6 flex flex-col gap-2 items-center justify-center">
                <Loader2 className="animate-spin"></Loader2>
                <p className="text-lg text-center text-gray-500">
                    {isGenerating
                        ? "Please wait while we generate your chapter, first visit might take a while."
                        : "Loading your chapter"}
                </p>
            </div>
        </div>
    );
};

export default ChapterLoading;
