import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  onboardingStep: string | null;
  setOnboardingStep: (step: string | null) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  onboardingStep: null,
  setOnboardingStep: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState<string | null>(null);
  
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change event:", event);
        console.log("Auth user in event:", session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Got existing session:", session ? "yes" : "no");
      console.log("Auth user in session:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // If we have a session, also check if we have a corresponding user in the users table
      if (session?.user?.id) {
        supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Error finding user record:", error);
              console.log("Creating new user record for auth user:", session.user.id);
              // Create a user record if none exists
              supabase
                .from('users')
                .insert([
                  { 
                    auth_user_id: session.user.id,
                    email: session.user.email,
                    user_name: session.user.email?.split('@')[0] || "User"
                  }
                ])
                .then(result => {
                  if (result.error) {
                    console.error("Error creating user record:", result.error);
                  } else {
                    console.log("Created user record successfully");
                  }
                });
            } else {
              console.log("Found existing user record:", data);
            }
          });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Compute isAuthenticated based on presence of user and session
  const isAuthenticated = !!user && !!session;

  useEffect(() => {
    console.log("Auth state updated:", { 
      isAuthenticated, 
      userId: user?.id,
      userEmail: user?.email
    });
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      onboardingStep, 
      setOnboardingStep,
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
