
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  timeOfDay: string;
  notes?: string;
}

const MedicationsStep = ({ data, updateData, stepId }: MedicationsStepProps) => {
  const [takesMedications, setTakesMedications] = useState(false);
  const [medications, setMedications] = useState<Medication[]>(data.medications || []);
  const [newMedName, setNewMedName] = useState("");
  const [newMedTime, setNewMedTime] = useState("morning");

  const handleRadioChange = (value: string) => {
    const takes = value === "yes";
    setTakesMedications(takes);
    if (!takes) {
      setMedications([]);
      updateData(stepId, []);
    }
  };

  const addMedication = () => {
    if (newMedName.trim()) {
      const newMed: Medication = {
        id: Date.now().toString(),
        name: newMedName,
        timeOfDay: newMedTime,
      };
      
      const updatedMeds = [...medications, newMed];
      setMedications(updatedMeds);
      updateData(stepId, updatedMeds);
      setNewMedName("");
    }
  };

  const removeMedication = (id: string) => {
    const updatedMeds = medications.filter((med) => med.id !== id);
    setMedications(updatedMeds);
    updateData(stepId, updatedMeds);
  };
  
  return (
    <div className="space-y-5 pt-2">
      <div className="space-y-3">
        <Label>Does your loved one take any medications regularly?</Label>
        <RadioGroup 
          className="flex space-x-4"
          value={takesMedications ? "yes" : "no"}
          onValueChange={handleRadioChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-meds" />
            <Label htmlFor="yes-meds">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-meds" />
            <Label htmlFor="no-meds">No</Label>
          </div>
        </RadioGroup>
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
                    className="flex items-center justify-between bg-lovable-50 p-3 rounded-md"
                  >
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-xs text-gray-600">
                        Taken in the {med.timeOfDay}
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
                placeholder="Medication name"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
              />
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={newMedTime === "morning" ? "default" : "outline"}
                  className={newMedTime === "morning" ? "bg-lovable-400" : ""}
                  onClick={() => setNewMedTime("morning")}
                >
                  Morning
                </Button>
                <Button
                  type="button"
                  variant={newMedTime === "afternoon" ? "default" : "outline"}
                  className={newMedTime === "afternoon" ? "bg-lovable-400" : ""}
                  onClick={() => setNewMedTime("afternoon")}
                >
                  Afternoon
                </Button>
                <Button
                  type="button"
                  variant={newMedTime === "evening" ? "default" : "outline"}
                  className={newMedTime === "evening" ? "bg-lovable-400" : ""}
                  onClick={() => setNewMedTime("evening")}
                >
                  Evening
                </Button>
              </div>
              
              <Button 
                onClick={addMedication} 
                disabled={!newMedName.trim()}
                className="mt-2"
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
