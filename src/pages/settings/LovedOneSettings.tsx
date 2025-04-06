
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import BasicInfoStep from "@/components/onboarding/BasicInfoStep";
import HealthConditionsStep from "@/components/onboarding/HealthConditionsStep";
import MedicationsStep from "@/components/onboarding/MedicationsStep";
import { toast } from "@/hooks/use-toast";

const LovedOneSettings = () => {
  const [formData, setFormData] = useState({
    basicInfo: {
      name: "Mary Johnson",
      nickname: "Mom",
      age: "76-80",
      gender: "female",
      relationship: "parent",
      photo: null,
      language: "english",
    },
    healthConditions: {
      generalHealth: "good",
      hearingAbility: "good",
      mentalState: 7,
      lowMentalStateReasons: [],
      forgetfulness: "sometimes",
      loneliness: 6,
      conditions: ["high-blood-pressure", "arthritis"],
    },
    medications: [
      {
        id: "1",
        name: "Blood Pressure Medication",
        timeOfDay: ["morning", "evening"],
      },
      {
        id: "2",
        name: "Pain Reliever",
        timeOfDay: ["afternoon"],
      }
    ]
  });

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleSave = () => {
    // In a real app, this would save the updated loved one data
    toast({
      title: "Information updated",
      description: "Your loved one's information has been updated successfully!",
    });
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <Link to="/settings" className="inline-flex items-center text-lovable-600">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Settings
      </Link>
      
      <div>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Loved One Personal Information</h1>
        <p className="text-gray-600">Update information about your loved one</p>
      </div>
      
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Basic Information</h2>
        </CardHeader>
        <CardContent>
          <BasicInfoStep 
            data={formData}
            updateData={updateFormData}
            stepId="basicInfo"
          />
        </CardContent>
      </Card>
      
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Health Conditions</h2>
        </CardHeader>
        <CardContent>
          <HealthConditionsStep 
            data={formData}
            updateData={updateFormData}
            stepId="healthConditions"
          />
        </CardContent>
      </Card>
      
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Medications</h2>
        </CardHeader>
        <CardContent>
          <MedicationsStep 
            data={formData}
            updateData={updateFormData}
            stepId="medications"
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

export default LovedOneSettings;
