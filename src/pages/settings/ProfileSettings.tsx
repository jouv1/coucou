
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import AccountCreationStep from "@/components/onboarding/AccountCreationStep";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    account: {
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      password: "••••••••",
    }
  });

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleSave = () => {
    // In a real app, this would save the updated profile data
    alert("Profile updated successfully!");
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <Link to="/settings" className="inline-flex items-center text-lovable-600">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Settings
      </Link>
      
      <div>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Personal Information</h1>
        <p className="text-gray-600">Update your account details</p>
      </div>
      
      <Card className="border-lovable-100">
        <CardHeader className="pb-0"></CardHeader>
        <CardContent className="pt-6">
          <AccountCreationStep 
            data={formData}
            updateData={updateFormData}
            stepId="account"
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

export default ProfileSettings;
