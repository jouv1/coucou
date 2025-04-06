
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup" | "reset";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        
        navigate("/dashboard");
      } 
      else if (mode === "signup") {
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email for the verification link.",
        });
        
        // Navigate to dashboard (in a real app, we might want to wait for email verification)
        navigate("/dashboard");
      }
      else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        
        toast({
          title: "Reset link sent",
          description: "Check your email for password reset instructions.",
        });
        
        setMode("login");
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="flex items-center text-[#1F584D]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Button>

        <Card className="border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-2xl font-bold text-[#1F584D]">
              {mode === "login" ? "Welcome Back" : 
               mode === "signup" ? "Create Account" : 
               "Reset Password"}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {mode === "login" ? "Sign in to your Coucou account" :
               mode === "signup" ? "Get started with Coucou" :
               "We'll send you a reset link"}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={mode === "signup"}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {(mode === "login" || mode === "signup") && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={mode === "signup" ? "Create a secure password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={mode === "login" || mode === "signup"}
                  />
                </div>
              )}
              
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={mode === "signup"}
                  />
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-[#63BFAC] hover:bg-[#4da899] text-white"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {mode === "login" ? "Sign In" : 
                 mode === "signup" ? "Create Account" : 
                 "Send Reset Link"}
              </Button>
              
              <div className="text-center space-y-2 pt-2">
                {mode === "login" && (
                  <>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-[#1F584D]"
                      onClick={() => setMode("reset")}
                    >
                      Forgot password?
                    </Button>
                    <div>
                      <span className="text-gray-500">Don't have an account? </span>
                      <Button 
                        type="button" 
                        variant="link" 
                        className="text-[#1F584D]"
                        onClick={() => setMode("signup")}
                      >
                        Sign up
                      </Button>
                    </div>
                  </>
                )}
                
                {mode === "signup" && (
                  <div>
                    <span className="text-gray-500">Already have an account? </span>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-[#1F584D]"
                      onClick={() => setMode("login")}
                    >
                      Sign in
                    </Button>
                  </div>
                )}
                
                {mode === "reset" && (
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-[#1F584D]"
                    onClick={() => setMode("login")}
                  >
                    Back to sign in
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
