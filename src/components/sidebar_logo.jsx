import React, { useEffect, useState } from 'react';
import OJT_Logo_noText from '@/assets/images/Logo_icon.svg';
import OJT_Logo_withText from '@/assets/images/nav_logo.svg';
import OJT_Logo_withText_Dark from '@/assets/images/nav_logo_dark.svg';
import { useSidebar } from '@/components/ui/sidebar';
import { useTheme } from '@/components/theme-provider';

const Sidebar_Logo = () => {
  const { state } = useSidebar();
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    } else {
      setIsDarkMode(theme === 'dark');
    }
  }, [theme]);

  return (
    <div className="flex items-center justify-center">
      {state === 'expanded' ? (
        isDarkMode ? (
          <img src={OJT_Logo_withText_Dark} alt="OJT Logo with Text Dark" className="p-3 h-fit" />
        ) : (
          <img src={OJT_Logo_withText} alt="OJT Logo with Text" className="p-3 h-fit" />
        )
      ) : (
        <img src={OJT_Logo_noText} alt="OJT Logo" className="h-8" />
      )}
    </div>
  );
};

export default Sidebar_Logo;