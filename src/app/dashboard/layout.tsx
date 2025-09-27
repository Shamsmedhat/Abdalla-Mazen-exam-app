import AppSidebar from "./@sidebar/page";

export default function DashboardLayout({
  content,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="flex max-h-screen">
      <aside className="max-w-96  p-10 bg-blue-50 h-screen  ">
        {/* sidebar */}
        <AppSidebar />
      </aside>
      {/* content */}
      <main className="flex-1  bg-gray-100  h-screen">{content}</main>
    </div>
  );
}
