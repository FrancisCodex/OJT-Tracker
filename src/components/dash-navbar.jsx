import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="container flex h-16 items-center justify-end px-4 md:px-6">
      <div className="relative w-full max-w-md md:max-w-sm">
        <Input
          type="search"
          placeholder="Search..."
          className="h-10 w-full rounded-lg bg-muted pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          startIcon={SearchIcon}
          endIcon={null}
          ref={searchInputRef}
        />
      </div>
    </div>
  );
}