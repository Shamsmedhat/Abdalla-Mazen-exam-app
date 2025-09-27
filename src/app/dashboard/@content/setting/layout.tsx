import { ChevronLeft, UserRound } from "lucide-react";
import { DynamicBreadcrumb } from "../../_components/bread-crumb";

export default function SettingLayout({
  children,
  settingside,
  settings,
}: {
  children: React.ReactNode;
  settingside: React.ReactNode;
  settings: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white">
        <div className="p-4">
          <DynamicBreadcrumb />
        </div>
        <div className="flex justify-between gap-2 px-6 py-4 bg-gray-100">
          <div className="border border-blue-600 flex items-center">
            <ChevronLeft className="mx-2 text-blue-600" />
          </div>
          <div className="flex bg-blue-600 p-4 gap-4 text-white w-full">
            <UserRound size={45} />
            <h1 className="text-3xl font-semibold">Account Settings</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 h-[calc(100vh-52px)]">
        {/* Sidebar */}
        <aside className="max-w-96 w-72 mx-6 p-10 bg-white overflow-auto">
          {settingside}
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-100 overflow-auto">
          {settings}
          {children}
        </main>
      </div>
    </div>
  );
}
