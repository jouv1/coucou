
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Phone, Calendar, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Conversation {
  id: string;
  created_at: string;
  call_duration_secs: number | null;
  happiness_level: string | null;
  transcript: string | null;
}

const Calls = () => {
  const [calls, setCalls] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const fetchCalls = async () => {
      try {
        setLoading(true);
        
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
          return;
        }

        console.log('Found user ID:', userData.id);
        
        // Use the numeric user_id to fetch conversations
        const { data, error } = await supabase
          .from('conversations')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching calls:', error);
          toast({
            title: "Error",
            description: "Could not fetch your calls",
            variant: "destructive"
          });
        } else {
          console.log('Fetched calls:', data);
          setCalls(data || []);
        }
      } catch (error) {
        console.error('Error in data fetching:', error);
        toast({
          title: "Error",
          description: "Something went wrong while loading your calls",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCalls();
    } else {
      setLoading(false);
    }
  }, [user, toast, isAuthenticated]);

  const formatCallDate = (dateString: string) => {
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
  
  const formatCallDuration = (seconds: number | null) => {
    if (!seconds) return 'Unknown duration';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-[#e8f5f2] text-[#1F584D]";
      case "Missed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="py-6 animate-fade-in space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-coucou-800">Recent Calls</h1>
          <p className="text-gray-600">Loading your call history...</p>
        </div>
        
        <Card className="border-coucou-100">
          <CardContent className="pt-6">
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-t-2 border-coucou-500 border-solid rounded-full animate-spin"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="py-6 animate-fade-in space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-coucou-800">Recent Calls</h1>
          <p className="text-gray-600">Please sign in to view your call history</p>
        </div>
        
        <Card className="border-coucou-100">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Info className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">You need to be logged in to access your call history.</p>
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-coucou-800">Recent Calls</h1>
        <p className="text-gray-600">
          View transcripts and insights from past conversations
        </p>
      </div>
      
      <Card className="border-coucou-100">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-coucou-500 mr-2" />
              <CardTitle className="text-lg font-medium">Call History</CardTitle>
            </div>
            {calls.length > 0 && (
              <Badge className="bg-gray-100 text-gray-800">
                {calls.length} Call{calls.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {calls.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calls.map((call) => (
                  <TableRow key={call.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <Link to={`/calls/${call.id}`} className="hover:underline">
                        {formatCallDate(call.created_at)}
                      </Link>
                    </TableCell>
                    <TableCell>{formatCallDuration(call.call_duration_secs)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor("Done")}>Done</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Phone className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">No calls recorded yet</p>
              <p className="text-gray-400 text-sm mb-6">When you make calls to your loved one, they will appear here</p>
              <Button variant="outline" asChild className="mx-auto">
                <Link to="/dashboard">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Upcoming Calls
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calls;
