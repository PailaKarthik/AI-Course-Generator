import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function page() {
    return (
        <div className="max-w-2xl flex flex-col gap-2 items-center p-4 mx-auto">
            Generate your own course now!!
            <Button>
                <Link href={'/generate'}>Generate</Link></Button>
        </div>
    );
}
