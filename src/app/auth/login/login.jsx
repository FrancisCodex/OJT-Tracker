import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Light_logo from '@/assets/images/OJT_Logo_light.svg';
import bg_auth from '@/assets/images/bg-auth.png';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, LockKeyhole } from "lucide-react";
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { signIn, loading, error, user } = useSupabaseAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginError) {
      toast({
        title: "Error signing in",
        description: loginError.message,
        variant: "destructive",
        duration: 3000,
      });
      console.error("Error signing in:", loginError.message);
    } else if (user) {
      toast({
        title: "Login successful",
        description: "You have successfully logged in.",
        duration: 3000,
      });
      console.log("User signed in:", user);
      // Navigate based on user role
      if (user.user_metadata.role === 'trainee') {
        navigate('/dashboard/trainee');
      } else if (user.user_metadata.role === 'coordinator') {
        navigate('/dashboard/coordinator');
      } else if (user.user_metadata.role === 'supervisor') {
        navigate('/dashboard/supervisor');
      }
    }
  }, [loginError, user, toast, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    setLoginError(error);
  };

  return (
    <div>
      <div className="top-padding w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-10">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="flex flex-col gap-2 text-center items-center">
              <img
                src={Light_logo}
                alt="OJT Logo"
                width={150}
                height={150}
              />
              <h1 className="text-3xl font-bold">Welcome Back!👋</h1>
              <p className="text-balance text-muted-foreground">
                Enter your login details below
              </p>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </form>
            <div className="mt-1 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-primary">
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative p-2">
          <img
            src={bg_auth}
            alt="Authentication Background"
            width="1920"
            height="1080"
            className="h-full w-full rounded-xl object-cover"
          />
          <span className="absolute bottom-4 right-4 bg-gray-200 opacity-75 text-black px-3 py-1 rounded-full text-sm">
            <a href="https://unsplash.com/photos/men-sitting-in-front-of-their-laptop-computer-MChSQHxGZrQ" target="_blank" rel="noopener noreferrer">
              Photo by Unsplash
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;