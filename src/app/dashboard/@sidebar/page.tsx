import { FolderCode, GraduationCap, User } from "lucide-react";
import Image from "next/image";
import { DropdownMenuDemo } from "../_components/drop-down";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { NavLink } from "@/components/nav-link";

export default async function AppSidebar() {
  // variable
  const session = await getServerSession(authOptions);

  return (
    <>
      <aside className=" bg-blue-50 flex flex-col  text-red-700 h-full  ">
        {/* App logo  */}
        <div
          className="w-48 h-9 bg-gray-500 "
          style={{
            WebkitMaskImage:
              "url('/assets/icons/0b7894f3f9e34690bf0c8b5b2e5d087debd7b25e.png')",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            maskImage:
              "url('/assets/icons/0b7894f3f9e34690bf0c8b5b2e5d087debd7b25e.png')",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
          }}
        />

        {/* Headline */}
        <h1 className="text-blue-600 flex py-2 font-semibold text-xl gap-1 pb-16">
          {" "}
          <FolderCode size={30} /> Exam App
        </h1>

        {/* Navigation links */}
        <nav className="flex-1">
          <ul className="space-y-3">
            <li className="flex">
              <NavLink
                href="/dashboard"
                className=" hover:text-blue-600 flex  text-gray-500 hover:bg-blue-100 px-3 py-2 rounded w-full gap-1"
              >
                <GraduationCap />
                Diplomas
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/dashboard/setting"
                className="  hover:text-blue-600 flex text-gray-500 hover:bg-blue-100 px-3 py-2 rounded w-full gap-1"
              >
                <User />
                Account Settings
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* Footer */}
        <footer className="text-sm text-gray-400 flex gap-2 items-center">
         <div className="relative w-10 h-10">
  <Image
    src="/assets/images/cb9358d489b7d9a2fbcfd109b058718b5287b696.jpg"
    alt="photo of diplomas"
    fill
    style={{ objectFit: "cover" }}
    sizes="40px"
  />
</div>
          <div className="max-h-14">
            {/* User name & email */}
            <h4 className="text-blue-600 font-medium">
              {session?.user?.firstName}
            </h4>
            <span className="text-gray-500">{session?.user?.email}</span>
          </div>
          <DropdownMenuDemo />
        </footer>
      </aside>
    </>
  );
}
