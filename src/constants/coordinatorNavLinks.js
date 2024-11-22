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
    title: 'Evaluation',
    url: '/dashboard/coordinator/evaluations',
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

export default CoordinatorNavLinks;