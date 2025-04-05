
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const mockCalls = [
  {
    id: "1",
    date: "Today, 9:15 AM",
    duration: "4m 32s",
    status: "Done",
  },
  {
    id: "2",
    date: "Yesterday, 9:30 AM",
    duration: "5m 15s",
    status: "Done",
  },
  {
    id: "3",
    date: "May 3, 9:05 AM",
    duration: "3m 58s",
    status: "Done",
  },
  {
    id: "4",
    date: "May 2, 9:20 AM",
    duration: "6m 12s",
    status: "Done",
  },
  {
    id: "5",
    date: "May 1, 9:10 AM",
    duration: "4m 42s",
    status: "Missed",
  },
  {
    id: "6",
    date: "Apr 30, 9:25 AM",
    duration: "5m 03s",
    status: "Done",
  },
];

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-800";
    case "Missed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Calls = () => {
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
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-coucou-500 mr-2" />
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
                  <Badge className={getStatusBadgeColor(call.status)}>
                    {call.status}
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
