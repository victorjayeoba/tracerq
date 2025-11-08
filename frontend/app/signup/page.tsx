"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeepfakeScanAnimation from "./animation";
import AuthNav from "@/components/auth-nav";
import { signUpWithEmailAndPassword, signInWithGoogle } from "@/lib/auth";
import { toast } from "sonner";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signUpWithEmailAndPassword(formData.email, formData.password);
      console.log("User created:", result.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    
    try {
      const result = await signInWithGoogle();
      console.log("Google signup successful:", result.user);
      toast.success("Account created successfully with Google!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google signup error:", error);
      toast.error(error.message || "Failed to sign up with Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AuthNav currentPath="signup" />
      </div>
      
      {/* Empty spacer for fixed nav */}
      <div className="h-16"></div>
      
      {/* Left side - Stylized Animation */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-stone-900 to-stone-800 relative overflow-hidden flex items-center justify-center p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-12 left-12 w-20 h-20 border border-accent/20 rounded-lg rotate-12"></div>
        <div className="absolute bottom-12 right-12 w-24 h-24 border border-accent/30 rounded-full"></div>
        
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px"
          }}
        ></div>
        
        {/* Animation container with frame */}
        <div className="relative w-4/5 h-4/5 max-w-md rounded-2xl bg-black/20 backdrop-blur-sm p-4 border border-white/10 shadow-xl">
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-accent"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-accent"></div>
          
          <div className="w-full h-full rounded-xl overflow-hidden">
            <DeepfakeScanAnimation />
          </div>
          
          <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-xs font-mono">
            DEEPFAKE SCAN IN PROGRESS
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center bg-stone-50 px-6 md:px-12 lg:px-20 py-8 md:py-0">
        <div className="mb-6 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <img src="/tracer-logo-enhanced.svg" alt="tЯacer" className="h-7" />
          </Link>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">Join Tracer</h1>
        <p className="text-muted-foreground mb-6">
          Protect your digital identity from deepfakes
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="mt-1 border-stone-200 focus:border-accent focus:ring-accent"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
                className="pr-10 border-stone-200 focus:border-accent focus:ring-accent"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-stone-50 px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full border-stone-200 flex items-center gap-2"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading || isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {isGoogleLoading ? "Signing up..." : "Continue with Google"}
          </Button>
        </form>
        
        <div className="mt-6 text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-accent hover:text-accent/80 font-medium">
              Sign in
            </Link>
          </p>
          
          <p className="mt-4 text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-accent hover:text-accent/80">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-accent hover:text-accent/80">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Grid background like homepage */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: "20px 30px",
            opacity: 0.5
          }}
        />
      </div>
    </div>
  );
}