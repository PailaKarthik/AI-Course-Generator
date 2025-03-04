import MarkDown from "@/components/MarkDown";
const content="home Page"

export default function Home() {
    return (
        <div className="max-w-2xl p-4 mx-auto">
            <MarkDown content={content}></MarkDown>
        </div>
    );
}
