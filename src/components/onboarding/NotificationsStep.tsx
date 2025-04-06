
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, MessageSquare, AlertCircle, Clock } from "lucide-react";

interface NotificationsStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const NotificationsStep = ({ data, updateData, stepId }: NotificationsStepProps) => {
  const [notifications, setNotifications] = useState(data.notifications || {
    callSummary: true,
    missedCall: true,
    lowSentiment: true,
    medication: false,
    sleep: false,
    appointments: false,
  });

  const handleNotificationChange = (type: string, value: boolean) => {
    const updatedNotifications = { ...notifications, [type]: value };
    setNotifications(updatedNotifications);
    updateData(stepId, updatedNotifications);
  };

  const notificationOptions = [
    {
      id: "callSummary",
      title: "Daily Call Summary",
      description: "Get a summary after each call",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: "missedCall",
      title: "Missed Calls",
      description: "Alert when your loved one misses a call",
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: "lowSentiment",
      title: "Health Alerts",
      description: "Notification when we detect concerns",
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-5 pt-2">
      <p className="text-gray-600">
        Choose which notifications you'd like to receive about your loved one.
      </p>

      <div className="space-y-4">
        {notificationOptions.map((option) => (
          <div key={option.id} className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center gap-3">
              <div className={`${option.bgColor} p-2 rounded-md`}>
                <option.icon className={`h-5 w-5 ${option.color}`} />
              </div>
              <div>
                <h3 className="font-medium">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
            <Switch 
              checked={notifications[option.id as keyof typeof notifications]} 
              onCheckedChange={(checked) => handleNotificationChange(option.id, checked)} 
              className="data-[state=checked]:bg-[#63BFAC]"
            />
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <Label className="mb-3 block">Medication & Health Reminders</Label>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="medication-switch" className="cursor-pointer">Medication Alerts</Label>
            <Switch 
              id="medication-switch"
              checked={notifications.medication} 
              onCheckedChange={(checked) => handleNotificationChange("medication", checked)}
              className="data-[state=checked]:bg-[#63BFAC]"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="sleep-switch" className="cursor-pointer">Sleep Quality Concerns</Label>
            <Switch 
              id="sleep-switch"
              checked={notifications.sleep} 
              onCheckedChange={(checked) => handleNotificationChange("sleep", checked)}
              className="data-[state=checked]:bg-[#63BFAC]"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="appointments-switch" className="cursor-pointer">Appointment Reminders</Label>
            <Switch 
              id="appointments-switch"
              checked={notifications.appointments} 
              onCheckedChange={(checked) => handleNotificationChange("appointments", checked)}
              className="data-[state=checked]:bg-[#63BFAC]"
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-4 italic">
        You can update these notification preferences at any time in settings.
      </p>
    </div>
  );
};

export default NotificationsStep;
