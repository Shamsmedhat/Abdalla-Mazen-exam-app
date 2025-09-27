"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";
import useDelete from "../_hooks/use-delete";

export function DialogDemo({ onConfirm }: { onConfirm: () => void }) {
  const { isPending } = useDelete();
  return (
    <Dialog>
      {/* Trigger button to open  dialog */}
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-red-50 text-red-600 hover:bg-red-200 hover:text-red-700 rounded-none w-full"
        >
          Delete
        </Button>
      </DialogTrigger>

      {/* Hidden text for accessibility */}
      <DialogContent className="w-full pt-11 sr-only">
        <DialogHeader className="flex justify-center items-center w-full sr-only">
          <DialogTitle>Delete profile</DialogTitle>
          <DialogDescription>
            If you don’t want to delete your profile, you can cancel.
          </DialogDescription>

          {/*  Warning icon  */}
          <div className="size-28 rounded-full bg-red-50 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <TriangleAlert size={50} className="text-red-600" />
            </div>
          </div>
        </DialogHeader>

        {/* Warning message */}
        <div className="grid gap-4">
          <p className="text-center text-red-600 font-medium text-lg">
            Are you sure you want to delete your account?
          </p>
          <p className="text-gray-500 text-sm text-center">
            This action is permanent and cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <DialogFooter className="bg-gray-50 w-full border-t border-gray-200 px-14 py-6 flex flex-wrap justify-center text-center rounded-b-md">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-gray-50 hover:bg-gray-200 rounded-none text-gray-800 flex-1 px-16 py-3.5"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              onConfirm();
            }}
            disabled={isPending}
            type="button"
            className="bg-red-600 rounded-none hover:bg-red-700 text-white text-sm font-medium my-2 lg:my-0 flex-1 px-16 py-3.5"
          >
            {isPending ? "Deleting..." : "Yes, delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
