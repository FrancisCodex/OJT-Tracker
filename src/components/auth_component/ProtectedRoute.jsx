import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Skeleton } from '@/components/ui/skeleton';

const PrivateRoute = ({ component: Component, requiredRole }) => {
  const { user, loading } = useSupabaseAuth();
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0 && user && requiredRole && user.user_metadata.role !== requiredRole) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      if (user.user_metadata.role === 'trainee') {
        navigate('/dashboard/trainee');
      } else if (user.user_metadata.role === 'coordinator') {
        navigate('/dashboard/coordinator');
      } else if (user.user_metadata.role === 'supervisor') {
        navigate('/dashboard/supervisor');
      }
    }
  }, [countdown, user, requiredRole, navigate]);

  if (loading) {
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
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.user_metadata.role !== requiredRole) {
    return (
      <div className="p-6 space-y-6 text-center">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>You will be redirected to your dashboard in {countdown} seconds.</p>
      </div>
    );
  }

  return <Component />;
};

export default PrivateRoute;