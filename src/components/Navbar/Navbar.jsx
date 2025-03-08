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

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [theme, setTheme] = useState("light"); // Default theme: light

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
    <div className="p-2 w-full border-b fixed top-0 left-0 bg-background/45 backdrop-blur-sm z-50">
      <div className="flex w-full justify-between px-3 lg:px-10 items-center">
        {sidebar && (
          <div className="w-[360px] h-screen bg-black text-white fixed top-0 left-0 flex flex-col gap-4 p-4">
            <button
              className="items-center"
              onClick={() => setSidebar(false)}
            >
              <IoClose />
            </button>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/profile">Profile</Link>
            <button onClick={signOutUser}>Logout</button>
          </div>
        )}
        <button onClick={() => setSidebar(true)}>
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
        <div className="flex items-center gap-4">
          <Button
            onClick={toggleTheme}
            variant={"ghost"}
            className={"border-0 "}
          >
            {theme === "light" ? <Moon></Moon> : <Sun></Sun>}
          </Button>
          {session ? (
            <User className="w-5" />
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
