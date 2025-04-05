
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [localData, setLocalData] = useState<string[]>(data.healthConditions || []);
  const [otherCondition, setOtherCondition] = useState("");
  const [notes, setNotes] = useState("");

  const toggleCondition = (condition: string) => {
    setLocalData((prev) => {
      if (prev.includes(condition)) {
        return prev.filter((c) => c !== condition);
      } else {
        return [...prev, condition];
      }
    });
  };

  const handleUpdate = () => {
    let updatedConditions = [...localData];
    
    if (otherCondition.trim()) {
      updatedConditions.push(`other:${otherCondition}`);
    }
    
    updateData(stepId, updatedConditions);
  };

  const isConditionSelected = (id: string) => localData.includes(id);

  return (
    <div className="space-y-5 pt-2">
      <p className="text-sm text-gray-600 mb-3">
        Select any health conditions your loved one may have. This helps our AI adapt conversations accordingly.
      </p>
      
      <div className="space-y-3">
        {conditions.map((condition) => (
          <div key={condition.id} className="flex items-start space-x-3">
            <Checkbox 
              id={condition.id}
              checked={isConditionSelected(condition.id)}
              onCheckedChange={() => {
                toggleCondition(condition.id);
                handleUpdate();
              }}
            />
            <Label htmlFor={condition.id} className="text-sm leading-none pt-0.5">
              {condition.label}
            </Label>
          </div>
        ))}
      </div>
      
      <div className="pt-2 space-y-2">
        <Label htmlFor="other-condition">Other condition (optional)</Label>
        <Input
          id="other-condition"
          placeholder="Enter any other condition"
          value={otherCondition}
          onChange={(e) => {
            setOtherCondition(e.target.value);
            handleUpdate();
          }}
        />
      </div>

      <div className="pt-2 space-y-2">
        <Label htmlFor="notes">Additional notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any specific details about these conditions?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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
