import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <AppSidebar />
        <main>
          <SidebarTrigger className="flex" />
          <div className="h-screen p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
