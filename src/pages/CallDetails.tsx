import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Heart, MessageSquare, Check, ChevronDown, ChevronUp, Pill } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useConversations } from "@/hooks/useConversations";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const CallDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(true);
  const { fetchConversationById, currentConversation: callData, loading } = useConversations();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const loadConversation = async () => {
      if (!id || !isAuthenticated) return;
      
      const data = await fetchConversationById(id);
      if (!data) {
        toast({
          title: "Call not found",
          description: "The call you're looking for doesn't exist or you don't have access to it.",
          variant: "destructive"
        });
        navigate('/calls');
      }
    };
    
    loadConversation();
  }, [id, fetchConversationById, navigate, isAuthenticated, toast]);
  
  // Toggle transcript visibility
  const toggleTranscript = () => {
    setIsTranscriptExpanded(!isTranscriptExpanded);
  };
  
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
  
  const formatTranscript = (transcript: string | null) => {
    if (!transcript) return [];
    
    return transcript.split('\n').filter(line => line.trim() !== '').map((line, index) => {
      const isBotLine = line.toLowerCase().startsWith('agent:');
      return { text: line, isBot: isBotLine, id: index };
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="py-6 animate-fade-in space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-coucou-800">Call Details</h1>
          <p className="text-gray-600">Please log in to view call details</p>
        </div>
        
        <Card className="border-coucou-100">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">Authentication required</p>
            <Button asChild>
              <Link to="/auth">
                Sign In
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="py-6 animate-fade-in space-y-4">
        <Link to="/calls" className="inline-flex items-center text-coucou-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to calls
        </Link>
        <h1 className="text-2xl font-semibold text-coucou-800 mb-2">Call Details</h1>
        <Card className="border-coucou-100">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // No data state
  if (!callData) {
    return (
      <div className="py-6 animate-fade-in space-y-4">
        <Link to="/calls" className="inline-flex items-center text-coucou-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to calls
        </Link>
        <h1 className="text-2xl font-semibold text-coucou-800 mb-2">Call Details</h1>
        <Card className="border-coucou-100">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">Call not found or details unavailable</p>
            <Button variant="outline" asChild className="mt-4">
              <Link to="/calls">
                View All Calls
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const transcriptLines = formatTranscript(callData.transcript);

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div>
        <Link to="/calls" className="inline-flex items-center text-coucou-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to calls
        </Link>
        <h1 className="text-2xl font-semibold text-coucou-800 mb-1">Call Details</h1>
        <div className="flex items-center gap-2">
          <p className="text-gray-600">{formatCallDate(callData.created_at)}</p>
          <Badge className="bg-green-100 text-green-800">
            Done
          </Badge>
        </div>
      </div>
      
      {/* Call Info Card */}
      <Card className="border-coucou-100">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-coucou-500" />
            <CardTitle className="text-lg font-medium">Call Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{formatCallDuration(callData.call_duration_secs)}</p>
            </div>
            
            <div className="flex flex-col space-y-1">
              <p className="text-sm text-gray-500">Direction</p>
              <p className="font-medium capitalize">{callData.call_direction || 'Unknown'}</p>
            </div>
            
            <div className="flex flex-col space-y-1">
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{callData.phone_number || 'Unknown'}</p>
            </div>
            
            {callData.happiness_level && (
              <div className="flex flex-col space-y-1">
                <p className="text-sm text-gray-500">Mood</p>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-purple-500" />
                  <p className="font-medium">{callData.happiness_level}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Transcript Card */}
      <Card className="border-coucou-100">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-coucou-500" />
              <CardTitle className="text-lg font-medium">Transcript</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTranscript}
              className="flex items-center gap-1"
            >
              {isTranscriptExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span>Show</span>
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {isTranscriptExpanded && (
          <CardContent>
            {transcriptLines.length > 0 ? (
              <div className="space-y-4">
                {transcriptLines.map((line) => (
                  <div 
                    key={line.id} 
                    className={`p-3 rounded-lg ${
                      line.isBot 
                        ? 'bg-gray-100 text-gray-800 mr-12' 
                        : 'bg-blue-50 text-blue-800 ml-12'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">{line.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No transcript available for this call</p>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CallDetails;
