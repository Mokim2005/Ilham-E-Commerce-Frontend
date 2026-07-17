"use client";

import {
  Menu,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function AdminTopbar() {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-border bg-background px-4">
      <Button
        variant="ghost"
        size="icon"
        className="mr-3 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 items-center justify-between">
        <span className="hidden text-sm font-medium text-ink sm:block">
          Ilham Stationery
        </span>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full outline-hidden focus-visible:ring-2 focus-visible:ring-primary">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  A
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    admin@ilham.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
