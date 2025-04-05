
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bell, User, Settings as SettingsIcon, 
  Phone, Shield, LogOut, ChevronRight,
  Heart, Volume2, Clock
} from "lucide-react";

const settingCategories = [
  {
    title: "Profile Settings",
    icon: User,
    items: [
      { label: "Personal Information", link: "/settings/profile" },
      { label: "Account Security", link: "/settings/security" },
    ]
  },
  {
    title: "Loved One Settings",
    icon: Heart,
    items: [
      { label: "Basic Information", link: "/settings/loved-one" },
      { label: "Health & Medications", link: "/settings/health" },
    ]
  },
  {
    title: "Call Settings",
    icon: Phone,
    items: [
      { label: "Schedule & Frequency", link: "/settings/schedule" },
      { label: "Voice & Conversation", link: "/settings/voice" },
      { label: "Topics of Interest", link: "/settings/topics" },
    ]
  },
  {
    title: "Notification Preferences",
    icon: Bell,
    items: [
      { label: "Alert Settings", link: "/settings/alerts" },
      { label: "Email Notifications", link: "/settings/email" },
      { label: "Push Notifications", link: "/settings/push" },
    ]
  },
  {
    title: "App Settings",
    icon: SettingsIcon,
    items: [
      { label: "Privacy Settings", link: "/settings/privacy" },
      { label: "Help & Support", link: "/settings/help" },
    ]
  },
];

const Settings = () => {
  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Settings</h1>
        <p className="text-gray-600">
          Manage your account and preferences
        </p>
      </div>
      
      {settingCategories.map((category, index) => (
        <Card key={index} className="border-lovable-100">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <category.icon className="h-5 w-5 text-lovable-500" />
              <CardTitle className="text-lg font-medium">{category.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {category.items.map((item, itemIndex) => (
                <Link key={itemIndex} to={item.link}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-gray-700 hover:text-lovable-700 hover:bg-lovable-50"
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="pt-4 text-center">
        <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Settings;
