import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";

interface BasicInfoStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const BasicInfoStep = ({ data, updateData, stepId }: BasicInfoStepProps) => {
  const [localData, setLocalData] = useState(data.basicInfo || {
    name: "",
    nickname: "",
    age: "",
    gender: "",
    relationship: "",
    photo: null,
    language: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    updateData(stepId, newData);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const photoUrl = URL.createObjectURL(file);
      setPreviewUrl(photoUrl);
      
      const newData = { ...localData, photo: file };
      setLocalData(newData);
      updateData(stepId, newData);
    }
  };

  const handleGenderSelect = (gender: string) => {
    handleChange("gender", gender);
  };

  return (
    <div className="space-y-5 pt-2">
      <div className="flex justify-center mb-6">
        <label htmlFor="photo-upload" className="cursor-pointer">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-[#63BFAC]">
              {previewUrl ? (
                <AvatarImage src={previewUrl} alt="Profile picture" />
              ) : (
                <AvatarFallback className="bg-[#e8f5f2]">
                  <User size={36} className="text-[#63BFAC]" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-[#63BFAC] text-white p-2 rounded-full hover:bg-[#4da899]">
              <Camera size={16} />
            </div>
          </div>
          <input 
            id="photo-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name of your loved one</Label>
        <Input
          id="name"
          placeholder="e.g. Mary Smith"
          value={localData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nickname">Nickname (optional)</Label>
        <Input
          id="nickname"
          placeholder="What do you call them?"
          value={localData.nickname || ""}
          onChange={(e) => handleChange("nickname", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Select 
          value={localData.age || ""} 
          onValueChange={(value) => handleChange("age", value)}
        >
          <SelectTrigger id="age">
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25-35">25-35</SelectItem>
            <SelectItem value="30-40">30-40</SelectItem>
            <SelectItem value="35-45">35-45</SelectItem>
            <SelectItem value="45-55">45-55</SelectItem>
            <SelectItem value="55-65">55-65</SelectItem>
            <SelectItem value="60-65">60-65</SelectItem>
            <SelectItem value="65-75">65-75</SelectItem>
            <SelectItem value="66-70">66-70</SelectItem>
            <SelectItem value="70-80">70-80</SelectItem>
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
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className={`h-10 ${localData.gender === "female" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleGenderSelect("female")}
          >
            Female
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`h-10 ${localData.gender === "male" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleGenderSelect("male")}
          >
            Male
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">Language Spoken</Label>
        <Select 
          value={localData.language || ""} 
          onValueChange={(value) => handleChange("language", value)}
        >
          <SelectTrigger id="language">
            <SelectValue placeholder="Select their primary language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="german">German</SelectItem>
            <SelectItem value="italian">Italian</SelectItem>
            <SelectItem value="portuguese">Portuguese</SelectItem>
            <SelectItem value="mandarin">Mandarin</SelectItem>
            <SelectItem value="japanese">Japanese</SelectItem>
            <SelectItem value="arabic">Arabic</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="relationship">Relationship to you</Label>
        <Select 
          value={localData.relationship || ""} 
          onValueChange={(value) => handleChange("relationship", value)}
        >
          <SelectTrigger id="relationship">
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Parent">Parent</SelectItem>
            <SelectItem value="Grandparent">Grandparent</SelectItem>
            <SelectItem value="Spouse">Spouse</SelectItem>
            <SelectItem value="Sibling">Sibling</SelectItem>
            <SelectItem value="Aunt/Uncle">Aunt/Uncle</SelectItem>
            <SelectItem value="Friend">Friend</SelectItem>
            <SelectItem value="Self">Self</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasicInfoStep;
