"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface NavItem {
  label: string
  href: string
}

interface NavbarProps {
  logo?: React.ReactNode
  items?: NavItem[]
  actions?: React.ReactNode
  className?: string
}

export function Navbar({ logo, items = [], actions, className }: NavbarProps) {
  return (
    <header
      className={cn(
        "w-full flex items-center justify-between px-6 py-3 border-b bg-background shadow-xs",
        className
      )}
    >
      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        {logo ? logo : <span className="font-bold text-lg">MyApp</span>}
      </div>

      {/* Center - Nav links (desktop only) */}
      <nav className="hidden md:flex gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right - Actions + Mobile menu */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex">{actions}</div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-6">
              <SheetHeader>
                <SheetTitle>
                  {logo ? logo : <span className="font-bold text-lg">MyApp</span>}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6">{actions}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
