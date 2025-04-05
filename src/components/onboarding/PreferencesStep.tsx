
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mic } from "lucide-react";

interface PreferencesStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const interestAreas = [
  { id: "family", label: "Family" },
  { id: "friends", label: "Friends" },
  { id: "travel", label: "Travel" },
  { id: "history", label: "History" },
  { id: "gardening", label: "Gardening" },
  { id: "cooking", label: "Cooking" },
  { id: "books", label: "Books" },
  { id: "music", label: "Music" },
  { id: "movies", label: "Movies & TV" },
  { id: "politics", label: "Politics" },
  { id: "sports", label: "Sports" },
  { id: "tech", label: "Technology" },
  { id: "art", label: "Art & Culture" },
  { id: "religion", label: "Religion" },
  { id: "current-events", label: "Current Events" },
  { id: "weather", label: "Weather" },
  { id: "memories", label: "Past Memories" },
  { id: "local-news", label: "Local News" },
];

const checkItems = [
  { id: "medication", label: "Medication Reminders" },
  { id: "mood", label: "Mood Check-in" },
  { id: "sleep", label: "Sleep Quality" },
  { id: "appointments", label: "Appointment Reminders" },
  { id: "meals", label: "Meals/Nutrition" },
  { id: "physical-activity", label: "Physical Activity" },
];

const PreferencesStep = ({ data, updateData, stepId }: PreferencesStepProps) => {
  const [preferences, setPreferences] = useState({
    voiceTone: data.preferences?.voiceTone || "calm",
    interestAreas: data.preferences?.interestAreas || [],
    customInterests: data.preferences?.customInterests || "",
    customVoice: data.preferences?.customVoice || "",
    callLength: data.preferences?.callLength || "short",
    checkItems: data.preferences?.checkItems || [],
  });

  const handleVoiceToneChange = (value: string) => {
    const newPreferences = { ...preferences, voiceTone: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const handleCallLengthChange = (value: string) => {
    const newPreferences = { ...preferences, callLength: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const toggleInterestArea = (interest: string) => {
    const updatedInterests = preferences.interestAreas.includes(interest)
      ? preferences.interestAreas.filter(i => i !== interest)
      : [...preferences.interestAreas, interest];
    
    const newPreferences = { ...preferences, interestAreas: updatedInterests };
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

  const handleCustomInterestsChange = (value: string) => {
    const newPreferences = { ...preferences, customInterests: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const handleCustomVoiceChange = (value: string) => {
    const newPreferences = { ...preferences, customVoice: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const recordVoiceNote = () => {
    // This would integrate with the browser's audio recording API
    alert("Voice recording feature would be implemented here");
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label>Voice Tone Preference</Label>
        <RadioGroup 
          value={preferences.voiceTone}
          onValueChange={handleVoiceToneChange}
          className="space-y-2"
        >
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="calm" id="calm" />
            <div>
              <Label htmlFor="calm" className="font-medium">Calm & Gentle</Label>
              <p className="text-sm text-gray-500">A soothing, relaxed voice best for those who prefer quiet conversation</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="cheerful" id="cheerful" />
            <div>
              <Label htmlFor="cheerful" className="font-medium">Cheerful & Upbeat</Label>
              <p className="text-sm text-gray-500">An energetic, positive voice to brighten their day</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="caring" id="caring" />
            <div>
              <Label htmlFor="caring" className="font-medium">Caring & Supportive</Label>
              <p className="text-sm text-gray-500">A warm, empathetic voice that provides comfort</p>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <Label>Call Length & Type</Label>
        <RadioGroup 
          value={preferences.callLength}
          onValueChange={handleCallLengthChange}
          className="space-y-2"
        >
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="short" id="short" />
            <div>
              <Label htmlFor="short" className="font-medium">Quick Check-in (3-5 min)</Label>
              <p className="text-sm text-gray-500">Brief calls focused on essential wellness checks</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="medium" id="medium" />
            <div>
              <Label htmlFor="medium" className="font-medium">Standard Call (5-10 min)</Label>
              <p className="text-sm text-gray-500">Balanced calls with health checks and conversation</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="long" id="long" />
            <div>
              <Label htmlFor="long" className="font-medium">Extended Chat (10-15 min)</Label>
              <p className="text-sm text-gray-500">Longer calls with in-depth conversation</p>
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
      
      <div className="space-y-3 pt-2 border-t border-gray-100 mt-4">
        <Label>Areas of Interest</Label>
        <p className="text-sm text-gray-600 mb-2">
          Select topics your loved one enjoys discussing:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {interestAreas.map((interest) => (
            <Button 
              key={interest.id}
              type="button"
              variant={preferences.interestAreas.includes(interest.id) ? "default" : "outline"}
              className={`justify-start h-auto py-2 px-3 ${
                preferences.interestAreas.includes(interest.id) ? "bg-lovable-400" : ""
              }`}
              onClick={() => toggleInterestArea(interest.id)}
            >
              {interest.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom-interests">Other interests (optional)</Label>
        <Input
          id="custom-interests"
          placeholder="Other topics they enjoy discussing"
          value={preferences.customInterests}
          onChange={(e) => handleCustomInterestsChange(e.target.value)}
        />
      </div>
      
      <div className="space-y-3 pt-3 border-t border-gray-100">
        <Label>Voice Note (Optional)</Label>
        <p className="text-sm text-gray-600 mb-2">
          Record information about your loved one to help us personalize conversations
        </p>
        <Button onClick={recordVoiceNote} className="w-full flex items-center justify-center gap-2">
          <Mic size={16} />
          Record Voice Note
        </Button>
      </div>

      <div className="space-y-3 pt-2">
        <Label>Custom Voice (Optional)</Label>
        <Input
          placeholder="11Labs Voice ID (leave blank to use our defaults)"
          value={preferences.customVoice}
          onChange={(e) => handleCustomVoiceChange(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          You can use a custom voice from 11Labs by entering the Voice ID here
        </p>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        These preferences help us make conversations feel natural and enjoyable.
      </p>
    </div>
  );
};

export default PreferencesStep;
