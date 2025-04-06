
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Mic, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface PreferencesStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const PreferencesStep = ({ data, updateData, stepId }: PreferencesStepProps) => {
  const [preferences, setPreferences] = useState(data.preferences || {
    callLength: "short",
    voiceGender: "female",
    customVoice: "",
    checkItems: ["medication", "mood", "sleep", "appointments"],
    customCheckItem: "",
  });

  const [customItem, setCustomItem] = useState("");

  const handleCallLengthChange = (value: string) => {
    const updatedPrefs = { ...preferences, callLength: value };
    setPreferences(updatedPrefs);
    updateData(stepId, updatedPrefs);
  };

  const handleVoiceChange = (value: string) => {
    const updatedPrefs = { ...preferences, voiceGender: value };
    setPreferences(updatedPrefs);
    updateData(stepId, updatedPrefs);
  };

  const toggleCheckItem = (value: string) => {
    const currentItems = [...preferences.checkItems];
    const updatedItems = currentItems.includes(value)
      ? currentItems.filter(item => item !== value)
      : [...currentItems, value];
    
    const updatedPrefs = { ...preferences, checkItems: updatedItems };
    setPreferences(updatedPrefs);
    updateData(stepId, updatedPrefs);
  };

  const addCustomCheckItem = () => {
    if (customItem.trim() === "") return;
    
    const currentItems = [...preferences.checkItems];
    if (!currentItems.includes(customItem)) {
      const updatedPrefs = { 
        ...preferences, 
        checkItems: [...currentItems, customItem],
        customCheckItem: customItem
      };
      setPreferences(updatedPrefs);
      updateData(stepId, updatedPrefs);
    }
    setCustomItem("");
  };

  // Get description based on call length
  const getCallLengthDescription = (length: string) => {
    switch(length) {
      case "short":
        return "Quick check-in for those who aren't too talkative";
      case "medium":
        return "Standard calls with enough time for key questions";
      case "long":
        return "Extended conversation for those who enjoy chatting";
      default:
        return "";
    }
  };

  const callLengthDescription = getCallLengthDescription(preferences.callLength);

  return (
    <div className="space-y-5 pt-2">
      <div className="space-y-3">
        <Label>Call Length Preference</Label>
        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className={`h-10 ${preferences.callLength === "short" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleCallLengthChange("short")}
          >
            Short
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`h-10 ${preferences.callLength === "medium" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleCallLengthChange("medium")}
          >
            Medium
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`h-10 ${preferences.callLength === "long" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleCallLengthChange("long")}
          >
            Long
          </Button>
        </div>
        
        {callLengthDescription && (
          <p className="text-sm text-gray-600 italic">
            {callLengthDescription}
          </p>
        )}
      </div>

      <div className="space-y-3 border-t pt-4">
        <Label>Voice Preference</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className={`${preferences.voiceGender === "female" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleVoiceChange("female")}
          >
            <Mic className="h-4 w-4 mr-2" />
            Female Voice
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`${preferences.voiceGender === "male" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleVoiceChange("male")}
          >
            <Mic className="h-4 w-4 mr-2" />
            Male Voice
          </Button>
        </div>
      </div>
      
      <div className="space-y-3 border-t pt-4">
        <Label>What should we check during calls?</Label>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "medication", label: "Medications" },
              { id: "mood", label: "Mood" },
              { id: "sleep", label: "Sleep Quality" },
              { id: "appointments", label: "Appointments" }
            ].map((item) => (
              <div key={item.id} 
                className={`flex items-center space-x-2 p-2 rounded-md border cursor-pointer ${
                  preferences.checkItems.includes(item.id) 
                    ? "bg-[#e8f5f2] border-[#63BFAC]" 
                    : "border-gray-200"
                }`}
                onClick={() => toggleCheckItem(item.id)}
              >
                <Checkbox 
                  id={`check-${item.id}`} 
                  checked={preferences.checkItems.includes(item.id)} 
                  className="data-[state=checked]:bg-[#63BFAC] data-[state=checked]:border-[#63BFAC]"
                />
                <Label htmlFor={`check-${item.id}`} className="cursor-pointer">{item.label}</Label>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Custom check item"
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
            />
            <Button 
              onClick={addCustomCheckItem}
              disabled={!customItem.trim()}
              className="bg-[#63BFAC] hover:bg-[#4da899] text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-[#e8f5f2] p-3 rounded-md mt-4">
        <MessageSquare className="h-5 w-5 text-[#1F584D]" />
        <p className="text-sm text-gray-600">
          These preferences help us tailor the AI calls to what matters most for your loved one.
        </p>
      </div>
    </div>
  );
};

export default PreferencesStep;
