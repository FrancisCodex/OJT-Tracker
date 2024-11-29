import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardRedirect = () => {
  const { user, loading } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        const role = user.user_metadata.role;
        if (role === 'coordinator') {
          navigate('/dashboard/coordinator/');
        } else if (role === 'trainee') {
          navigate('/dashboard/trainee/');
        } else if (role === 'supervisor') {
          navigate('/dashboard/supervisor/');
        } else {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="bg-accent h-8 w-1/3" />
          <Skeleton className="bg-accent h-4 w-1/2" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="bg-accent h-32 w-full rounded-lg" />
          <Skeleton className="bg-accent h-32 w-full rounded-lg" />
          <Skeleton className="bg-accent h-32 w-full rounded-lg" />
          <Skeleton className="bg-accent h-32 w-full rounded-lg" />
        </div>
      </div>
  );
};

export default DashboardRedirect;