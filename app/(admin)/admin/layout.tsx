import AdminBreadcrumb from "@/components/admin/categories/AdminBreadcrumb";
import AdminNavbar from "@/components/admin/nav-bar/AdminNavbar";
import AdminSidebar from "@/components/admin/side-bar/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex">
      <div className="hidden md:flex w-52 shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        {" "}
        {/* <- add min-w-0 */}
        <div className="w-full h-12">
          <AdminNavbar />
        </div>
        <div className="min-w-0 flex-1">
          <main>
            <div className="p-2">
              <AdminBreadcrumb />
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
