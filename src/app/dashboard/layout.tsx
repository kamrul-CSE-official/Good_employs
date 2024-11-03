import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BarChart, Users, Calendar, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="w-full justify-start">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BarChart className="size-4" />
                  </div>
                  <span className="ml-3 font-semibold">Task Manager</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard" passHref>
                    <SidebarMenuButton asChild>
                      <a className="w-full">
                        <BarChart className="mr-2 h-4 w-4" />
                        Dashboard
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/tasks" passHref>
                    <SidebarMenuButton asChild>
                      <a className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Tasks
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/users" passHref>
                    <SidebarMenuButton asChild>
                      <a className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Users
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
              <Separator className="my-4" />
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard/settings" passHref>
                    <SidebarMenuButton asChild>
                      <a className="w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <main className="flex-1 overflow-auto bg-background">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
            <SidebarTrigger />
          </div>
          <div className="container mx-auto py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
