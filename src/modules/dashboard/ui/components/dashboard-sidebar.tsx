"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" alt="Dial.AI" height={36} width={36} />
          <p className="text-2xl font-semibold">Dial.AI</p>
        </Link>
      </SidebarHeader>
      <div>
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {firstSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === item.href && [
                      "bg-slate-50 border-yellow-400/60",
                      "text-slate-900 font-medium",
                      "shadow-sm",
                    ]
                  )}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <div>
          <Separator className="opacity-10 text-[#5D6B68]" />
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {secondSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === item.href && [
                      "bg-slate-50 border-yellow-400/60",
                      "text-slate-900 font-medium",
                      "shadow-sm",
                    ]
                  )}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
