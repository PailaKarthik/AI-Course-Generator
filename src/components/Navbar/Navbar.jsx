"use client";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import { User, LogIn } from "lucide-react";
import { CgDetailsMore } from "react-icons/cg";
import { authenti } from "./new";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import GoogleTranslate from "../GoogleTranslate";
import { useContext } from "react";
import xpContext from "@/contexts/xp";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Logout from "./Logout";

const Navbar = () => {
    const [session, setSession] = useState(null);
    const [sidebar, setSidebar] = useState(false);
    const [theme, setTheme] = useState("light"); // Default theme: light
    const { xp, show, changed } = useContext(xpContext);
    const router = useRouter();
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
            let session = await authenti();
            setSession(session);
        };
        fetchSession();
    }, []);

    // Sign out user
    const signOutUser = async () => {
        await signOut();
        setSession(null);
        router.push("/");
    };

    // Close sidebar on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the clicked target is outside the sidebar and the button that opens it
            const sidebarElement = document.querySelector(".sidebar");
            const buttonElement = document.querySelector("button"); // The button to open sidebar

            if (
                sidebarElement &&
                !sidebarElement.contains(event.target) &&
                !buttonElement.contains(event.target) &&
                event.target.textContent !== "Logout" &&
                event.target.textContent !== "Cancel"
            ) {
                setSidebar(false); // Close sidebar if the click is outside
            }
        };

        // Add event listener when sidebar is open
        if (sidebar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up the event listener when the component unmounts or sidebar is closed
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebar]);

    return (
        <div className="p-2 w-screen border-b fixed top-0 left-0 bg-background/60 backdrop-blur-md z-50">
            <div className="flex w-full px-3 justify-between lg:px-10 items-center">
                {sidebar && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -360,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -360 }}
                        transition={{
                            duration: 0.1,
                            ease: "easeOut",
                        }}
                        className="w-[360px] h-screen bg-background fixed top-0 left-0 flex flex-col justify-between p-4 z-10 sidebar"
                    >
                        <div className="flex flex-col gap-3">
                            <Button
                                variant={"ghost"}
                                className="items-center w-max"
                                onClick={() => setSidebar(false)}
                            >
                                <IoClose />
                            </Button>
                            {session ? (
                                <nav>
                                    <ul className="flex flex-col max-md:text-lg ml-4 gap-3 ">
                                        <li onClick={() => setSidebar(false)}>
                                            <Link
                                                href={
                                                    session ? `/roadmap` : "/"
                                                }
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li onClick={() => setSidebar(false)}>
                                            <Link href="/generate">
                                                Generate
                                            </Link>
                                        </li>
                                        <li onClick={() => setSidebar(false)}>
                                            <Link href="/profile">Profile</Link>
                                        </li>
                                        <li onClick={() => setSidebar(false)}>
                                            <Link href="/contact">Contact</Link>
                                        </li>
                                    </ul>
                                </nav>
                            ) : (
                                <nav>
                                    <ul className="flex flex-col max-md:text-lg ml-4 gap-3 ">
                                        <li
                                            onClick={() => {
                                                setSidebar(false);
                                                document
                                                    .getElementById("features")
                                                    ?.scrollIntoView({
                                                        behavior: "smooth",
                                                    });
                                            }}
                                        >
                                            <Link
                                                href="#features"
                                                scroll={false}
                                            >
                                                Features
                                            </Link>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setSidebar(false);
                                                document
                                                    .getElementById(
                                                        "how-it-works"
                                                    )
                                                    ?.scrollIntoView({
                                                        behavior: "smooth",
                                                    });
                                            }}
                                        >
                                            <Link
                                                href="#how-it-works"
                                                scroll={false}
                                            >
                                                How to use
                                            </Link>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setSidebar(false);
                                                document
                                                    .getElementById("faq")
                                                    ?.scrollIntoView({
                                                        behavior: "smooth",
                                                    });
                                            }}
                                        >
                                            <Link href="#faq" scroll={false}>
                                                FAQs
                                            </Link>
                                        </li>

                                        <li onClick={() => setSidebar(false)}>
                                            <Link href="/contact">Contact</Link>
                                        </li>
                                    </ul>
                                </nav>
                            )}

                            <div className="flex gap-3 max-md:text-lg ml-4 items-start">
                                Translate : <GoogleTranslate />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex items-center">
                                <Button
                                    onClick={toggleTheme}
                                    variant={"ghost"}
                                    className={"border-0 ml-2"}
                                >
                                    {theme === "light" ? <Moon /> : <Sun />}
                                </Button>
                                {session ? (
                                    <div className="flex items-center">
                                        <Link
                                            href={"/profile"}
                                            onClick={() => setSidebar(false)}
                                        >
                                            <Button variant={"ghost"}>
                                                <User className="w-5" />
                                            </Button>
                                        </Link>
                                        <Logout
                                            onConfirm={signOutUser}
                                        ></Logout>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setSidebar(false)}
                                    >
                                        <Button size="sm">
                                            <LogIn></LogIn>Login
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
                <div className="sm:w-[120px] w-[50px]">
                    <button
                        className="cursor-pointer"
                        onClick={(e) => {
                            setSidebar(true);
                            e.stopPropagation();
                        }}
                    >
                        <CgDetailsMore />
                    </button>
                </div>

                <div className="flex items-center gap-1 ">
                    <Link
                        href={session ? `/roadmap` : "/"}
                        className="flex gap-1 items-center"
                    >
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
                <div className="flex items-center w-[152px] justify-center ">
                    {session && (
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
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                            }}
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
                    )}
                    <div className="max-sm:hidden">
                        <Button
                            onClick={toggleTheme}
                            variant={"ghost"}
                            className={"border-0 mr-2"}
                        >
                            {theme === "light" ? <Moon /> : <Sun />}
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
        </div>
    );
};

export default Navbar;
