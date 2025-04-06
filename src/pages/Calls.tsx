import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Phone, Calendar, MessageSquare, Clock } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConversations } from "@/hooks/useConversations";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Calls = () => {
  const { conversations: calls, loading } = useConversations();
  const { isAuthenticated } = useAuth();

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
  
  // Function to truncate transcript for preview
  const truncateTranscript = (transcript: string | null, maxLength = 100) => {
    if (!transcript) return 'No transcript available';
    return transcript.length > maxLength
      ? `${transcript.substring(0, maxLength)}...`
      : transcript;
  };

  if (!isAuthenticated) {
    return (
      <div className="py-6 animate-fade-in space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-coucou-800">Recent Calls</h1>
          <p className="text-gray-600">Please log in to view your calls</p>
        </div>
        
        <Card className="border-coucou-100">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Phone className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Authentication required</p>
              <Button asChild>
                <Link to="/auth">
                  Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-6 animate-fade-in space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-coucou-800">Recent Calls</h1>
          <p className="text-gray-600">Loading your call history...</p>
        </div>
        
        <Card className="border-coucou-100">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-coucou-500 mr-2" />
              <CardTitle className="text-lg font-medium">Call History</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col space-y-2 p-4 border rounded-md">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
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
            <div className="space-y-4">
              {calls.map((call) => (
                <div key={call.id} className="border rounded-md p-4 transition-colors hover:bg-gray-50">
                  <Link to={`/calls/${call.id}`} className="block">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadgeColor("Done")}>Done</Badge>
                        <span className="text-sm text-gray-500">{formatCallDate(call.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{formatCallDuration(call.call_duration_secs)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex items-center gap-1 text-coucou-700 mb-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="font-medium">Transcript</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-3">
                        {truncateTranscript(call.transcript)}
                      </p>
                      <div className="mt-2 text-right">
                        <span className="text-coucou-600 text-sm hover:underline">View Details →</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
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
