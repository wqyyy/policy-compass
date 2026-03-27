import { Home, ClipboardCheck, ChevronDown, ChevronUp } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuGroups = [
  {
    title: "政策兑现",
    icon: Home,
    children: [
      { title: "政策兑现总览", url: "/" },
    ],
  },
  {
    title: "政策评价",
    icon: ClipboardCheck,
    children: [
      { title: "政策评价总览", url: "/policy-evaluation" },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    // Auto-open the group that contains the current route
    const initial: Record<string, boolean> = {};
    menuGroups.forEach((group) => {
      const isActive = group.children.some((child) =>
        child.url === "/" ? location.pathname === "/" : location.pathname.startsWith(child.url)
      );
      initial[group.title] = isActive;
    });
    return initial;
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isChildActive = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  const isGroupActive = (group: typeof menuGroups[0]) => {
    return group.children.some((child) => isChildActive(child.url));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-2">
        <SidebarMenu>
          {menuGroups.map((group) => {
            const active = isGroupActive(group);
            const open = openGroups[group.title];

            return (
              <SidebarMenuItem key={group.title}>
                <button
                  onClick={() => toggleGroup(group.title)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "text-primary font-semibold"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <span>{group.title}</span>
                  {!collapsed && (
                    open ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  )}
                </button>

                {open && !collapsed && (
                  <div className="mx-2 mb-2 border border-border rounded-md bg-card">
                    {group.children.map((child) => (
                      <NavLink
                        key={child.url}
                        to={child.url}
                        end={child.url === "/"}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                        activeClassName="text-primary font-medium bg-accent"
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
