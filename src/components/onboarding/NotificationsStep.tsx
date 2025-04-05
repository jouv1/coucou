
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationsStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const NotificationsStep = ({ data, updateData, stepId }: NotificationsStepProps) => {
  const [notifications, setNotifications] = useState({
    missedCall: data.notifications?.missedCall ?? true,
    lowSentiment: data.notifications?.lowSentiment ?? true,
    medication: data.notifications?.medication ?? true,
    appointments: data.notifications?.appointments ?? true,
    sleep: data.notifications?.sleep ?? false,
    callSummary: data.notifications?.callSummary ?? false,
  });

  const handleToggle = (key: string, value: boolean) => {
    const updatedNotifications = { ...notifications, [key]: value };
    setNotifications(updatedNotifications);
    updateData(stepId, updatedNotifications);
  };

  return (
    <div className="space-y-6 pt-2">
      <p className="text-sm text-gray-600">
        Choose when you'd like to receive notifications about your loved one.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="missed-call" className="font-medium">Missed Calls</Label>
            <p className="text-sm text-gray-500">Alert if calls are missed after retry attempts</p>
          </div>
          <Switch 
            id="missed-call"
            checked={notifications.missedCall}
            onCheckedChange={(checked) => handleToggle("missedCall", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="low-sentiment" className="font-medium">Low Sentiment</Label>
            <p className="text-sm text-gray-500">Notify if your loved one seems sad or distressed</p>
          </div>
          <Switch 
            id="low-sentiment"
            checked={notifications.lowSentiment}
            onCheckedChange={(checked) => handleToggle("lowSentiment", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="medication" className="font-medium">Missed Medication</Label>
            <p className="text-sm text-gray-500">Alert if medications aren't taken</p>
          </div>
          <Switch 
            id="medication"
            checked={notifications.medication}
            onCheckedChange={(checked) => handleToggle("medication", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="appointments" className="font-medium">Appointment Reminders</Label>
            <p className="text-sm text-gray-500">Reminders about upcoming appointments</p>
          </div>
          <Switch 
            id="appointments"
            checked={notifications.appointments}
            onCheckedChange={(checked) => handleToggle("appointments", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sleep" className="font-medium">Poor Sleep Quality</Label>
            <p className="text-sm text-gray-500">Alert when sleep quality is consistently poor</p>
          </div>
          <Switch 
            id="sleep"
            checked={notifications.sleep}
            onCheckedChange={(checked) => handleToggle("sleep", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="call-summary" className="font-medium">Daily Call Summary</Label>
            <p className="text-sm text-gray-500">Get a daily digest of all conversations</p>
          </div>
          <Switch 
            id="call-summary"
            checked={notifications.callSummary}
            onCheckedChange={(checked) => handleToggle("callSummary", checked)}
          />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        You can always adjust these settings later from your dashboard.
      </p>
    </div>
  );
};

export default NotificationsStep;
