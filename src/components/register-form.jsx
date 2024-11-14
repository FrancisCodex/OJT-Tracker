import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, LockKeyhole } from 'lucide-react';
import Light_logo from '@/assets/images/OJT_Logo_light.svg';

const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
};

const Register_Form = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordMatch, setPasswordMatch] = useState(true);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordMatch) {
            // Handle form submission
            console.log("Form submitted");
        } else {
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
                        startIcon={null}
                        endIcon={null}
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
                        startIcon={null}
                        endIcon={null}
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
                        startIcon={Mail}
                        endIcon={null}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        startIcon={LockKeyhole}
                        endIcon={null}
                        required
                    />
                    {password && (
                        <>
                            <div className="h-2 w-full bg-gray-200 rounded">
                                <div
                                    className={`h-full ${getPasswordStrengthColor(passwordStrength)} rounded`}
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
                        startIcon={LockKeyhole}
                        endIcon={null}
                        required
                    />
                    {!passwordMatch && (
                        <p className="text-sm text-red-500">Passwords do not match</p>
                    )}
                </div>
                <Button type="submit" className="w-full">
                    Register
                </Button>
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