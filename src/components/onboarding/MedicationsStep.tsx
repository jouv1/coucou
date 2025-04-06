
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface MedicationsStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

interface Medication {
  id: string;
  name: string;
  timeOfDay: string[];
  notes?: string;
}

const MedicationsStep = ({ data, updateData, stepId }: MedicationsStepProps) => {
  const [takesMedications, setTakesMedications] = useState(data.medications && data.medications.length > 0);
  const [medications, setMedications] = useState<Medication[]>(data.medications || []);
  const [newMedName, setNewMedName] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handleMedicationChange = (value: string) => {
    const takes = value === "yes";
    setTakesMedications(takes);
    if (!takes) {
      setMedications([]);
      updateData(stepId, []);
    }
  };

  const generateMedName = (): string => {
    if (newMedName && newMedName.trim().length > 0) {
      return newMedName.trim();
    }
    
    if (selectedTimes.length === 1) {
      return `${selectedTimes[0].charAt(0).toUpperCase() + selectedTimes[0].slice(1)} Intake`;
    } else if (selectedTimes.length > 1) {
      return "Daily Medication";
    }
    
    return "Daily Intake";
  };

  const addMedication = () => {
    if (selectedTimes.length === 0) return;
    
    const newMed: Medication = {
      id: Date.now().toString(),
      name: generateMedName(),
      timeOfDay: selectedTimes,
    };
    
    const updatedMeds = [...medications, newMed];
    setMedications(updatedMeds);
    updateData(stepId, updatedMeds);
    
    // Reset form
    setNewMedName("");
    setSelectedTimes([]);
  };

  const removeMedication = (id: string) => {
    const updatedMeds = medications.filter((med) => med.id !== id);
    setMedications(updatedMeds);
    updateData(stepId, updatedMeds);
  };

  const toggleTimeOfDay = (time: string) => {
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time) 
        : [...prev, time]
    );
  };
  
  return (
    <div className="space-y-5 pt-2">
      <div className="space-y-3">
        <Label>Does your loved one take any medications regularly?</Label>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className={`flex-1 ${takesMedications ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleMedicationChange("yes")}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            className={`flex-1 ${!takesMedications ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleMedicationChange("no")}
          >
            No
          </Button>
        </div>
      </div>
      
      {takesMedications && (
        <div className="space-y-4 pt-2 animate-fade-in">
          <p className="text-sm text-gray-600">
            Add medications that the AI should check on during calls
          </p>
          
          {/* Medication list */}
          {medications.length > 0 && (
            <div className="space-y-2 mb-4">
              <Label>Current medications:</Label>
              <div className="space-y-2">
                {medications.map((med) => (
                  <div 
                    key={med.id} 
                    className="flex items-center justify-between bg-[#e8f5f2] p-3 rounded-md"
                  >
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-xs text-gray-600">
                        Taken: {med.timeOfDay.join(", ")}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMedication(med.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add medication form */}
          <div className="space-y-3 border-t pt-4">
            <Label htmlFor="med-name">Add a medication</Label>
            <div className="grid gap-3">
              <Input
                id="med-name"
                placeholder="Medication name (optional)"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
              />
              
              <Label>When is it taken?</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={selectedTimes.includes("morning") ? "default" : "outline"}
                  className={selectedTimes.includes("morning") ? "bg-[#63BFAC] hover:bg-[#4da899] text-white" : ""}
                  onClick={() => toggleTimeOfDay("morning")}
                >
                  Morning
                </Button>
                <Button
                  type="button"
                  variant={selectedTimes.includes("afternoon") ? "default" : "outline"}
                  className={selectedTimes.includes("afternoon") ? "bg-[#63BFAC] hover:bg-[#4da899] text-white" : ""}
                  onClick={() => toggleTimeOfDay("afternoon")}
                >
                  Afternoon
                </Button>
                <Button
                  type="button"
                  variant={selectedTimes.includes("evening") ? "default" : "outline"}
                  className={selectedTimes.includes("evening") ? "bg-[#63BFAC] hover:bg-[#4da899] text-white" : ""}
                  onClick={() => toggleTimeOfDay("evening")}
                >
                  Evening
                </Button>
              </div>
              
              <Button 
                onClick={addMedication} 
                disabled={selectedTimes.length === 0}
                className="mt-2 bg-[#63BFAC] hover:bg-[#4da899] text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Medication
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        Our AI will gently check if medications have been taken during each call.
      </p>
    </div>
  );
};

export default MedicationsStep;
