import { LayoutDashboard, Users, BookOpen, Settings2, ClipboardEdit } from 'lucide-react';

const SupervisorNavLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard/supervisor',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Trainees',
    url: '/dashboard/supervisor/all-trainees',
    icon: Users,
  },
  {
    title: 'Evaluation',
    url: '/dashboard/supervisor/evaluate',
    icon: ClipboardEdit,
  },
  {
    title: 'Documentation',
    url: '/dashboard/docs',
    icon: BookOpen,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings2,
  }
];

export default SupervisorNavLinks;