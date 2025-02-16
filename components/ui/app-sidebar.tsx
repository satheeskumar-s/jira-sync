"use client";

import { CalendarClock, ListTodo, ListCheck } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./button";
import { useAuth } from "@/app/context/auth";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Check existing issues",
    url: "/dashboard/existing-issues",
    icon: ListCheck,
  },
  {
    title: "Time logs",
    url: "/dashboard/time-logs",
    icon: CalendarClock,
  },
  {
    title: "Open issues",
    url: "/dashboard/open-issues",
    icon: ListTodo,
  },
];

export function AppSidebar() {
  const auth = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="default"
          onClick={auth?.logout}
          className="mt-4 px-4 py-2 rounded"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
