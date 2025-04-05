
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User, Mic, Square, CheckSquare } from "lucide-react";

interface BasicInfoStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const BasicInfoStep = ({ data, updateData, stepId }: BasicInfoStepProps) => {
  const [localData, setLocalData] = useState(data.basicInfo);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

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

  const toggleRecording = () => {
    // This would actually start/stop recording with the Web Audio API
    setIsRecording(!isRecording);
    
    // For demo purposes, just toggle the state
    if (isRecording) {
      // In a real implementation, we would save the recording
      const newData = { ...localData, voiceNote: "recording-file.mp3" };
      setLocalData(newData);
      updateData(stepId, newData);
    }
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = localData.interests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i: string) => i !== interest)
      : [...currentInterests, interest];
    
    const newData = { ...localData, interests: updatedInterests };
    setLocalData(newData);
    updateData(stepId, newData);
  };

  // Common interest topics
  const interestTopics = [
    "Family", "Weather", "History", "Music", "Books",
    "Cooking", "Gardening", "Travel", "Sports", "Politics",
    "Health", "Technology", "Nature", "Art", "Television"
  ];

  return (
    <div className="space-y-5 pt-2">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-lovable-200">
            {previewUrl ? (
              <AvatarImage src={previewUrl} alt="Profile picture" />
            ) : (
              <AvatarFallback className="bg-lovable-50">
                <User size={36} className="text-lovable-300" />
              </AvatarFallback>
            )}
          </Avatar>
          <label htmlFor="photo-upload" className="absolute -bottom-2 -right-2 bg-lovable-400 text-white p-2 rounded-full cursor-pointer hover:bg-lovable-500">
            <Camera size={16} />
            <input 
              id="photo-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handlePhotoChange}
            />
          </label>
        </div>
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
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className={`h-12 ${localData.gender === "female" ? "bg-lovable-100 border-lovable-300 text-lovable-700" : ""}`}
            onClick={() => handleGenderSelect("female")}
          >
            Female
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`h-12 ${localData.gender === "male" ? "bg-lovable-100 border-lovable-300 text-lovable-700" : ""}`}
            onClick={() => handleGenderSelect("male")}
          >
            Male
          </Button>
        </div>
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
            <SelectItem value="parent">Parent</SelectItem>
            <SelectItem value="grandparent">Grandparent</SelectItem>
            <SelectItem value="aunt-uncle">Aunt/Uncle</SelectItem>
            <SelectItem value="friend">Friend</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-100">
        <Label>Voice Note About Your Loved One (optional)</Label>
        <p className="text-sm text-gray-500 mb-2">
          Record yourself speaking about your loved one to help us understand their personality better
        </p>
        <Button 
          type="button" 
          variant={isRecording ? "destructive" : "outline"}
          className="w-full flex items-center gap-2"
          onClick={toggleRecording}
        >
          <Mic size={18} />
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        {localData.voiceNote && !isRecording && (
          <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
            <CheckSquare size={16} />
            Voice note recorded
          </div>
        )}
      </div>

      <div className="space-y-3 pt-3">
        <Label>Areas of Interest</Label>
        <p className="text-sm text-gray-500 mb-2">
          Select topics that your loved one enjoys talking about
        </p>
        <div className="flex flex-wrap gap-2">
          {interestTopics.map((topic) => (
            <Button
              key={topic}
              type="button"
              variant="outline"
              size="sm"
              className={`mb-1 ${
                (localData.interests || []).includes(topic) 
                  ? "bg-lovable-100 border-lovable-300 text-lovable-700" 
                  : "bg-white"
              }`}
              onClick={() => handleInterestToggle(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2 pt-4">
        <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
        <textarea
          id="additionalInfo"
          className="min-h-[100px] w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lovable-400"
          placeholder="Share any additional information about your loved one that might help us provide better care..."
          value={localData.additionalInfo || ""}
          onChange={(e) => handleChange("additionalInfo", e.target.value)}
        ></textarea>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        This information helps us personalize our AI's conversations with your loved one.
      </p>
    </div>
  );
};

export default BasicInfoStep;
