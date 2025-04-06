import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Pill, Clock, Smile, Frown, Calendar, ChevronRight, User, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [elderlyData, setElderlyData] = useState({
    elderlyName: "Your Loved One",
    elderlyNickname: "",
    elderlyPhoto: null,
    elderlyPhone: "",
  });
  const [recentCalls, setRecentCalls] = useState([]);
  const [lastCall, setLastCall] = useState(null);
  const [nextCall, setNextCall] = useState({ scheduled: "Not scheduled" });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock data for sections that aren't connected to the database yet
  const mockData = {
    medications: {
      status: "taken",
    },
    sleep: {
      status: "good",
      data: [4, 6, 7, 5, 8, 6, 7],
    },
    appointments: [
      { date: "May 7", title: "Doctor Appointment", time: "10:30 AM" },
    ],
    mood: {
      // Value between 0-100, where 100 is great and 0 is critical
      score: 75,
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        // First get the user record that corresponds to the authenticated user
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('auth_user_id', user.id)
          .single();
          
        if (userError) {
          console.error('Error fetching user:', userError);
          toast({
            title: "Error",
            description: "Could not fetch user information",
            variant: "destructive"
          });
          setLoading(false);
          return null;
        }
        
        // Store the numeric user ID for subsequent queries
        setUserId(userData.id);
        
        return userData.id;
      } catch (error) {
        console.error('Error getting user data:', error);
        return null;
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get the app user_id first
        const appUserId = await fetchUserData();
        if (!appUserId) return;
        
        // Fetch loved one info
        const { data: lovedOnesData, error: lovedOnesError } = await supabase
          .from('loved_ones')
          .select('*')
          .eq('user_id', appUserId)
          .limit(1)
          .single();
        
        if (lovedOnesError && lovedOnesError.code !== 'PGRST116') {
          console.error('Error fetching loved one data:', lovedOnesError);
          toast({
            title: "Error fetching data",
            description: "Could not retrieve your loved one's information",
            variant: "destructive"
          });
        }
        
        if (lovedOnesData) {
          setElderlyData({
            elderlyName: lovedOnesData.name,
            elderlyNickname: lovedOnesData.nickname || null,
            elderlyPhoto: null, // Add photo handling if available in the future
            elderlyPhone: "+1234567890", // Replace with actual phone when available
          });
        }
        
        // Fetch recent conversations (calls)
        const { data: conversationsData, error: conversationsError } = await supabase
          .from('conversations')
          .select('*')
          .eq('user_id', appUserId)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (conversationsError) {
          console.error('Error fetching conversations:', conversationsError);
          toast({
            title: "Error fetching calls",
            description: "Could not retrieve your recent calls",
            variant: "destructive"
          });
        } else if (conversationsData && conversationsData.length > 0) {
          setRecentCalls(conversationsData);
          
          // Set the last call
          const lastCallData = conversationsData[0];
          setLastCall({
            id: lastCallData.id,
            date: formatCallDate(lastCallData.created_at),
            status: "Done", // Assuming completed calls are stored
            sentiment: lastCallData.transcript ? truncateTranscript(lastCallData.transcript) : "No transcript available",
            keywords: getKeywords(lastCallData.happiness_level),
          });
        }
        
      } catch (error) {
        console.error('Error in data fetching:', error);
        toast({
          title: "Error",
          description: "Something went wrong while loading your data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, toast]);
  
  const formatCallDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (date.toDateString() === today.toDateString()) {
        return `Today, ${format(date, 'h:mm a')}`;
      } else if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday, ${format(date, 'h:mm a')}`;
      } else {
        return format(date, 'MMM d, h:mm a');
      }
    } catch (e) {
      console.error('Date formatting error:', e);
      return dateString || 'Unknown date';
    }
  };
  
  const formatCallDuration = (seconds) => {
    if (!seconds) return 'Unknown duration';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const truncateTranscript = (transcript, maxLength = 100) => {
    if (!transcript) return "No transcript available";
    return transcript.length > maxLength 
      ? `${transcript.substring(0, maxLength)}...` 
      : transcript;
  };
  
  const getKeywords = (happiness) => {
    // Return empty array since keywords are no longer displayed
    return [];
  };
  
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-[#e8f5f2] text-[#1F584D]";
      case "Missed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCall = () => {
    // Create an image element to send a GET request
    const img = new Image();
    img.style.display = 'none';
    img.src = 'https://3424-217-9-109-94.ngrok-free.app/initiate_call/+4915735661764';
    document.body.appendChild(img);
    
    // Show toast
    toast({
      title: "Calling Anna",
      description: "The call is being initiated...",
    });
    
    // Remove the image after a short delay
    setTimeout(() => {
      document.body.removeChild(img);
    }, 1000);
  };
  
  const displayName = elderlyData.elderlyNickname || elderlyData.elderlyName;

  if (loading) {
    return (
      <div className="py-6 animate-fade-in space-y-6 text-center">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="py-6 animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-coucou-800">Coucou</h1>
          <p className="text-gray-600">
            Here's how {elderlyData.elderlyName} is doing
          </p>
        </div>
        
        <Button 
          className="bg-[#63BFAC] hover:bg-[#4da899] text-white"
          size="sm"
          onClick={handleCall}
        >
          <Phone className="h-4 w-4 mr-2" /> Call {displayName}
        </Button>
      </div>
      
      {/* Last Call Status */}
      <Card className="border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Last Check-in</CardTitle>
            <Badge className={lastCall ? "bg-[#e8f5f2] text-[#1F584D]" : "bg-yellow-100 text-yellow-800"}>
              {lastCall ? "Done" : "No calls yet"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {lastCall ? (
            <Link to={`/calls/${lastCall.id}`} className="block">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border-2 border-[#e8f5f2]">
                    {elderlyData.elderlyPhoto ? (
                      <AvatarImage src={elderlyData.elderlyPhoto} alt={elderlyData.elderlyName} />
                    ) : (
                      <AvatarFallback className="bg-[#e8f5f2]">
                        <User size={24} className="text-[#63BFAC]" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-gray-600">{lastCall.date}</p>
                    <p className="text-sm text-gray-500">
                      "{lastCall.sentiment}"
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Link>
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-500">No calls recorded yet</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Medication Status */}
        <Card className="border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-[#63BFAC]" />
              <CardTitle className="text-sm font-medium">Medication</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <div className={`rounded-full p-2 ${
                mockData.medications.status === "taken" 
                  ? "bg-[#e8f5f2]" 
                  : "bg-red-100"
              }`}>
                <div className={`rounded-full p-1 ${
                  mockData.medications.status === "taken" 
                    ? "bg-[#63BFAC]" 
                    : "bg-red-500"
                } text-white`}>
                  {mockData.medications.status === "taken" 
                    ? <CheckCircle className="h-5 w-5" /> 
                    : <AlertCircle className="h-5 w-5" />}
                </div>
              </div>
              <p className="mt-2 font-medium text-center">
                {mockData.medications.status === "taken" ? "Taken Today" : "Not Taken"}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Sleep Quality */}
        <Card className="border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#63BFAC]" />
              <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <Badge className={`mb-2 ${
                mockData.sleep.status === "good" 
                  ? "bg-[#e8f5f2] text-[#1F584D]" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {mockData.sleep.status === "good" ? "Good" : "Fair"}
              </Badge>
              <div className="flex items-end justify-center gap-1 w-full h-10">
                {mockData.sleep.data.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-[#63BFAC] rounded-sm w-3" 
                    style={{ height: `${value * 10}%` }}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Mood Analysis */}
        <Card className="border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              {mockData.mood.score > 50 ? 
                <Smile className="h-4 w-4 text-[#63BFAC]" /> : 
                <Frown className="h-4 w-4 text-[#63BFAC]" />
              }
              <CardTitle className="text-sm font-medium">Mood Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-center">
              {mockData.mood.score > 50 ? (
                <div className="bg-[#e8f5f2] rounded-full p-4">
                  <Smile size={40} className="text-[#63BFAC]" />
                </div>
              ) : (
                <div className="bg-red-100 rounded-full p-4">
                  <Frown size={40} className="text-red-500" />
                </div>
              )}
            </div>
            <p className="text-xs text-center text-gray-600">
              {mockData.mood.score > 75 ? "Great" : 
               mockData.mood.score > 50 ? "Good" : 
               mockData.mood.score > 25 ? "Fair" : "Critical"}
            </p>
          </CardContent>
        </Card>
        
        {/* Appointments */}
        <Card className="border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#63BFAC]" />
                <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {mockData.appointments.length > 0 ? (
              <div className="space-y-2">
                {mockData.appointments.map((apt, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{apt.title}</p>
                      <p className="text-xs text-gray-500">{apt.date}, {apt.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  <Link to="/appointments" className="flex items-center w-full justify-center">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 h-16 flex items-center justify-center">
                No upcoming appointments
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Calls with Next Check-in */}
      <Card className="border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Recent Calls</CardTitle>
            <Link to="/calls">
              <Button variant="link" size="sm" className="px-0 text-[#1F584D]">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* Next Check-in */}
          <div className="mb-4 p-3 bg-[#e8f5f2] rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full">
                  <Clock className="h-5 w-5 text-[#63BFAC]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Check-in</p>
                  <p className="font-medium">2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {recentCalls.length > 0 ? (
              recentCalls.map((call) => (
                <Link to={`/calls/${call.id}`} key={call.id} className="block">
                  <div className="flex justify-between items-center border-b pb-3 last:border-b-0">
                    <div>
                      <p className="font-medium">{formatCallDate(call.created_at)}</p>
                      <p className="text-sm text-gray-500">Duration: {formatCallDuration(call.call_duration_secs)}</p>
                    </div>
                    <Badge className={getStatusBadgeColor("Done")}>Done</Badge>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center py-4 text-gray-500">No calls recorded yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
