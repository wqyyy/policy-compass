import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between bg-primary px-4 shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-primary-foreground" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-primary-foreground">惠企政策大脑</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-1.5 text-primary-foreground hover:bg-primary-foreground/10">
                <Bot className="h-4 w-4" />
                AI 智能助手
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
