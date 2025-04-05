
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface CallScheduleStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const CallScheduleStep = ({ data, updateData, stepId }: CallScheduleStepProps) => {
  const [schedule, setSchedule] = useState({
    frequency: data.callSchedule?.frequency || "daily",
    timePreference: data.callSchedule?.timePreference || "morning",
    specificDays: data.callSchedule?.specificDays || [],
  });

  const handleFrequencyChange = (value: string) => {
    const newSchedule = { ...schedule, frequency: value };
    setSchedule(newSchedule);
    updateData(stepId, newSchedule);
  };

  const handleTimeChange = (value: string) => {
    const newSchedule = { ...schedule, timePreference: value };
    setSchedule(newSchedule);
    updateData(stepId, newSchedule);
  };

  const toggleDay = (day: string) => {
    const updatedDays = schedule.specificDays.includes(day)
      ? schedule.specificDays.filter(d => d !== day)
      : [...schedule.specificDays, day];
    
    const newSchedule = { ...schedule, specificDays: updatedDays };
    setSchedule(newSchedule);
    updateData(stepId, newSchedule);
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label>Call Frequency</Label>
        <RadioGroup 
          value={schedule.frequency}
          onValueChange={handleFrequencyChange}
          className="space-y-2"
        >
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="daily" id="daily" />
            <div>
              <Label htmlFor="daily" className="font-medium">Daily Check-ins</Label>
              <p className="text-sm text-gray-500">Our AI will call once every day</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="weekdays" id="weekdays" />
            <div>
              <Label htmlFor="weekdays" className="font-medium">Weekdays Only</Label>
              <p className="text-sm text-gray-500">Monday through Friday check-ins</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="custom" id="custom" />
            <div>
              <Label htmlFor="custom" className="font-medium">Custom Schedule</Label>
              <p className="text-sm text-gray-500">Select specific days for calls</p>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      {schedule.frequency === "custom" && (
        <div className="space-y-3 animate-fade-in">
          <Label>Select days for calls</Label>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <Button
                key={day}
                type="button"
                variant={schedule.specificDays.includes(day) ? "default" : "outline"}
                className={`h-10 ${schedule.specificDays.includes(day) ? "bg-lovable-400" : ""}`}
                onClick={() => toggleDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-3 border-t pt-4">
        <Label>Preferred Time of Day</Label>
        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant={schedule.timePreference === "morning" ? "default" : "outline"}
            className={`flex flex-col items-center py-3 h-auto ${
              schedule.timePreference === "morning" ? "bg-lovable-400" : ""
            }`}
            onClick={() => handleTimeChange("morning")}
          >
            <Clock className="mb-1" size={18} />
            <span>Morning</span>
            <span className="text-xs opacity-70">8AM - 11AM</span>
          </Button>
          
          <Button
            type="button"
            variant={schedule.timePreference === "afternoon" ? "default" : "outline"}
            className={`flex flex-col items-center py-3 h-auto ${
              schedule.timePreference === "afternoon" ? "bg-lovable-400" : ""
            }`}
            onClick={() => handleTimeChange("afternoon")}
          >
            <Clock className="mb-1" size={18} />
            <span>Afternoon</span>
            <span className="text-xs opacity-70">12PM - 4PM</span>
          </Button>
          
          <Button
            type="button"
            variant={schedule.timePreference === "evening" ? "default" : "outline"}
            className={`flex flex-col items-center py-3 h-auto ${
              schedule.timePreference === "evening" ? "bg-lovable-400" : ""
            }`}
            onClick={() => handleTimeChange("evening")}
          >
            <Clock className="mb-1" size={18} />
            <span>Evening</span>
            <span className="text-xs opacity-70">5PM - 8PM</span>
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        We'll make calls at a consistent time within your selected time range.
      </p>
    </div>
  );
};

export default CallScheduleStep;
