
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Pill, Calendar, Heart, ChevronRight, User, CheckCircle, AlertCircle } from "lucide-react";
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
          <h1 className="text-2xl font-semibold text-white">Coucou 🫶🏼</h1>
          <p className="text-white/80">
            Here's how {mockData.elderlyName} is doing
          </p>
        </div>
        
        <Button 
          className="bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
          size="sm"
          onClick={handleCall}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          Call {displayName}
        </Button>
      </div>
      
      {/* Last Call Status */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Last Check-in</CardTitle>
            <Badge className={mockData.lastCall.status === "Done" ? 
              "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30" : 
              "bg-red-500/20 text-red-200 border border-red-500/30"}>
              {mockData.lastCall.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Link to={`/calls/${mockData.lastCall.id}`} className="block">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border-2 border-white/10">
                  {mockData.elderlyPhoto ? (
                    <AvatarImage src={mockData.elderlyPhoto} alt={mockData.elderlyName} />
                  ) : (
                    <AvatarFallback className="bg-primary/20 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-primary-foreground font-medium">{mockData.lastCall.date}</p>
                  <p className="text-sm text-primary-foreground/70">
                    "{mockData.lastCall.sentiment}"
                  </p>
                  <div className="flex gap-1 mt-1">
                    {mockData.lastCall.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-primary/10 border-primary/20 text-white">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-white hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Link>
        </CardContent>
      </Card>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Medication Status */}
        <Card className="glass-card">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="m9 12 2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg>
              <CardTitle className="text-sm font-medium">Medication</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <div className={`rounded-full p-2 ${
                mockData.medications.status === "taken" 
                  ? "bg-emerald-500/20" 
                  : "bg-red-500/20"
              }`}>
                <div className={`rounded-full p-2 ${
                  mockData.medications.status === "taken" 
                    ? "text-emerald-200" 
                    : "text-red-200"
                }`}>
                  {mockData.medications.status === "taken" ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" y2="16" x1="12"></line></svg>
                  }
                </div>
              </div>
              <p className="mt-2 font-medium text-center text-primary-foreground">
                {mockData.medications.status === "taken" ? "Taken Today" : "Not Taken"}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Sleep Quality */}
        <Card className="glass-card">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <Badge className={`mb-2 ${
                mockData.sleep.status === "good" 
                  ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30" 
                  : "bg-yellow-500/20 text-yellow-200 border border-yellow-500/30"
              }`}>
                {mockData.sleep.status === "good" ? "Good" : "Fair"}
              </Badge>
              <div className="flex items-end justify-center gap-1 w-full h-10">
                {mockData.sleep.data.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-primary-foreground/80 rounded-sm w-3" 
                    style={{ height: `${value * 10}%` }}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-primary-foreground/70 mt-2">Last 7 days</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Mood Analysis */}
        <Card className="glass-card">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9" y1="9" y2="9"></line><line x1="15" x2="15" y1="9" y2="9"></line></svg>
              <CardTitle className="text-sm font-medium">Mood Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-center">
              <div className="relative w-16 h-16">
                {/* Mood emoji based on score */}
                {mockData.mood.score > 75 ? (
                  <div className="text-4xl flex justify-center items-center h-full">😊</div>
                ) : mockData.mood.score > 50 ? (
                  <div className="text-4xl flex justify-center items-center h-full">🙂</div>
                ) : mockData.mood.score > 25 ? (
                  <div className="text-4xl flex justify-center items-center h-full">😐</div>
                ) : (
                  <div className="text-4xl flex justify-center items-center h-full">🙁</div>
                )}
              </div>
            </div>
            <p className="text-sm text-center text-primary-foreground">
              {mockData.mood.score > 75 ? "Great" : 
               mockData.mood.score > 50 ? "Good" : 
               mockData.mood.score > 25 ? "Fair" : "Critical"}
            </p>
          </CardContent>
        </Card>
        
        {/* Appointments */}
        <Card className="glass-card">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {mockData.appointments.length > 0 ? (
              <div className="space-y-2">
                {mockData.appointments.map((apt, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-primary-foreground">{apt.title}</p>
                      <p className="text-xs text-primary-foreground/70">{apt.date}, {apt.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2 text-white hover:bg-white/10">
                  <Link to="/appointments" className="flex items-center w-full justify-center">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-primary-foreground/70 h-16 flex items-center justify-center">
                No upcoming appointments
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Calls with Next Check-in */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Recent Calls</CardTitle>
            <Link to="/calls">
              <Button variant="ghost" size="sm" className="px-0 text-white hover:bg-transparent hover:text-white/80">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* Next Check-in */}
          <div className="mb-4 p-3 glass-surface">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">Next Check-in</p>
                  <p className="font-medium text-primary-foreground">{mockData.nextCall.scheduled}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link to="/calls/1" className="block">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <p className="font-medium text-primary-foreground">Today, 9:15 AM</p>
                  <p className="text-sm text-primary-foreground/70">Duration: 4m 32s</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">Done</Badge>
              </div>
            </Link>
            
            <Link to="/calls/2" className="block">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <p className="font-medium text-primary-foreground">Yesterday, 9:30 AM</p>
                  <p className="text-sm text-primary-foreground/70">Duration: 5m 15s</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">Done</Badge>
              </div>
            </Link>
            
            <Link to="/calls/3" className="block">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-primary-foreground">May 3, 9:05 AM</p>
                  <p className="text-sm text-primary-foreground/70">Duration: 3m 58s</p>
                </div>
                <Badge className="bg-red-500/20 text-red-200 border border-red-500/30">Missed</Badge>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
