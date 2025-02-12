"use client";

import { CalendarClock, ListTodo } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./button";
import { useAuth } from "@/app/context/auth";

// Menu items.
const items = [
  {
    title: "Time logs",
    url: "#",
    icon: CalendarClock,
  },
  {
    title: "Check existing issues",
    url: "#",
    icon: ListTodo,
  },
];

export function AppSidebar() {
  const auth = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
