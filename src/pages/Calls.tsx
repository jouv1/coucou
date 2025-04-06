
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
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
  const { user } = useAuth();
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
          return;
        }

        console.log('Fetched calls:', data);
        setCalls(data || []);
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

    fetchCalls();
  }, [user, toast]);

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
            {!loading && calls.length > 0 && (
              <Badge className="bg-gray-100 text-gray-800">
                {calls.length} Call{calls.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">
              <p className="text-gray-500">Loading calls...</p>
            </div>
          ) : calls.length > 0 ? (
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
            <div className="text-center py-4">
              <p className="text-gray-500">No calls recorded yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calls;
