import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Pill, Clock, HeartPulse, Calendar, ChevronRight, User, CheckCircle, AlertCircle, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const mockData = {
  elderlyName: "Mary Johnson",
  elderlyNickname: "Grandma",
  elderlyPhoto: null,
  lastCall: {
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
  mood: {
    value: 75,
    status: "Generally positive"
  },
  appointments: [
    { date: "May 7", title: "Doctor Appointment", time: "10:30 AM" },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleCall = () => {
    window.location.href = `tel:+1234567890`;
  };
  
  const handleViewLastCall = () => {
    navigate("/calls/1");
  };
  
  const heartFillPercentage = mockData.mood.value;
  
  return (
    <div className="py-6 animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-lovable-800">Coucou 🫶🏼</h1>
          <p className="text-gray-600">
            Here's how {mockData.elderlyName} is doing
          </p>
        </div>
        
        <Button 
          className="bg-lovable-400 hover:bg-lovable-500 text-white"
          size="sm"
          onClick={handleCall}
        >
          <Phone className="h-4 w-4 mr-2" /> 
          Call {mockData.elderlyNickname || mockData.elderlyName}
        </Button>
      </div>
      
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Last Check-in</CardTitle>
            <Badge className={mockData.lastCall.status === "Done" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {mockData.lastCall.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between cursor-pointer" onClick={handleViewLastCall}>
            <div className="flex items-start gap-3">
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
                  "{mockData.lastCall.sentiment}"
                </p>
                <div className="flex gap-1 mt-1">
                  {mockData.lastCall.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-lovable-50 border-lovable-200 text-lovable-700">
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
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
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
        
        <Card className="border-lovable-100">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-lovable-500" />
              <CardTitle className="text-sm font-medium">Mood</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-center items-center py-2">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center transform-gpu transition-all duration-300 hover:scale-105">
                  <Heart 
                    className="h-14 w-14 stroke-[1.5px] text-lovable-800/20 dark:text-lovable-50/20 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]" 
                    fill="transparent" 
                  />
                  <div 
                    className="absolute inset-0 flex items-center justify-center overflow-hidden transition-all duration-500"
                    style={{ 
                      clipPath: `inset(${100 - heartFillPercentage}% 0 0 0)` 
                    }}
                  >
                    <Heart 
                      className={`h-14 w-14 stroke-[1.5px] ${heartFillPercentage < 30 ? 'text-red-500/90' : 'text-lovable-500/90'}`}
                      fill={heartFillPercentage < 30 ? 'url(#heartGradientCritical)' : 'url(#heartGradientGood)'}
                      style={{
                        filter: `drop-shadow(0 2px 3px rgba(0,0,0,0.15))`,
                      }}
                    />
                  </div>
                </div>
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <linearGradient id="heartGradientGood" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a4ccd3" />
                      <stop offset="100%" stopColor="#82b5c0" />
                    </linearGradient>
                    <linearGradient id="heartGradientCritical" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff7e7e" />
                      <stop offset="100%" stopColor="#ff5252" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <p className="text-xs text-center text-gray-600 font-light tracking-wide">{mockData.mood.status}</p>
          </CardContent>
        </Card>
        
        <Card className="border-lovable-100">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-lovable-500" />
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
          <div className="mb-4 p-3 bg-lovable-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-lovable-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-lovable-500" />
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
                <Badge className="bg-green-100 text-green-800">Done</Badge>
              </div>
            </Link>
            
            <Link to="/calls/2" className="block">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Yesterday, 9:30 AM</p>
                  <p className="text-sm text-gray-500">Duration: 5m 15s</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Done</Badge>
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
