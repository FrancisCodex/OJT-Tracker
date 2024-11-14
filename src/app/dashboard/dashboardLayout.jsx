import React from 'react';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { DashNavbar } from '@/components/dash-navbar';


export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="overflow-hidden"> 
        <header className="fixed flex bg-background z-10 dark:bg-background md:static lg:flex lg:top-0 lg:justify-center h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <DashNavbar/>
        </header>
        <div className="overflow-y-auto pt-10 md:pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}