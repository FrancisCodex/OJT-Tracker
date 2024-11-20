import { LayoutDashboard, Users, BookOpen, Settings2, ClipboardEdit } from 'lucide-react';

const CoordinatorNavLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard/coordinator',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Trainees',
    url: '/dashboard/coordinator/all-trainees',
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
    url: '/dashboard/coordinator/evaluation',
    icon: ClipboardEdit,
  }
];

export default CoordinatorNavLinks;