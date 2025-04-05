
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Pill, Clock, HeartPulse, Calendar, ChevronRight, User } from "lucide-react";
import { Link } from "react-router-dom";

const mockData = {
  elderlyName: "Mary Johnson",
  elderlyPhoto: null, // We'll use a fallback for now
  lastCall: {
    date: "Today, 9:15 AM",
    sentiment: "good",
    mood: "Joyful",
  },
  medications: {
    status: "taken",
    adherence: "93%",
  },
  sleep: {
    status: "good",
    data: [4, 6, 7, 5, 8, 6, 7],
  },
  appointments: [
    { date: "May 7", title: "Doctor Appointment", time: "10:30 AM" },
  ],
};

const Dashboard = () => {
  return (
    <div className="py-6 animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-lovable-800">Bisous</h1>
          <p className="text-gray-600">
            Here's how {mockData.elderlyName} is doing
          </p>
        </div>
        
        <Button 
          className="bg-lovable-400 hover:bg-lovable-500 text-white"
          size="sm"
        >
          <Phone className="h-4 w-4 mr-2" /> Call Now
        </Button>
      </div>
      
      {/* Last Call Status */}
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Last Check-in</CardTitle>
            <Badge className={
              mockData.lastCall.sentiment === "good" 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }>
              {mockData.lastCall.mood}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-lovable-100">
                {mockData.elderlyPhoto ? (
                  <AvatarImage src={mockData.elderlyPhoto} alt={mockData.elderlyName} />
                ) : (
                  <AvatarFallback className="bg-lovable-50">
                    <User size={24} className="text-lovable-300" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="text-gray-600">{mockData.lastCall.date}</p>
                <p className="text-sm text-gray-500">
                  "Feeling good today, had breakfast with a neighbor"
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Medication Status */}
        <Card className="border-lovable-100">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-lovable-500" />
              <CardTitle className="text-sm font-medium">Medication</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <div className={`rounded-full p-2 ${
                mockData.medications.status === "taken" 
                  ? "bg-green-100" 
                  : "bg-red-100"
              }`}>
                <div className={`rounded-full p-1 ${
                  mockData.medications.status === "taken" 
                    ? "bg-green-500" 
                    : "bg-red-500"
                } text-white`}>
                  {mockData.medications.status === "taken" 
                    ? <Check className="h-5 w-5" /> 
                    : <X className="h-5 w-5" />}
                </div>
              </div>
              <p className="mt-2 font-medium text-center">
                {mockData.medications.status === "taken" ? "Taken Today" : "Not Taken"}
              </p>
              <p className="text-xs text-gray-500">
                {mockData.medications.adherence} adherence
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Sleep Quality */}
        <Card className="border-lovable-100">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-lovable-500" />
              <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <Badge className={`mb-2 ${
                mockData.sleep.status === "good" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {mockData.sleep.status === "good" ? "Good" : "Fair"}
              </Badge>
              <div className="flex items-end justify-center gap-1 w-full h-10">
                {mockData.sleep.data.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-lovable-300 rounded-sm w-3" 
                    style={{ height: `${value * 10}%` }}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Sentiment */}
        <Card className="border-lovable-100">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-lovable-500" />
              <CardTitle className="text-sm font-medium">Sentiment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">Critical</span>
              <span className="text-xs">Great</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-red-400 via-yellow-300 to-green-400 h-2.5 rounded-full" 
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-xs text-center text-gray-600">Generally positive</p>
          </CardContent>
        </Card>
        
        {/* Appointments */}
        <Card className="border-lovable-100">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-lovable-500" />
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
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
      
      {/* Recent Calls */}
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Recent Calls</CardTitle>
            <Link to="/calls">
              <Button variant="link" size="sm" className="px-0">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link to="/calls/1" className="block">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Today, 9:15 AM</p>
                  <p className="text-sm text-gray-500">Duration: 4m 32s</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Joyful</Badge>
              </div>
            </Link>
            
            <Link to="/calls/2" className="block">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Yesterday, 9:30 AM</p>
                  <p className="text-sm text-gray-500">Duration: 5m 15s</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Calm</Badge>
              </div>
            </Link>
            
            <Link to="/calls/3" className="block">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">May 3, 9:05 AM</p>
                  <p className="text-sm text-gray-500">Duration: 3m 58s</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Tired</Badge>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

// Helper components
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
