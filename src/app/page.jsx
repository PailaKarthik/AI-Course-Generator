import { auth } from "./auth";
import Landing from "@/components/Landing/Landing";
import { redirect } from "next/navigation";
const Page = async () => {
    const session = await auth();
    if (session?.user) {
        redirect("/roadmap");
    }
    return (
        <div className="relative">
            <Landing />
        </div>
    );
};

export default Page;
