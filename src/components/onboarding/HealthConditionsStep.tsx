
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface HealthConditionsStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const HealthConditionsStep = ({ data, updateData, stepId }: HealthConditionsStepProps) => {
  const [healthData, setHealthData] = useState(data.healthConditions || {
    mentalState: 5,
    lowMentalStateReasons: [],
    conditions: [],
  });

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
      <div className="space-y-3 border-t pt-4">
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Health Conditions</h3>
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
    </div>
  );
};

export default HealthConditionsStep;
