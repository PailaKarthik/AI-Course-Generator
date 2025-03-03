import MarkDown from "@/components/MarkDown";
const content = "sample";

export default function Home() {
    return (
        <div className="">
            <MarkDown content={content}></MarkDown>
        </div>
    );
}
