import { LayoutDashboard, Users, BookOpen, Settings2, ClipboardEdit } from 'lucide-react';

const TraineeNavLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard/trainee',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Documents',
    url: '/dashboard/trainee/documents',
    icon: Users,
  },
  {
    title: 'Documentation',
    url: '/docs',
    icon: BookOpen,
  },
  {
    title: 'Evaluate',
    url: '/dashboard/trainee/evaluate',
    icon: ClipboardEdit,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings2,
  }
];

export default TraineeNavLinks;