
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bell, User, Settings as SettingsIcon, 
  Phone, Shield, LogOut, ChevronRight,
  Heart
} from "lucide-react";

const settingCategories = [
  {
    title: "Account Settings",
    icon: User,
    color: "text-blue-500",
    items: [
      { label: "Personal Information", link: "/settings/profile" },
      { label: "Account Security", link: "/settings/security" },
    ]
  },
  {
    title: "Loved One Profile",
    icon: Heart,
    color: "text-lovable-500",
    items: [
      { label: "Basic Information", link: "/settings/loved-one" },
      { label: "Health & Medications", link: "/settings/health" },
      { label: "Language Preference", link: "/settings/language" },
    ]
  },
  {
    title: "Call Preferences",
    icon: Phone,
    color: "text-green-500",
    items: [
      { label: "Call Type & Duration", link: "/settings/call-type" },
      { label: "Voice Preference", link: "/settings/voice" },
      { label: "Schedule & Frequency", link: "/settings/schedule" },
    ]
  },
  {
    title: "Notifications",
    icon: Bell,
    color: "text-amber-500",
    items: [
      { label: "Daily Call Summary", link: "/settings/summary" },
      { label: "Health Alerts", link: "/settings/health-alerts" },
      { label: "Missed Call Settings", link: "/settings/missed-calls" },
      { label: "Custom Reminders", link: "/settings/reminders" },
    ]
  },
  {
    title: "App Settings",
    icon: SettingsIcon,
    color: "text-gray-500",
    items: [
      { label: "Privacy Settings", link: "/settings/privacy" },
      { label: "Help & Support", link: "/settings/help" },
    ]
  },
];

const Settings = () => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    // In a real app, this would handle authentication logout
    navigate("/");
  };
  
  return (
    <div className="py-6 animate-fade-in space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Settings</h1>
        <p className="text-gray-600">
          Manage your account and Bisou preferences
        </p>
      </div>
      
      {settingCategories.map((category, index) => (
        <Card key={index} className="border-lovable-100 shadow-sm">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <category.icon className={`h-5 w-5 ${category.color}`} />
              <CardTitle className="text-lg font-medium">{category.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {category.items.map((item, itemIndex) => (
                <Link key={itemIndex} to={item.link}>
                  <div className="group hover:bg-lovable-50 rounded-md transition-colors">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between text-gray-700 hover:text-lovable-700 hover:bg-transparent group-hover:bg-transparent"
                    >
                      <div className="text-left">
                        <div>{item.label}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-70" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="pt-4 text-center">
        <Button 
          variant="outline" 
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Settings;
