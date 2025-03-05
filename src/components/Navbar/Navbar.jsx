import { Button } from "../ui/button";
import { auth, signOut } from "@/app/auth";
import Link from "next/link";
import { User } from "lucide-react";

const Navbar = async () => {
    const session = await auth();
    return (
        <div className="p-2 w-full border-b fixed top-0 left-0 bg-background z-50">
            <div className="flex max-w-4xl mx-auto max-lg:mx-5 justify-between">
                <Link href={"/"}>
                    <h1 className="text-xl font-semibold">Yukthi</h1>
                </Link>
                <div>
                    {session ? (
                        <User className="w-5" />
                    ) : (
                        <Link href={"/login"}>
                            <Button size="sm">Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
