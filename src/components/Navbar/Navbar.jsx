"use client";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { CgDetailsMore } from "react-icons/cg";
import { authenti, signOuting } from "./new";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import GoogleTranslate from "../GoogleTranslate";
import { useContext } from "react";
import xpContext from "@/contexts/xp";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
    const [session, setSession] = useState(null);
    const [sidebar, setSidebar] = useState(false);
    const [theme, setTheme] = useState("light"); // Default theme: light
    const { xp, show, changed } = useContext(xpContext);

    // Load saved theme or use default
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.className = savedTheme; // Apply theme globally
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.className = newTheme; // Apply theme globally
    };

    // Fetch session
    useEffect(() => {
        const fetchSession = async () => {
            let session = authenti();
            setSession(session);
        };
        fetchSession();
    }, []);

    // Sign out user
    const signOutUser = async () => {
        signOuting();
        setSession(null);
    };

    return (
        <div className="p-2 w-screen border-b fixed top-0 left-0 bg-background/60 backdrop-blur-md z-50">
            <div className="flex w-full justify-between px-3 lg:px-10 items-center">
                {sidebar && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -360,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -360 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                        className="w-[360px] h-screen bg-background fixed top-0 left-0 flex flex-col gap-4 p-4"
                    >
                        <Button
                            variant={"ghost"}
                            className="items-center w-max"
                            onClick={() => setSidebar(false)}
                        >
                            <IoClose />
                        </Button>
                        <nav>
                            <ul className="flex flex-col ml-4 gap-3 ">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/generate">Generate</Link>
                                </li>
                                <li>
                                    <Link href="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex gap-2 ml-4 items-start">
                            Translate : <GoogleTranslate />
                        </div>

                        <Button
                            variant={"destructive"}
                            className={"w-max ml-4"}
                            onClick={signOutUser}
                        >
                            Logout
                        </Button>
                    </motion.div>
                )}
                <button
                    className="cursor-pointer"
                    onClick={() => setSidebar(true)}
                >
                    <CgDetailsMore />
                </button>
                <div className="flex items-center gap-1">
                    <Link href="/" className="flex gap-1 items-center">
                        <Image
                            src="/YUKTHI_LOGO-removebg-preview.png"
                            alt="logo"
                            className="dark:invert-100"
                            width={48}
                            height={48}
                        />

                        <h2 className="text-xl font-semibold">YUKTHI</h2>
                    </Link>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 flex gap-3 relative">
                        xp{" "}
                        <span className="">
                            {xp}
                            {show && (
                                <AnimatePresence>
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.5,
                                            y: 10,
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                        className="absolute text-green-600 right-0 w-7"
                                    >
                                        <p>+{changed}</p>
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </span>
                    </div>

                    <Button
                        onClick={toggleTheme}
                        variant={"ghost"}
                        className={"border-0 "}
                    >
                        {theme === "light" ? <Moon></Moon> : <Sun></Sun>}
                    </Button>
                    {session ? (
                        <Link href={"/profile"}>
                            <Button variant={"ghost"}>
                                <User className="w-5" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button size="sm">Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
