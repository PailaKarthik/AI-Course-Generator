"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { loader } from "../ui/Custom/ToastLoader";

const DeleteRoadmap = ({ id, onDelete }) => {
    const { showLoader } = loader();
    async function deleteRoadmap(id) {
        showLoader()
        const response = await fetch(`/api/roadmap/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (response.status === 200) {
            toast.success(data.message);
            onDelete();
        } else {
            toast.error(data.message);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="py-2 px-3 cursor-pointer hover:text-red-500 transition-colors duration-200">
                <Trash2 className="w-4" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will permanently delete your roadmap and all
                        of its chapters.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={"cursor-pointer"}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={"cursor-pointer"}
                        onClick={() => deleteRoadmap(id)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteRoadmap;
