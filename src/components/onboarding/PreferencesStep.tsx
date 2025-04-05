
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface PreferencesStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const checkItems = [
  { id: "medication", label: "Medication Reminders", defaultChecked: true },
  { id: "mood", label: "Mood Check-in", defaultChecked: true },
  { id: "sleep", label: "Sleep Quality", defaultChecked: true },
  { id: "appointments", label: "Appointment Reminders", defaultChecked: true },
  { id: "meals", label: "Meals/Nutrition", defaultChecked: false },
  { id: "physical-activity", label: "Physical Activity", defaultChecked: false },
];

const PreferencesStep = ({ data, updateData, stepId }: PreferencesStepProps) => {
  const [preferences, setPreferences] = useState({
    callLength: data.preferences?.callLength || "short",
    voiceGender: data.preferences?.voiceGender || "female",
    customVoice: data.preferences?.customVoice || "",
    checkItems: data.preferences?.checkItems || ["medication", "mood", "sleep", "appointments"],
    customCheckItem: data.preferences?.customCheckItem || "",
  });

  const handleCallLengthChange = (value: string) => {
    const newPreferences = { ...preferences, callLength: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const handleVoiceGenderChange = (value: string) => {
    const newPreferences = { ...preferences, voiceGender: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const toggleCheckItem = (item: string) => {
    const updatedItems = preferences.checkItems.includes(item)
      ? preferences.checkItems.filter(i => i !== item)
      : [...preferences.checkItems, item];
    
    const newPreferences = { ...preferences, checkItems: updatedItems };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const handleCustomVoiceChange = (value: string) => {
    const newPreferences = { ...preferences, customVoice: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const handleCustomCheckItemChange = (value: string) => {
    const newPreferences = { ...preferences, customCheckItem: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label>Call Length & Type</Label>
        <RadioGroup 
          value={preferences.callLength}
          onValueChange={handleCallLengthChange}
          className="space-y-2"
        >
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="short" id="short" className="mt-1" />
            <div>
              <Label htmlFor="short" className="font-medium">Quick Check-in (1-3 min)</Label>
              <p className="text-sm text-gray-500">For those who aren't very talkative and prefer brief conversations</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="medium" id="medium" className="mt-1" />
            <div>
              <Label htmlFor="medium" className="font-medium">Standard Call (3-5 min)</Label>
              <p className="text-sm text-gray-500">For those who enjoy a balanced conversation</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="long" id="long" className="mt-1" />
            <div>
              <Label htmlFor="long" className="font-medium">Extended Chat (5-10+ min)</Label>
              <p className="text-sm text-gray-500">For those who love to chat and need social interaction</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3 pt-2">
        <Label>What should we check during calls?</Label>
        <div className="grid grid-cols-2 gap-2">
          {checkItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`check-${item.id}`}
                checked={preferences.checkItems.includes(item.id)}
                onCheckedChange={() => toggleCheckItem(item.id)}
              />
              <Label htmlFor={`check-${item.id}`} className="text-sm">
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom-check">Other Check (Optional)</Label>
        <Input
          id="custom-check"
          placeholder="Any specific question you'd like us to ask?"
          value={preferences.customCheckItem}
          onChange={(e) => handleCustomCheckItemChange(e.target.value)}
        />
      </div>
      
      <div className="space-y-3 pt-3 border-t border-gray-100">
        <Label>Voice Preference</Label>
        <RadioGroup 
          value={preferences.voiceGender}
          onValueChange={handleVoiceGenderChange}
          className="space-y-2"
        >
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="female" id="female" className="mt-1" />
            <Label htmlFor="female">Female Voice</Label>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="male" id="male" className="mt-1" />
            <Label htmlFor="male">Male Voice</Label>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="custom" id="custom" className="mt-1" />
            <Label htmlFor="custom">Custom Voice</Label>
          </div>
        </RadioGroup>
      </div>

      {preferences.voiceGender === "custom" && (
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="custom-voice">Custom Voice ID</Label>
          <Input
            id="custom-voice"
            placeholder="Enter ElevenLabs Voice ID"
            value={preferences.customVoice}
            onChange={(e) => handleCustomVoiceChange(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            You can use a custom voice from ElevenLabs by entering the Voice ID here
          </p>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        These preferences help us make conversations feel natural and enjoyable.
      </p>
    </div>
  );
};

export default PreferencesStep;
