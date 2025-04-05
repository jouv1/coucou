
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const mockCalls = [
  {
    id: "1",
    date: "Today, 9:15 AM",
    duration: "4m 32s",
    sentiment: "good",
    mood: "Joyful",
  },
  {
    id: "2",
    date: "Yesterday, 9:30 AM",
    duration: "5m 15s",
    sentiment: "good",
    mood: "Calm",
  },
  {
    id: "3",
    date: "May 3, 9:05 AM",
    duration: "3m 58s",
    sentiment: "okay",
    mood: "Tired",
  },
  {
    id: "4",
    date: "May 2, 9:20 AM",
    duration: "6m 12s",
    sentiment: "good",
    mood: "Happy",
  },
  {
    id: "5",
    date: "May 1, 9:10 AM",
    duration: "4m 42s",
    sentiment: "low",
    mood: "Lonely",
  },
  {
    id: "6",
    date: "Apr 30, 9:25 AM",
    duration: "5m 03s",
    sentiment: "okay",
    mood: "Busy",
  },
];

const getSentimentBadgeColor = (sentiment: string) => {
  switch (sentiment) {
    case "good":
      return "bg-green-100 text-green-800";
    case "okay":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Calls = () => {
  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Recent Calls</h1>
        <p className="text-gray-600">
          View transcripts and insights from past conversations
        </p>
      </div>
      
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-lovable-500" />
            <CardTitle className="text-lg font-medium">Call History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCalls.map((call) => (
              <Link key={call.id} to={`/calls/${call.id}`} className="block">
                <div className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{call.date}</p>
                    <p className="text-sm text-gray-500">Duration: {call.duration}</p>
                  </div>
                  <Badge className={getSentimentBadgeColor(call.sentiment)}>
                    {call.mood}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calls;
