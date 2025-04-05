
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HealthConditionsStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const HealthConditionsStep = ({ data, updateData, stepId }: HealthConditionsStepProps) => {
  const [healthData, setHealthData] = useState(data.healthConditions || {
    generalHealth: "",
    hearingAbility: "",
    mentalState: 5,
    lowMentalStateReasons: [],
    forgetfulness: "",
    loneliness: 5,
    conditions: [],
  });

  const handleHealthOptionChange = (field: string, value: string) => {
    const newData = { ...healthData, [field]: value };
    setHealthData(newData);
    updateData(stepId, newData);
  };

  const handleSliderChange = (field: string, value: number[]) => {
    const newData = { ...healthData, [field]: value[0] };
    setHealthData(newData);
    updateData(stepId, newData);
  };

  const toggleCondition = (condition: string) => {
    const currentConditions = [...(healthData.conditions || [])];
    const updatedConditions = currentConditions.includes(condition)
      ? currentConditions.filter(c => c !== condition)
      : [...currentConditions, condition];
    
    const newData = { ...healthData, conditions: updatedConditions };
    setHealthData(newData);
    updateData(stepId, newData);
  };

  const toggleLowMentalStateReason = (reason: string) => {
    const currentReasons = [...(healthData.lowMentalStateReasons || [])];
    const updatedReasons = currentReasons.includes(reason)
      ? currentReasons.filter(r => r !== reason)
      : [...currentReasons, reason];
    
    const newData = { ...healthData, lowMentalStateReasons: updatedReasons };
    setHealthData(newData);
    updateData(stepId, newData);
  };

  const lowMentalStateReasons = [
    { id: "physical-pain", label: "Physical Pain" },
    { id: "loneliness", label: "Loneliness" },
    { id: "trauma", label: "Trauma" },
    { id: "family-issues", label: "Family Issues" },
    { id: "loss", label: "Loss of Loved One" },
    { id: "health-decline", label: "Health Decline" },
    { id: "financial", label: "Financial Stress" },
    { id: "independence", label: "Loss of Independence" }
  ];

  // Common health conditions for elderly
  const healthConditions = [
    { id: "arthritis", label: "Arthritis" },
    { id: "heart-disease", label: "Heart Disease" },
    { id: "high-blood-pressure", label: "High Blood Pressure" },
    { id: "diabetes", label: "Diabetes" },
    { id: "dementia", label: "Dementia" },
    { id: "alzheimers", label: "Alzheimer's" },
    { id: "parkinsons", label: "Parkinson's" },
    { id: "depression", label: "Depression" },
    { id: "anxiety", label: "Anxiety" },
    { id: "copd", label: "COPD" },
    { id: "cancer", label: "Cancer" },
    { id: "stroke", label: "Stroke History" },
    { id: "osteoporosis", label: "Osteoporosis" }
  ];

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label>General Health Status</Label>
        <Select 
          value={healthData.generalHealth} 
          onValueChange={(value) => handleHealthOptionChange("generalHealth", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select health status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">Excellent - Very healthy for their age</SelectItem>
            <SelectItem value="good">Good - Some minor health issues</SelectItem>
            <SelectItem value="fair">Fair - Moderate health concerns</SelectItem>
            <SelectItem value="poor">Poor - Significant health challenges</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Hearing Ability</Label>
        <Select 
          value={healthData.hearingAbility} 
          onValueChange={(value) => handleHealthOptionChange("hearingAbility", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select hearing ability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">Excellent - No hearing issues</SelectItem>
            <SelectItem value="good">Good - Slight difficulty in noisy environments</SelectItem>
            <SelectItem value="moderate">Moderate - Uses hearing aid or needs louder speech</SelectItem>
            <SelectItem value="poor">Poor - Significant hearing loss</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 border-t pt-4">
        <Label>Mental Wellbeing (1-10)</Label>
        <p className="text-sm text-gray-500 mb-2">
          How would you rate their overall mental wellbeing?
        </p>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Poor</span>
          <Slider 
            defaultValue={[healthData.mentalState || 5]} 
            max={10} 
            step={1}
            onValueChange={(value) => handleSliderChange("mentalState", value)}
            className="flex-1"
          />
          <span className="text-sm">Excellent</span>
        </div>
        <div className="text-center mb-2">
          <span className="text-lg font-medium">{healthData.mentalState || 5}/10</span>
        </div>

        {(healthData.mentalState < 7) && (
          <div className="space-y-3 mt-3 p-3 border rounded-md bg-slate-50 animate-fade-in">
            <Label>Why do you think their mental wellbeing is lower?</Label>
            <p className="text-sm text-gray-500 mb-1">
              Select all that apply:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {lowMentalStateReasons.map((reason) => (
                <Button
                  key={reason.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={`justify-start ${
                    (healthData.lowMentalStateReasons || []).includes(reason.id) 
                      ? "bg-lovable-100 border-lovable-300 text-lovable-700" 
                      : "bg-white"
                  }`}
                  onClick={() => toggleLowMentalStateReason(reason.id)}
                >
                  {reason.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <Label>Forgetfulness</Label>
        <Select 
          value={healthData.forgetfulness} 
          onValueChange={(value) => handleHealthOptionChange("forgetfulness", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select forgetfulness level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rarely">Rarely forgets things</SelectItem>
            <SelectItem value="sometimes">Sometimes forgets minor things</SelectItem>
            <SelectItem value="often">Often forgets important details</SelectItem>
            <SelectItem value="frequently">Frequently forgets significant events or tasks</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3 border-t pt-4">
        <Label>Loneliness (1-10)</Label>
        <p className="text-sm text-gray-500 mb-2">
          How socially connected is your loved one?
        </p>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Very Lonely</span>
          <Slider 
            defaultValue={[healthData.loneliness || 5]} 
            max={10} 
            step={1}
            onValueChange={(value) => handleSliderChange("loneliness", value)}
            className="flex-1"
          />
          <span className="text-sm">Very Social</span>
        </div>
        <div className="text-center mb-2">
          <span className="text-lg font-medium">{healthData.loneliness || 5}/10</span>
        </div>
      </div>
      
      <div className="space-y-3 border-t pt-4">
        <Label>Health Conditions</Label>
        <p className="text-sm text-gray-500 mb-2">
          Select any conditions that apply:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {healthConditions.map((condition) => (
            <Button
              key={condition.id}
              type="button"
              variant="outline"
              size="sm"
              className={`justify-start ${
                (healthData.conditions || []).includes(condition.id) 
                  ? "bg-lovable-100 border-lovable-300 text-lovable-700" 
                  : "bg-white"
              }`}
              onClick={() => toggleCondition(condition.id)}
            >
              {condition.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthConditionsStep;
