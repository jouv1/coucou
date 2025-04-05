
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const BasicInfoStep = ({ data, updateData, stepId }: BasicInfoStepProps) => {
  const [localData, setLocalData] = useState(data.basicInfo);

  const handleChange = (field: string, value: string) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    updateData(stepId, newData);
  };

  return (
    <div className="space-y-5 pt-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name of your loved one</Label>
        <Input
          id="name"
          placeholder="e.g. Mary Smith"
          value={localData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Select 
          value={localData.age} 
          onValueChange={(value) => handleChange("age", value)}
        >
          <SelectTrigger id="age">
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="60-65">60-65</SelectItem>
            <SelectItem value="66-70">66-70</SelectItem>
            <SelectItem value="71-75">71-75</SelectItem>
            <SelectItem value="76-80">76-80</SelectItem>
            <SelectItem value="81-85">81-85</SelectItem>
            <SelectItem value="86-90">86-90</SelectItem>
            <SelectItem value="91+">91+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label>Gender</Label>
        <RadioGroup 
          className="flex space-x-2"
          value={localData.gender}
          onValueChange={(value) => handleChange("gender", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="relationship">Relationship to you</Label>
        <Select 
          value={localData.relationship} 
          onValueChange={(value) => handleChange("relationship", value)}
        >
          <SelectTrigger id="relationship">
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="parent">Parent</SelectItem>
            <SelectItem value="grandparent">Grandparent</SelectItem>
            <SelectItem value="aunt-uncle">Aunt/Uncle</SelectItem>
            <SelectItem value="friend">Friend</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        This helps us personalize our AI's conversations with your loved one.
      </p>
    </div>
  );
};

export default BasicInfoStep;
