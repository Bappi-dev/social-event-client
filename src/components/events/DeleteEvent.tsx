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
import { redirect } from "next/navigation";
import { toast } from "../ui/toast";

export function DeleteEvent({ id }: { id: string }) {
  const handleDeleteEvent = async () => {
    const res = await fetch(`http://localhost:5000/events/${id}`, {
      method: "DELETE",
    });
    await res.json();
    toast.add({
      description:'Delete successfully!',
      type: 'success'
    })
    redirect('/allEvents')
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button className={'cursor-pointer'} variant={"destructive"}>
            <Trash /> Delete
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteEvent}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
