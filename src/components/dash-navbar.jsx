import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Bell, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from "./ui/theme-toggle";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import notifications from "@/constants/notificationslist";

export function DashNavbar() {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-between px-4 md:px-6">
      <div className="flex relative w-full max-w-md md:max-w-sm">
        <div className="flex w-full max-w-md items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input className="h-8" placeholder="Search..." ref={searchInputRef} />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {notifications.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id}>
                <div className="flex flex-col">
                  <span>{notification.message}</span>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <Mail className="h-4 w-4" />
        </Button>
        {/* Light Mode Switcher */}
        <ThemeToggle />
      </div>
    </div>
  );
}