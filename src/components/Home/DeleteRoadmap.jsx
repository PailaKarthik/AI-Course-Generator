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

const DeleteRoadmap = ({ id }) => {
    async function deleteRoadmap(id) {
        const response = await fetch(`/api/roadmap/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        response.status === 200
            ? toast.success(data.message)
            : toast.error(data.message);
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="p-2 cursor-pointer hover:text-red-500 transition-colors duration-200">
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
