import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

type AuthMode = "login" | "signup" | "reset" | "confirmation-sent";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, setOnboardingStep } = useAuth();
  
  // Initialize mode based on URL parameter
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState<AuthMode>(initialMode);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Redirect if user is already authenticated
  useEffect(() => {
    console.log('Auth page loaded, auth state:', { isAuthenticated, user });
    
    if (isAuthenticated) {
      // Get the redirect path from location state, or default to dashboard
      const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
      console.log('User is authenticated, redirecting to:', from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Check for email confirmation token
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      if (token_hash && type === 'email') {
        setVerifyingEmail(true);
        
        try {
          console.log("Verifying email with token_hash:", token_hash);
          const { data, error } = await supabase.auth.verifyOtp({ 
            token_hash, 
            type: 'email' 
          });
          
          if (error) throw error;
          
          console.log("Email verification response:", data);
          setVerificationSuccess(true);
          toast({
            title: "Email verified successfully!",
            description: "Continuing with onboarding...",
          });
          
          // Set the onboarding step to continue from basic info
          setOnboardingStep("basic-info");
          
          // Wait a moment to show success before redirecting
          setTimeout(() => {
            navigate("/onboarding");
          }, 1500);
        } catch (error: any) {
          console.error("Email verification error:", error);
          toast({
            title: "Email verification failed",
            description: error.message || "Please try again or contact support",
            variant: "destructive",
          });
        } finally {
          setVerifyingEmail(false);
        }
      }
    };
    
    handleEmailConfirmation();
  }, [searchParams, navigate, setOnboardingStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        console.log('Attempting login with email:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        console.log('Login successful, user data:', data);
        
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        
        // Find the user in the users table to ensure we have a record
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', data.user?.id)
          .single();
          
        if (userError || !userData) {
          console.log('No user record found, creating one');
          // Create a user record if one doesn't exist
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([
              { 
                auth_user_id: data.user?.id,
                email: data.user?.email,
                name: data.user?.user_metadata?.full_name || email.split('@')[0]
              }
            ])
            .select()
            .single();
            
          if (createError) {
            console.error('Error creating user record:', createError);
          } else {
            console.log('Created user record:', newUser);
          }
        } else {
          console.log('Found existing user record:', userData);
        }
        
        navigate("/calls");
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

        console.log('Attempting signup with email:', email);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth`,
          }
        });

        if (error) throw error;
        
        console.log('Signup successful, user data:', data);
        
        // Create a user record right away
        if (data.user) {
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([
              { 
                auth_user_id: data.user.id,
                email: data.user.email,
                name: fullName || email.split('@')[0]
              }
            ])
            .select()
            .single();
            
          if (createError) {
            console.error('Error creating user record:', createError);
          } else {
            console.log('Created user record:', newUser);
          }
        }
        
        setMode("confirmation-sent");
        toast({
          title: "Account created!",
          description: "Please check your email for the verification link.",
        });
      }
      else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        
        if (error) throw error;
        
        toast({
          title: "Reset link sent",
          description: "Check your email for password reset instructions.",
        });
        
        setMode("login");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // If we're verifying email, show a loading screen
  if (verifyingEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#1F584D]">
              Verifying Your Email
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            {verificationSuccess ? (
              <>
                <div className="bg-[#63BFAC] p-3 rounded-full mb-4">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <p className="text-center mb-4">
                  Email verified successfully! Continuing with onboarding...
                </p>
              </>
            ) : (
              <>
                <Loader2 className="h-8 w-8 text-[#63BFAC] animate-spin mb-4" />
                <p className="text-center mb-4">
                  Please wait while we verify your email...
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

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
               mode === "confirmation-sent" ? "Check Your Email" :
               "Reset Password"}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {mode === "login" ? "Sign in to your Coucou account" :
               mode === "signup" ? "Get started with Coucou" :
               mode === "confirmation-sent" ? "We've sent you a verification email" :
               "We'll send you a reset link"}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            {mode === "confirmation-sent" ? (
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="bg-[#e8f5f2] p-4 rounded-full">
                    <Check className="h-8 w-8 text-[#63BFAC]" />
                  </div>
                </div>
                <p>
                  We've sent a verification link to <strong>{email}</strong>. 
                  Please check your inbox and click the link to verify your email address.
                </p>
                <p className="text-sm text-gray-500">
                  After verification, you'll be redirected to continue setting up your account.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setMode("login")}
                  className="mt-4 text-[#1F584D] border-[#63BFAC]"
                >
                  Return to Login
                </Button>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
