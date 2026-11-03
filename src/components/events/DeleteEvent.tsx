'use client'
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
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation"; // 👈 redirect এর বদলে useRouter ব্যবহার করা হয়েছে
import { toast } from "../ui/toast";

export function DeleteEvent({ id }: { id: string }) {
  const router = useRouter();

  const handleDeleteEvent = async () => {
    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && (data.deletedCount > 0 || data.success)) {
        toast.add({
          description: 'Delete successfully!',
          type: 'success'
        });
        router.refresh();
        router.push('/allEvents');
      } else {
        toast.add({
          description: data.message || 'Failed to delete from database!',
          type: 'error'
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.add({
        description: 'Server error during deletion.',
        type: 'error'
      });
    }
  };

  return (
    <AlertDialog>
     
      <AlertDialogTrigger >
        <Button className="cursor-pointer" variant="destructive">
          <Trash className="size-4" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-black border border-slate-800 text-white shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400 text-xs">
            This action cannot be undone. This will permanently delete this event from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-700 cursor-pointer bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteEvent} 
            className="bg-red-600  text-white hover:bg-red-700 cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}