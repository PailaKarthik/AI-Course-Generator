import React from "react";

const ChapterError = ({ fetchChapter, error }) => {
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
};

export default ChapterError;
