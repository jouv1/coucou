
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Heart, MessageSquare, Check, ChevronDown, ChevronUp, Pill } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Mock data for a single call
const mockCallData = {
  id: "1",
  date: "Today, 9:15 AM",
  duration: "4m 32s",
  status: "Done",
  transcript: "AI: Good morning Mary, how are you feeling today?\n\nMary: Oh, hello. I'm feeling pretty good today. Had breakfast with my neighbor Martha this morning.\n\nAI: That sounds nice. Have you taken your morning medication?\n\nMary: Yes, I've taken it already. I need to remember to buy groceries later though.\n\nAI: I'll make a note of that. How did you sleep last night?\n\nMary: Not too bad, woke up once or twice but got back to sleep okay.\n\nAI: That's good to hear. Do you have any plans for today?\n\nMary: Just going to watch my program, and then maybe go for a short walk if the weather's nice. Oh, and I need to schedule that doctor visit.",
  sentiment: "Positive",
  summary: "Mary is feeling good today. She had breakfast with her neighbor Martha and has taken her morning medication. She needs to buy groceries and schedule a doctor's appointment. She slept reasonably well and plans to watch TV and go for a walk.",
  healthMetrics: {
    sleep: {
      status: "Good",
      detail: "Slept through most of the night with only minor interruptions"
    },
    medication: {
      status: "Taken",
      detail: "Morning medication taken as scheduled"
    },
    mood: {
      status: "Positive",
      detail: "Generally upbeat and social"
    }
  }
};

const CallDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(false);
  
  // Toggle transcript visibility
  const toggleTranscript = () => {
    setIsTranscriptExpanded(!isTranscriptExpanded);
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div>
        <Link to="/calls" className="inline-flex items-center text-coucou-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to calls
        </Link>
        <h1 className="text-2xl font-semibold text-coucou-800 mb-1">Call Details</h1>
        <div className="flex items-center gap-2">
          <p className="text-gray-600">{mockCallData.date}</p>
          <Badge className="bg-green-100 text-green-800">
            {mockCallData.status}
          </Badge>
        </div>
      </div>
      
      {/* Call Summary Card */}
      <Card className="border-coucou-100">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-coucou-500" />
            <CardTitle className="text-lg font-medium">Call Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{mockCallData.summary}</p>
          
          {/* Health Metrics */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {/* Sleep Metric */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-sm">Sleep</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">{mockCallData.healthMetrics.sleep.status}</Badge>
              <p className="text-xs text-gray-500 mt-1">{mockCallData.healthMetrics.sleep.detail}</p>
            </div>
            
            {/* Medication Metric */}
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Pill className="h-4 w-4 text-green-500" />
                <span className="font-medium text-sm">Medication</span>
              </div>
              <Badge className="bg-green-100 text-green-800">{mockCallData.healthMetrics.medication.status}</Badge>
              <p className="text-xs text-gray-500 mt-1">{mockCallData.healthMetrics.medication.detail}</p>
            </div>
            
            {/* Mood Metric */}
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-purple-500" />
                <span className="font-medium text-sm">Mood</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">{mockCallData.healthMetrics.mood.status}</Badge>
              <p className="text-xs text-gray-500 mt-1">{mockCallData.healthMetrics.mood.detail}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Call Transcript Card */}
      <Card className="border-coucou-100">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-coucou-500" />
              <CardTitle className="text-lg font-medium">Transcript</CardTitle>
            </div>
            <div className="flex items-center gap-2">
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
              <span className="text-sm text-gray-500">|</span>
              <span className="text-sm text-gray-500">Duration:</span>
              <span className="text-sm font-medium">{mockCallData.duration}</span>
            </div>
          </div>
        </CardHeader>
        {isTranscriptExpanded && (
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm text-gray-600 font-sans">
              {mockCallData.transcript}
            </pre>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CallDetails;
