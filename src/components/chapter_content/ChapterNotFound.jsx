import Link from "next/link";

const ChapterNotFound = ({ roadmapId }) => {
    return (
        <div className="min-h-screen bg-background p-6 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Chapter Not Found</h2>
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
};

export default ChapterNotFound;
