import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Phone, Clock, Calendar } from "lucide-react";
import AccountCreationStep from "@/components/onboarding/AccountCreationStep";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const ProfileSettings = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [callStats, setCallStats] = useState({
    totalCalls: 0,
    totalDuration: 0,
    lastCallDate: null
  });
  
  const [formData, setFormData] = useState({
    account: {
      fullName: "",
      email: "",
      phone: "",
      password: "••••••••",
    }
  });

  // Fetch user data and call statistics
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch user profile from the public.users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', user.id)
          .single();
          
        if (userError) {
          throw userError;
        }
        
        setUserData(userData);
        
        // Update form data with real user information
        setFormData({
          account: {
            fullName: user.user_metadata?.full_name || "",
            email: user.email || "",
            phone: userData?.phone_number || "",
            password: "••••••••",
          }
        });
        
        // Fetch call statistics
        const { data: callsData, error: callsError } = await supabase
          .from('conversations')
          .select('created_at, call_duration_secs')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false });
          
        if (callsError) {
          throw callsError;
        }
        
        if (callsData && callsData.length > 0) {
          const totalCalls = callsData.length;
          const totalDuration = callsData.reduce((acc, call) => acc + (call.call_duration_secs || 0), 0);
          const lastCallDate = callsData[0].created_at;
          
          setCallStats({
            totalCalls,
            totalDuration,
            lastCallDate
          });
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error fetching profile",
          description: error.message || "Could not load your profile information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [isAuthenticated, user]);

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleSave = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to update your profile",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Update auth user metadata
      const { error: updateAuthError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.account.fullName,
        }
      });
      
      if (updateAuthError) throw updateAuthError;
      
      // Update user profile in the users table
      if (userData) {
        const { error: updateProfileError } = await supabase
          .from('users')
          .update({
            user_name: formData.account.fullName.split(' ')[0], // First name as username
            phone_number: formData.account.phone
          })
          .eq('id', userData.id);
          
        if (updateProfileError) throw updateProfileError;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: error.message || "There was a problem updating your profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Format a timestamp into a readable date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Unknown date';
    }
  };

  // Format seconds into a readable duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    } else {
      return `${minutes} minutes`;
    }
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <Link to="/settings" className="inline-flex items-center text-lovable-600">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Settings
      </Link>
      
      <div>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Personal Information</h1>
        <p className="text-gray-600">Update your account details and view your call statistics</p>
      </div>
      
      {loading ? (
        <Card className="border-lovable-100">
          <CardHeader className="pb-0"></CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-lovable-100">
            <CardHeader className="pb-0"></CardHeader>
            <CardContent className="pt-6">
              <AccountCreationStep 
                data={formData}
                updateData={updateFormData}
                stepId="account"
              />
              
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-lovable-400 hover:bg-lovable-500 text-white"
                  onClick={handleSave}
                  disabled={loading}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-lovable-100">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Call Statistics</CardTitle>
              <CardDescription>Overview of your call history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between items-center gap-2 px-1">
                <div className="flex flex-col items-center text-center p-3 rounded-lg">
                  <div className="bg-lovable-100 p-2 rounded-full mb-1">
                    <Phone className="h-5 w-5 text-lovable-700" />
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Calls</p>
                  <p className="text-xl font-semibold text-lovable-700">{callStats.totalCalls}</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-3 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mb-1">
                    <Clock className="h-5 w-5 text-blue-700" />
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Talk Time</p>
                  <p className="text-xl font-semibold text-blue-700">
                    {callStats.totalDuration < 60 ? `${callStats.totalDuration}s` : 
                      `${Math.floor(callStats.totalDuration / 60)}m`}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-3 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full mb-1">
                    <Calendar className="h-5 w-5 text-green-700" />
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">Last Call</p>
                  <p className="text-xl font-semibold text-green-700">
                    {callStats.lastCallDate ? 
                      format(new Date(callStats.lastCallDate), 'MMM d')
                      : 'None'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProfileSettings;
