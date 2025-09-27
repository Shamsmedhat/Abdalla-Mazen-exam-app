import { CircleUserRound, Lock } from "lucide-react";
import React from "react";
import { NavLink } from "@/components/nav-link";
import LogOutButton from "./_components/logOut";

export default async function SideBarSetting() {
  return (
    <>
      <aside className="  flex flex-col  justify-between  h-full ">
        {/* Navigation links */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {/* Profile link */}
            <li className="flex">
              <NavLink
                href="/dashboard/setting/profile"
                className=" hover:text-blue-600 flex active:bg-emerald-700 text-gray-500 hover:bg-blue-100 px-3 py-2 rounded w-full gap-1"
              >
                <CircleUserRound />
                Profile
              </NavLink>
            </li>

            {/* Change password link */}
            <li>
              <NavLink
                href="/dashboard/setting/change-password"
                className="  hover:text-blue-600 flex text-gray-500 hover:bg-blue-100 px-3 py-2 rounded w-full gap-1"
              >
                <Lock />
                Change Password
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Footer with logout button */}
        <footer className="text-sm text-gray-400 flex gap-2 items-center ">
          <LogOutButton />
        </footer>
      </aside>
    </>
  );
}
