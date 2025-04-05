
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HealthConditionsStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const conditions = [
  { id: "dementia", label: "Dementia / Alzheimer's" },
  { id: "arthritis", label: "Arthritis" },
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "High Blood Pressure" },
  { id: "heart-disease", label: "Heart Disease" },
  { id: "copd", label: "COPD / Respiratory Issues" },
  { id: "hearing-loss", label: "Hearing Loss" },
  { id: "vision-impairment", label: "Vision Impairment" },
  { id: "depression", label: "Depression" },
  { id: "anxiety", label: "Anxiety" },
];

const HealthConditionsStep = ({ data, updateData, stepId }: HealthConditionsStepProps) => {
  const [healthData, setHealthData] = useState(data.healthConditions || {
    generalHealth: "",
    hearingAbility: "",
    mentalState: 5,
    forgetfulness: "",
    loneliness: 5,
    conditions: [],
    notes: "",
  });

  const updateHealthData = (field: string, value: any) => {
    const updatedData = { ...healthData, [field]: value };
    setHealthData(updatedData);
    updateData(stepId, updatedData);
  };

  const toggleCondition = (condition: string) => {
    const currentConditions = healthData.conditions || [];
    const updatedConditions = currentConditions.includes(condition)
      ? currentConditions.filter((c: string) => c !== condition)
      : [...currentConditions, condition];
    
    updateHealthData("conditions", updatedConditions);
  };

  return (
    <div className="space-y-5 pt-2">
      <p className="text-sm text-gray-600 mb-3">
        Tell us about your loved one's health to help us provide better care and conversations.
      </p>
      
      <div className="space-y-3">
        <Label htmlFor="generalHealth">How would you describe their general health?</Label>
        <Select 
          value={healthData.generalHealth} 
          onValueChange={(value) => updateHealthData("generalHealth", value)}
        >
          <SelectTrigger id="generalHealth">
            <SelectValue placeholder="Select general health status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">Excellent</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="hearingAbility">How well do they hear?</Label>
        <Select 
          value={healthData.hearingAbility} 
          onValueChange={(value) => updateHealthData("hearingAbility", value)}
        >
          <SelectTrigger id="hearingAbility">
            <SelectValue placeholder="Select hearing ability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">Excellent - No issues</SelectItem>
            <SelectItem value="good">Good - Minimal difficulties</SelectItem>
            <SelectItem value="fair">Fair - Some difficulties</SelectItem>
            <SelectItem value="poor">Poor - Significant hearing loss</SelectItem>
            <SelectItem value="very-poor">Very Poor - Severe hearing loss</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="forgetfulness">Do they tend to forget things?</Label>
        <Select 
          value={healthData.forgetfulness} 
          onValueChange={(value) => updateHealthData("forgetfulness", value)}
        >
          <SelectTrigger id="forgetfulness">
            <SelectValue placeholder="Select memory status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rarely">Rarely forgets anything</SelectItem>
            <SelectItem value="sometimes">Sometimes forgets minor things</SelectItem>
            <SelectItem value="often">Often forgets appointments/tasks</SelectItem>
            <SelectItem value="frequently">Frequently forgets important things</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label>Mental Wellbeing</Label>
        <p className="text-sm text-gray-500">How would you rate their mental wellbeing?</p>
        <div className="pt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Struggling</span>
            <span>Excellent</span>
          </div>
          <Slider
            value={[healthData.mentalState]}
            min={1}
            max={10}
            step={1}
            onValueChange={([value]) => updateHealthData("mentalState", value)}
            className="my-4"
          />
          <div className="text-center text-sm font-medium">
            {healthData.mentalState}/10
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Loneliness</Label>
        <p className="text-sm text-gray-500">How lonely do they seem to be?</p>
        <div className="pt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Very Lonely</span>
            <span>Very Social</span>
          </div>
          <Slider
            value={[healthData.loneliness]}
            min={1}
            max={10}
            step={1}
            onValueChange={([value]) => updateHealthData("loneliness", value)}
            className="my-4"
          />
          <div className="text-center text-sm font-medium">
            {healthData.loneliness}/10
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-100">
        <Label>Health Conditions</Label>
        <p className="text-sm text-gray-600">
          Select any health conditions they may have:
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          {conditions.map((condition) => (
            <Button 
              key={condition.id}
              type="button"
              variant={healthData.conditions?.includes(condition.id) ? "default" : "outline"}
              className={`justify-start h-auto py-2 px-3 ${
                healthData.conditions?.includes(condition.id) ? "bg-lovable-400" : ""
              }`}
              onClick={() => toggleCondition(condition.id)}
            >
              {condition.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="pt-2 space-y-2">
        <Label htmlFor="other-condition">Other condition (optional)</Label>
        <Input
          id="other-condition"
          placeholder="Enter any other condition"
          value={healthData.otherCondition || ""}
          onChange={(e) => updateHealthData("otherCondition", e.target.value)}
        />
      </div>

      <div className="pt-2 space-y-2">
        <Label htmlFor="health-notes">Additional notes (optional)</Label>
        <Textarea
          id="health-notes"
          placeholder="Any specific details about these conditions?"
          value={healthData.notes || ""}
          onChange={(e) => updateHealthData("notes", e.target.value)}
          className="min-h-[80px]"
        />
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        This information helps us adapt our conversations to be more supportive and relevant.
      </p>
    </div>
  );
};

export default HealthConditionsStep;
