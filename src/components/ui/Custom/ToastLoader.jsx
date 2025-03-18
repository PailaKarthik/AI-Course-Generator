"use client";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

const ToastLoader = () => {
    return (
        <div className="h-screen w-screen top-0 absolute z-20 bg-background/5 backdrop-blur-3xl">
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: 60 }}
                className="p-2 bg-zinc-50 dark:bg-zinc-900 text-sm items-center shadow-md flex gap-2 border rounded-sm border-border z-20 absolute top-5 translate-x-[50%] right-[50%]"
            >
                <Loader className="animate-spin w-4"></Loader>
                Loading
            </motion.div>
        </div>
    );
};

export default function LoaderProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {loading && <ToastLoader />}
            {children}
        </LoaderContext.Provider>
    );
}

export const loader = () => useContext(LoaderContext);
