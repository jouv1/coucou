
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Pill, Clock, HeartPulse } from "lucide-react";

const mockCallDetails = {
  "1": {
    date: "Today, 9:15 AM",
    duration: "4m 32s",
    mood: "Joyful",
    summary: "Mary reported having a good night's sleep and enjoyed breakfast with her neighbor.",
    medication: {
      status: "taken",
      details: "Morning medication taken",
    },
    sleep: {
      quality: "good",
      details: "Slept well, 7+ hours",
    },
    sentiment: {
      value: "positive",
      details: "Happy and energetic today",
    },
    transcript: [
      {
        speaker: "Bisous",
        text: "Good morning, Mary! How are you feeling today?",
        time: "0:05",
      },
      {
        speaker: "Mary",
        text: "I'm feeling pretty good today, thank you for asking.",
        time: "0:10",
      },
      {
        speaker: "Bisous",
        text: "That's wonderful to hear! Did you get a good night's sleep?",
        time: "0:15",
      },
      {
        speaker: "Mary",
        text: "Yes, I slept very well. I think I got about 7 hours of sleep.",
        time: "0:20",
      },
      {
        speaker: "Bisous",
        text: "That's great! Have you taken your morning medication yet?",
        time: "0:25",
      },
      {
        speaker: "Mary",
        text: "Yes, I took it right after breakfast. I had breakfast with my neighbor Sarah.",
        time: "0:35",
      },
      {
        speaker: "Bisous",
        text: "How nice! What did you have for breakfast?",
        time: "0:40",
      },
      {
        speaker: "Mary",
        text: "We had some toast with jam and a nice cup of tea. Sarah brought over some homemade muffins too.",
        time: "0:48",
      },
      {
        speaker: "Bisous",
        text: "That sounds delicious! Do you have any plans for the rest of the day?",
        time: "0:55",
      },
      {
        speaker: "Mary",
        text: "I think I'll work on my knitting for a bit. I'm making a scarf for my grandson.",
        time: "1:05",
      },
    ],
  },
  // Additional call records would be here...
};

const CallDetails = () => {
  const { id } = useParams<{ id: string }>();
  const callData = id ? mockCallDetails[id as keyof typeof mockCallDetails] : null;

  if (!callData) {
    return (
      <div className="py-6 text-center">
        <p>Call not found</p>
        <Link to="/calls">
          <Button variant="link">Back to calls</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div className="flex items-center">
        <Link to="/calls" className="mr-3">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-lovable-800 mb-1">Call Transcript</h1>
          <p className="text-gray-600">{callData.date} · {callData.duration}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <Card className="border-lovable-100">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-md font-medium">Call Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600">{callData.summary}</p>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="border border-lovable-100 rounded-md p-3 flex flex-col items-center">
              <div className="flex items-center mb-1 text-green-600">
                <Pill className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Medication</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Taken</Badge>
            </div>
            
            <div className="border border-lovable-100 rounded-md p-3 flex flex-col items-center">
              <div className="flex items-center mb-1 text-blue-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Sleep</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Good</Badge>
            </div>
            
            <div className="border border-lovable-100 rounded-md p-3 flex flex-col items-center">
              <div className="flex items-center mb-1 text-lovable-600">
                <HeartPulse className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Sentiment</span>
              </div>
              <Badge className="bg-green-100 text-green-800">{callData.mood}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card className="border-lovable-100">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-lovable-500" />
            <CardTitle className="text-md font-medium">Full Transcript</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {callData.transcript.map((line, index) => (
              <div key={index} className={`flex gap-3 ${line.speaker === "Bisous" ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                  line.speaker === "Bisous" ? "bg-lovable-400" : "bg-gray-400"
                }`}>
                  {line.speaker === "Bisous" ? "B" : "M"}
                </div>
                <div className={`flex-1 rounded-2xl p-3 ${
                  line.speaker === "Bisous" ? "bg-lovable-50" : "bg-gray-100"
                }`}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium">{line.speaker}</span>
                    <span className="text-xs text-gray-500">{line.time}</span>
                  </div>
                  <p className="text-sm">{line.text}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallDetails;
