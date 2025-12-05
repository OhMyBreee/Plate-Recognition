"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { ModeToggle }from "@/components/color-mode"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { useTheme } from 'next-themes';
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export  function Navbar() {
  const isMobile = useIsMobile()
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const logoSrc = resolvedTheme === 'dark' ? '/Logo.png' : '/Logo-dark.png';
  return (
    <div className = "flex justify-between items-center w-full">
    <Button variant="ghost">
        <Link href = "/#hero">
          <Image 
              src={logoSrc}
              alt="Logo"
              width={40}       // adjust size
              height={40}
              className="select-none"
              />
        </Link>
    </Button>
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap text-foreground">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inference</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* <ul className="grid gap-2 grid-cols-[.6fr_.4fr] w-sm px-0"> */}
            <ul className="gap-2 py-2, px-2">
              {/* <li className="row-span-2">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      Inference preview
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Detect license plate border and text 
                    </p>
                  </a>
                </NavigationMenuLink>
              </li> */}
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Login</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Register</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            {/* <NavigationMenuTrigger> */}
                <ModeToggle></ModeToggle>
            {/* </NavigationMenuTrigger> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}