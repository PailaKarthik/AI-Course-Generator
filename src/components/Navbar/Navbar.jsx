import { Button } from "../ui/button";
import { auth, signOut } from "@/app/auth";
import Link from "next/link";
import { User } from "lucide-react";
import Image from "next/image";
//Temporary Navbar Component
const Navbar = async () => {
    const session = await auth();
    return (
        <div className="p-2 w-full border-b fixed h-12 top-0 left-0 bg-background z-50">
            <div className="flex max-w-4xl mx-auto max-lg:mx-5 justify-between">
                <div className="flex gap-2">
                    <Image
                        src={"/Yukthi2@4x.png"}
                        width={50}
                        height={50}
                        alt={"logo"}
                    />
                    <Link href={"/"}>
                        <h1 className="text-xl font-semibold">Yukthi</h1>
                    </Link>
                </div>

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
