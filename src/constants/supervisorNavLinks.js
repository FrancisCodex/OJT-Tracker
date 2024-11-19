import { LayoutDashboard, Users, BookOpen, Settings2, ClipboardEdit } from 'lucide-react';

const SupervisorNavLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard/coordinator',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Trainees',
    url: '/dashboard/supervisor/all-trainees',
    icon: Users,
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
  },
  {
    title: 'Evaluation',
    url: '/dashboard/supervisor/evaluate',
    icon: ClipboardEdit,
  }
];

export default SupervisorNavLinks;