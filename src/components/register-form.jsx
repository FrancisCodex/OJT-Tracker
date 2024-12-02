import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import Light_logo from '@/assets/images/OJT_Logo_light.svg';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from "@/hooks/use-toast";

const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};

const validatePassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  return hasMinLength && hasNumber && hasLowercase && hasUppercase;
};

const Register_Form = () => {
  const { signUp, loading, error, user } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signUpError, setSignUpError] = useState(null);

  useEffect(() => {
    if (signUpError) {
      toast({
        title: "Error signing up",
        description: signUpError.message,
        variant: "destructive",
        duration: 3000,
      });
      console.error("Error signing up:", signUpError.message);
    } else if (user) {
      toast({
        title: "Sign up successful",
        description: "You have successfully signed up.",
        duration: 3000,
      });
      console.log("User signed up:", user);
      navigate('/login'); // Navigate to login page after successful registration
    }
  }, [signUpError, user, toast, navigate]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 8 characters long, contain at least 1 number, 1 lowercase letter, and 1 uppercase letter.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    if (passwordMatch) {
      const { error } = await signUp(email, password, firstName, lastName);
      setSignUpError(error);
    } else {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
        duration: 3000,
      });
      console.log("Passwords do not match");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src={Light_logo}
          alt="OJT Logo"
          width={150}
          height={150}
        />
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-balance text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>

      <div className="grid gap-2">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className='flex items-center'>
            <Label htmlFor="password">Password</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='h-4 ml-2 cursor-pointer' />
                </TooltipTrigger>
                <TooltipContent className="bg-card text-black dark:text-white">
                  <p>Password must contain:</p>
                  <ul className="list-disc pl-4">
                    <li>At least 8 characters</li>
                    <li>At least 1 number</li>
                    <li>At least 1 lowercase letter</li>
                    <li>At least 1 uppercase letter</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {password && (
            <>
              <div className="h-2 w-full bg-gray-200 rounded">
                <div
                  className={`h-full ${getPasswordStrengthColor(passwordStrength)} rounded transition-all duration-500 ease-out`}
                  style={{ width: `${(passwordStrength + 1) * 20}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                Password strength: {["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength]}
              </p>
            </>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {!passwordMatch && (
            <p className="text-sm text-red-500">Passwords do not match</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        {signUpError && <p className="text-sm text-red-500">{signUpError.message}</p>}
      </div>
      <div className="mt-1 text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/login" className="text-primary">
          Sign In
        </a>
      </div>
    </form>
  );
};

export default Register_Form;