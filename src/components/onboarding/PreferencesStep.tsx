
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PreferencesStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const PreferencesStep = ({ data, updateData, stepId }: PreferencesStepProps) => {
  const [preferences, setPreferences] = useState(data.preferences || {
    callLength: "medium",
    voiceGender: "female",
    customVoice: "",
    checkItems: ["medication", "mood", "sleep", "appointments"],
    customCheckItem: "",
  });

  const handlePreferenceChange = (field: string, value: string) => {
    const newPreferences = { ...preferences, [field]: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const checkItems = [
    { id: "medication", label: "Medication Reminders" },
    { id: "mood", label: "Mood Check" },
    { id: "sleep", label: "Sleep Quality" },
    { id: "appointments", label: "Upcoming Appointments" },
  ];

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label>Call Length Preference</Label>
        <RadioGroup 
          value={preferences.callLength}
          onValueChange={(value) => handlePreferenceChange("callLength", value)}
          className="grid grid-cols-3 gap-3"
        >
          <div className="flex items-center justify-center">
            <RadioGroupItem value="short" id="short" className="sr-only" />
            <Label
              htmlFor="short"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                preferences.callLength === "short" ? "border-lovable-500" : ""
              }`}
            >
              <span className="text-xl mb-2">⚡</span>
              <span className="font-medium">Short</span>
              <span className="text-xs text-muted-foreground">2-3 minutes</span>
            </Label>
          </div>
          
          <div className="flex items-center justify-center">
            <RadioGroupItem value="medium" id="medium" className="sr-only" />
            <Label
              htmlFor="medium"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                preferences.callLength === "medium" ? "border-lovable-500" : ""
              }`}
            >
              <span className="text-xl mb-2">🔄</span>
              <span className="font-medium">Medium</span>
              <span className="text-xs text-muted-foreground">4-5 minutes</span>
            </Label>
          </div>
          
          <div className="flex items-center justify-center">
            <RadioGroupItem value="long" id="long" className="sr-only" />
            <Label
              htmlFor="long"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                preferences.callLength === "long" ? "border-lovable-500" : ""
              }`}
            >
              <span className="text-xl mb-2">🔊</span>
              <span className="font-medium">Long</span>
              <span className="text-xs text-muted-foreground">7-10 minutes</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-3 pt-2 border-t">
        <Label>Voice Preference</Label>
        <Select 
          value={preferences.voiceGender} 
          onValueChange={(value) => handlePreferenceChange("voiceGender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select voice preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">Female Voice</SelectItem>
            <SelectItem value="male">Male Voice</SelectItem>
            <SelectItem value="custom">Custom Voice</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3 pt-2 border-t">
        <Label>What should we check during calls?</Label>
        <div className="grid grid-cols-2 gap-3">
          {checkItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 rounded-md border p-3 disabled">
              <div className="h-5 w-5 border rounded flex items-center justify-center">
                {preferences.checkItems.includes(item.id) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreferencesStep;
