
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface AccountCreationStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const AccountCreationStep = ({ data, updateData, stepId }: AccountCreationStepProps) => {
  const [accountData, setAccountData] = useState(data.account || {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    language: "en",
  });

  const handleChange = (field: string, value: string) => {
    const updatedData = { ...accountData, [field]: value };
    setAccountData(updatedData);
    updateData(stepId, updatedData);
  };

  return (
    <div className="space-y-5 pt-2">
      <div className="bg-lovable-50 p-3 rounded-md flex items-start gap-3 mb-4">
        <AlertCircle className="text-lovable-600 mt-0.5" size={18} />
        <p className="text-sm text-gray-600">
          Let's set up <strong>your account</strong> first. You'll add information about your loved one in the next steps.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fullName">Your Full Name</Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          value={accountData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={accountData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="Your phone number"
          value={accountData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="language">Preferred Language</Label>
        <Select 
          value={accountData.language} 
          onValueChange={(value) => handleChange("language", value)}
        >
          <SelectTrigger id="language">
            <SelectValue placeholder="Select your preferred language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="it">Italian</SelectItem>
            <SelectItem value="pt">Portuguese</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a secure password"
          value={accountData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={accountData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        Your information is secure and will only be used to provide you with the Bisous service.
      </p>
    </div>
  );
};

export default AccountCreationStep;
