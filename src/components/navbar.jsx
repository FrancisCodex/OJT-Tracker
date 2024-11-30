import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Phone, Search, Menu } from 'lucide-react';
import OJT_Logo_noText from '@/assets/images/Logo_icon.svg';
import OJT_Logo_withText from '@/assets/images/nav_logo.svg';
import OJT_Logo_withText_Dark from '@/assets/images/nav_logo_dark.svg';
import { useTheme } from '@/components/theme-provider';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Loading } from '@/components/loading';

const Navbar = () => {
  const { theme } = useTheme();
  const { user, loading } = useSupabaseAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      setIsDarkMode(theme === 'dark');
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (theme === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  const logoSrc = isMobile
    ? OJT_Logo_noText
    : isDarkMode
    ? OJT_Logo_withText_Dark
    : OJT_Logo_withText;

  const handleDashboardClick = () => {
    if (user.user_metadata.role === 'trainee') {
      navigate('/dashboard/trainee');
    } else if (user.user_metadata.role === 'coordinator') {
      navigate('/dashboard/coordinator');
    }
  };

  return (
    <header className="sticky top-0 z-[9999] w-full border-b bg-background dark:border-zinc-800 dark:text-white">
      <div className="flex justify-between h-16 items-center w-full px-4 md:px-6">
        <Link to="/" className="flex items-center col-span-1">
          <img src={logoSrc} alt="OnTheJob-App Logo" className="h-8 w-auto" />
          <span className="sr-only">OnTheJob-App</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-1 lg:gap-6 text-sm font-medium md:flex md:justify-center">
          <Link
            to="/"
            className="text-black hover:text-primary dark:text-gray-400 dark:hover:text-gray-50"
          >
            Home
          </Link>
          {/* <Link
            to="/about"
            className="text-black hover:text-primary dark:text-gray-400 dark:hover:text-gray-50"
          >
            About
          </Link> */}
          <Link
            to="https://drive.google.com/file/d/11UCuqrUOtOhPqLXk2LuHPJBoDNbPBFJy/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="text-black hover:text-primary dark:text-gray-400 dark:hover:text-gray-50"
          >
            Documentation
          </Link>
          <Link
            to="/contact"
            className="text-black hover:text-primary dark:text-gray-400 dark:hover:text-gray-50"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center justify-end gap-4 col-span-2 sm:col-span-1">
          {loading ? (
            <div><Loading/></div>
          ) : user ? (
            <Button onClick={handleDashboardClick}>Dashboard</Button>
          ) : (
            <>
              <Button variant='outline' className='bg-accent' onClick={() => navigate('/register')}>Register</Button>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </>
          )}
          <div className='hidden sm:flex'>
            <ThemeToggle />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  About
                </Link>
                <Link
                  to="/services"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  Services
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  Contact
                </Link>
              </div>
              <div className='bottom-0 right-0 absolute p-3'>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;