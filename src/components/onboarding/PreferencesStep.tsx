
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface PreferencesStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const availableTopics = [
  { id: "family", label: "Family" },
  { id: "friends", label: "Friends" },
  { id: "hobbies", label: "Hobbies" },
  { id: "gardening", label: "Gardening" },
  { id: "cooking", label: "Cooking" },
  { id: "books", label: "Books" },
  { id: "music", label: "Music" },
  { id: "movies", label: "Movies & TV" },
  { id: "current-events", label: "Current Events" },
  { id: "weather", label: "Weather" },
  { id: "memories", label: "Past Memories" },
];

const PreferencesStep = ({ data, updateData, stepId }: PreferencesStepProps) => {
  const [preferences, setPreferences] = useState({
    voiceTone: data.preferences?.voiceTone || "calm",
    topics: data.preferences?.topics || [],
    customVoice: data.preferences?.customVoice || "",
  });

  const handleVoiceToneChange = (value: string) => {
    const newPreferences = { ...preferences, voiceTone: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const toggleTopic = (topic: string) => {
    const updatedTopics = preferences.topics.includes(topic)
      ? preferences.topics.filter(t => t !== topic)
      : [...preferences.topics, topic];
    
    const newPreferences = { ...preferences, topics: updatedTopics };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
  };

  const handleCustomVoiceChange = (value: string) => {
    const newPreferences = { ...preferences, customVoice: value };
    setPreferences(newPreferences);
    updateData(stepId, newPreferences);
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
      
      <div className="space-y-3 pt-2">
        <Label>Conversation Topics</Label>
        <p className="text-sm text-gray-600 mb-2">
          Select topics that your loved one enjoys talking about
        </p>
        <div className="grid grid-cols-2 gap-2">
          {availableTopics.map((topic) => (
            <div key={topic.id} className="flex items-center space-x-2">
              <Checkbox 
                id={topic.id}
                checked={preferences.topics.includes(topic.id)}
                onCheckedChange={() => toggleTopic(topic.id)}
              />
              <Label htmlFor={topic.id} className="text-sm">
                {topic.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        These preferences help us make conversations feel natural and enjoyable.
      </p>
    </div>
  );
};

export default PreferencesStep;
