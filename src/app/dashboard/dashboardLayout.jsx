import React from 'react';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { DashNavbar } from '@/components/dash-navbar';
import CoordinatorNavLinks from "@/constants/coordinatorNavLinks";
import TraineeNavLinks from '@/constants/traineeNavLinks';
import SupervisorNavLinks from '@/constants/supervisorNavLinks';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Loading } from '@/components/loading';

export default function DashboardLayout({ children }) {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return <div><Loading/></div>;
  }

  let navLinks;
  if (user.user_metadata.role === 'coordinator') {
    navLinks = CoordinatorNavLinks;
  } else if (user.user_metadata.role === 'trainee') {
    navLinks = TraineeNavLinks;
  } else if (user.user_metadata.role === 'supervisor') {
    navLinks = SupervisorNavLinks;
  } else {
    return <div>Unauthorized</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar navLinks={navLinks} user={user} />
      <SidebarInset className="overflow-hidden">
        <header className="fixed flex bg-background z-10 dark:bg-background md:static lg:flex lg:top-0 lg:justify-center h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <DashNavbar />
        </header>
        <div className="overflow-y-auto pt-10 md:pt-0 bg-zinc-50 dark:bg-background h-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}