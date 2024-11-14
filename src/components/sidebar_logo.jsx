import React from 'react';
import OJT_Logo_noText from '@/assets/images/Logo_icon.svg';
import OJT_Logo_withText from '@/assets/images/logo_ojt.svg';
import OJT_Logo_withText_Dark from '@/assets/images/logo_dark_mode.svg';
import { useSidebar } from '@/components/ui/sidebar';
import { useTheme } from '@/components/theme-provider';

const Sidebar_Logo = () => {
  const { state } = useSidebar();
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      {state === 'expanded' ? (
        theme === 'dark' ? (
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