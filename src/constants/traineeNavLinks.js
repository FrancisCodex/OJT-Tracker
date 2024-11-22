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
    title: 'Evaluate',
    url: '/dashboard/trainee/feedback',
    icon: ClipboardEdit,
  },
  {
    title: 'Documentation',
    url: '/docs',
    icon: BookOpen,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings2,
  }
];

export default TraineeNavLinks;