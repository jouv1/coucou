
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  MessageSquare, 
  Phone, 
  Frown, 
  Pill, 
  Clock as SleepIcon, 
  HeartPulse,
  Calendar
} from "lucide-react";

interface NotificationsStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const NotificationsStep = ({ data, updateData, stepId }: NotificationsStepProps) => {
  const [notifications, setNotifications] = useState({
    callSummary: data.notifications?.callSummary ?? true,
    missedCall: data.notifications?.missedCall ?? true,
    lowSentiment: data.notifications?.lowSentiment ?? true,
    medication: data.notifications?.medication ?? true,
    sleep: data.notifications?.sleep ?? false,
    appointments: data.notifications?.appointments ?? true,
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
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-lovable-500">
              <MessageSquare size={18} />
            </div>
            <div>
              <Label htmlFor="call-summary" className="font-medium">Daily Call Summary</Label>
              <p className="text-sm text-gray-500">Get a daily digest of all conversations</p>
            </div>
          </div>
          <Switch 
            id="call-summary"
            checked={notifications.callSummary}
            onCheckedChange={(checked) => handleToggle("callSummary", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-blue-500">
              <Phone size={18} />
            </div>
            <div>
              <Label htmlFor="missed-call" className="font-medium">Missed Calls</Label>
              <p className="text-sm text-gray-500">Alert if calls are missed after retry attempts</p>
            </div>
          </div>
          <Switch 
            id="missed-call"
            checked={notifications.missedCall}
            onCheckedChange={(checked) => handleToggle("missedCall", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-amber-500">
              <Frown size={18} />
            </div>
            <div>
              <Label htmlFor="low-sentiment" className="font-medium">Low Sentiment</Label>
              <p className="text-sm text-gray-500">Notify if your loved one seems sad or distressed</p>
            </div>
          </div>
          <Switch 
            id="low-sentiment"
            checked={notifications.lowSentiment}
            onCheckedChange={(checked) => handleToggle("lowSentiment", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-green-500">
              <Pill size={18} />
            </div>
            <div>
              <Label htmlFor="medication" className="font-medium">Missed Medication</Label>
              <p className="text-sm text-gray-500">Alert if medications aren't taken</p>
            </div>
          </div>
          <Switch 
            id="medication"
            checked={notifications.medication}
            onCheckedChange={(checked) => handleToggle("medication", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-indigo-500">
              <SleepIcon size={18} />
            </div>
            <div>
              <Label htmlFor="sleep" className="font-medium">Poor Sleep Quality</Label>
              <p className="text-sm text-gray-500">Alert when sleep quality is consistently poor</p>
            </div>
          </div>
          <Switch 
            id="sleep"
            checked={notifications.sleep}
            onCheckedChange={(checked) => handleToggle("sleep", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-orange-500">
              <Calendar size={18} />
            </div>
            <div>
              <Label htmlFor="appointments" className="font-medium">Appointment Reminders</Label>
              <p className="text-sm text-gray-500">Reminders about upcoming appointments</p>
            </div>
          </div>
          <Switch 
            id="appointments"
            checked={notifications.appointments}
            onCheckedChange={(checked) => handleToggle("appointments", checked)}
          />
        </div>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Phone size={16} className="text-blue-500" /> 
          <span>Missed Call Escalation</span>
        </h3>
        <div className="bg-blue-50 p-3 rounded-md text-sm">
          <p className="text-gray-700 mb-2">Configure when to receive missed call notifications:</p>
          <p className="text-gray-600 mb-1">• Notify after <span className="font-medium">2</span> missed attempts</p>
          <p className="text-gray-600 mb-1">• Retry interval: <span className="font-medium">15 minutes</span></p>
          <p className="text-gray-600">• Escalate after <span className="font-medium">3</span> consecutive missed calls</p>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        You can always adjust these settings later from the Settings page.
      </p>
    </div>
  );
};

export default NotificationsStep;
