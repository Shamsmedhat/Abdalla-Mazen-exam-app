"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, LogOut, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
export function DropdownMenuDemo() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <EllipsisVertical size={18} />
          </Button>
        </DropdownMenuTrigger>
        {/* Dropdown content */}
        <DropdownMenuContent
          className="w-56 bg-white border-none"
          align="start"
        >
          <div className="text-left  ">
            {/* Account settings link */}
            <DropdownMenuItem>
              <Button className="shadow-none  hover:bg-gray-200  rounded-none  w-full justify-start">
                {" "}
                <Link
                  href={"/dashboard/setting"}
                  className="flex items-center gap-2 w-full "
                >
                  <UserRound size={18} />
                  Account
                </Link>{" "}
              </Button>
            </DropdownMenuItem>
          </div>

          {/* Sign out button */}
          <div>
            <DropdownMenuItem>
              <Button
                className="shadow-none  hover:bg-gray-200  rounded-none  w-full justify-start"
                onClick={() => signOut()}
              >
                {" "}
                <LogOut size={18} />
                Sign out
              </Button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
