
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Pill, Clock, Smile, Frown, Calendar, ChevronRight, User, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const mockData = {
  elderlyName: "Mary Johnson",
  elderlyNickname: "Mom",
  elderlyPhoto: null, // We'll use a fallback for now
  elderlyPhone: "+1234567890", // Added phone number for call button
  lastCall: {
    id: "1", // Added ID for link to call details
    date: "Today, 9:15 AM",
    status: "Done",
    sentiment: "Feeling good today, had breakfast with a neighbor",
    keywords: ["Positive", "Social"],
  },
  nextCall: {
    scheduled: "Today, 5:30 PM"
  },
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

const Dashboard = () => {
  const handleCall = () => {
    window.location.href = `tel:${mockData.elderlyPhone}`;
  };
  
  const displayName = mockData.elderlyNickname || mockData.elderlyName;

  return (
    <div className="py-6 animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-coucou-800">Coucou</h1>
          <p className="text-gray-600">
            Here's how {mockData.elderlyName} is doing
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
            <Badge className={mockData.lastCall.status === "Done" ? "bg-[#e8f5f2] text-[#1F584D]" : "bg-red-100 text-red-800"}>
              {mockData.lastCall.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Link to={`/calls/${mockData.lastCall.id}`} className="block">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border-2 border-[#e8f5f2]">
                  {mockData.elderlyPhoto ? (
                    <AvatarImage src={mockData.elderlyPhoto} alt={mockData.elderlyName} />
                  ) : (
                    <AvatarFallback className="bg-[#e8f5f2]">
                      <User size={24} className="text-[#63BFAC]" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-gray-600">{mockData.lastCall.date}</p>
                  <p className="text-sm text-gray-500">
                    "{mockData.lastCall.sentiment}"
                  </p>
                  <div className="flex gap-1 mt-1">
                    {mockData.lastCall.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Link>
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
                  <p className="font-medium">{mockData.nextCall.scheduled}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link to="/calls/1" className="block">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Today, 9:15 AM</p>
                  <p className="text-sm text-gray-500">Duration: 4m 32s</p>
                </div>
                <Badge className="bg-[#e8f5f2] text-[#1F584D]">Done</Badge>
              </div>
            </Link>
            
            <Link to="/calls/2" className="block">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Yesterday, 9:30 AM</p>
                  <p className="text-sm text-gray-500">Duration: 5m 15s</p>
                </div>
                <Badge className="bg-[#e8f5f2] text-[#1F584D]">Done</Badge>
              </div>
            </Link>
            
            <Link to="/calls/3" className="block">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">May 3, 9:05 AM</p>
                  <p className="text-sm text-gray-500">Duration: 3m 58s</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Missed</Badge>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
