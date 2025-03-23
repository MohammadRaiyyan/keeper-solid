import { Link } from "@tanstack/solid-router";
import {
  HiOutlineCog6Tooth,
  HiOutlineDocumentCheck,
  HiOutlineHome,
} from "solid-icons/hi";
import { For } from "solid-js";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: HiOutlineHome,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: HiOutlineDocumentCheck,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: HiOutlineCog6Tooth,
  },
];

export function AppSidebar() {
  return (
    <Sidebar class="">
      <SidebarContent>
        <SidebarHeader class=" border-b flex pl-7 py-0">
          <Link to="/" class="flex  items-center h-16">
            {" "}
            <h2 class="text-lg font-semibold">Keeper</h2>
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={items}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      as={Link}
                      to={item.url}
                      activeProps={{
                        class: "bg-accent text-accent-foreground",
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
