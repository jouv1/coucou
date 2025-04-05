
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import HealthConditionsStep from "@/components/onboarding/HealthConditionsStep";

const HealthSettings = () => {
  const [formData, setFormData] = useState({
    healthConditions: {
      generalHealth: "good",
      hearingAbility: "good",
      mentalState: 7,
      lowMentalStateReasons: [],
      forgetfulness: "sometimes",
      loneliness: 6,
      conditions: ["high-blood-pressure", "arthritis"],
    }
  });

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleSave = () => {
    // In a real app, this would save the updated health data
    alert("Health information updated successfully!");
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <Link to="/settings" className="inline-flex items-center text-lovable-600">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Settings
      </Link>
      
      <div>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Health Assessment</h1>
        <p className="text-gray-600">Update health information for your loved one</p>
      </div>
      
      <Card className="border-lovable-100">
        <CardHeader className="pb-0"></CardHeader>
        <CardContent className="pt-6">
          <HealthConditionsStep 
            data={formData}
            updateData={updateFormData}
            stepId="healthConditions"
          />
          
          <div className="mt-6 flex justify-end">
            <Button 
              className="bg-lovable-400 hover:bg-lovable-500 text-white"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthSettings;
