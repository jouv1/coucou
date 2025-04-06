
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
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
    callsPerDay: data.callSchedule?.callsPerDay || "one",
    timePreferences: data.callSchedule?.timePreferences || [],
    specificDays: data.callSchedule?.specificDays || [],
  });

  // Effect to limit time preferences based on calls per day
  useEffect(() => {
    let maxAllowedTimeSlots = 1;
    if (schedule.callsPerDay === "two") maxAllowedTimeSlots = 2;
    if (schedule.callsPerDay === "three") maxAllowedTimeSlots = 3;

    if (schedule.timePreferences.length > maxAllowedTimeSlots) {
      const limitedTimePreferences = schedule.timePreferences.slice(0, maxAllowedTimeSlots);
      setSchedule(prev => ({
        ...prev,
        timePreferences: limitedTimePreferences
      }));
      updateData(stepId, {
        ...schedule,
        timePreferences: limitedTimePreferences
      });
    }
  }, [schedule.callsPerDay, stepId, updateData]);

  const handleFrequencyChange = (value: string) => {
    const newSchedule = { ...schedule, frequency: value };
    setSchedule(newSchedule);
    updateData(stepId, newSchedule);
  };

  const handleCallsPerDayChange = (value: string) => {
    const newSchedule = { ...schedule, callsPerDay: value };
    setSchedule(newSchedule);
    updateData(stepId, newSchedule);
  };

  const toggleTimePreference = (time: string) => {
    let maxAllowedTimeSlots = 1;
    if (schedule.callsPerDay === "two") maxAllowedTimeSlots = 2;
    if (schedule.callsPerDay === "three") maxAllowedTimeSlots = 3;

    let updatedTimes = [...schedule.timePreferences];
    
    if (schedule.timePreferences.includes(time)) {
      // Remove the time if it's already selected
      updatedTimes = updatedTimes.filter(t => t !== time);
    } else {
      // Add time if we haven't reached the limit
      if (updatedTimes.length < maxAllowedTimeSlots) {
        updatedTimes = [...updatedTimes, time];
      } else {
        // Replace the first item if we're at the limit
        updatedTimes = [...updatedTimes.slice(1), time];
      }
    }
    
    const newSchedule = { ...schedule, timePreferences: updatedTimes };
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

  // Calculate max allowed time slots based on calls per day
  const maxAllowedTimeSlots = schedule.callsPerDay === "three" ? 3 : 
                              schedule.callsPerDay === "two" ? 2 : 1;

  const timeSlots = [
    { id: "early-morning", label: "Early Morning", time: "6AM - 8AM" },
    { id: "morning", label: "Morning", time: "8AM - 11AM" },
    { id: "noon", label: "Noon", time: "11AM - 1PM" },
    { id: "afternoon", label: "Afternoon", time: "1PM - 5PM" },
    { id: "evening", label: "Evening", time: "5PM - 8PM" },
    { id: "night", label: "Night", time: "8PM - 10PM" }
  ];

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-3">
        <Label>Call Frequency</Label>
        <div className="flex flex-col space-y-2">
          <Button
            type="button"
            variant="outline"
            className={`justify-start text-left h-auto py-2 ${
              schedule.frequency === "daily" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""
            }`}
            onClick={() => handleFrequencyChange("daily")}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Daily Check-ins</span>
              <span className="text-xs text-gray-500">Our AI will call every day</span>
            </div>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className={`justify-start text-left h-auto py-2 ${
              schedule.frequency === "weekdays" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""
            }`}
            onClick={() => handleFrequencyChange("weekdays")}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Weekdays Only</span>
              <span className="text-xs text-gray-500">Monday through Friday check-ins</span>
            </div>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className={`justify-start text-left h-auto py-2 ${
              schedule.frequency === "custom" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""
            }`}
            onClick={() => handleFrequencyChange("custom")}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Custom Schedule</span>
              <span className="text-xs text-gray-500">Select specific days for calls</span>
            </div>
          </Button>
        </div>
      </div>
      
      {schedule.frequency === "custom" && (
        <div className="space-y-3 animate-fade-in">
          <Label>Select days for calls</Label>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <Button
                key={day}
                type="button"
                variant="outline"
                size="sm"
                className={`${
                  schedule.specificDays.includes(day) 
                    ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" 
                    : ""
                }`}
                onClick={() => toggleDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-3 border-t pt-4">
        <Label>Calls Per Day</Label>
        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className={`${schedule.callsPerDay === "one" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleCallsPerDayChange("one")}
          >
            Once
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`${schedule.callsPerDay === "two" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleCallsPerDayChange("two")}
          >
            Twice
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`${schedule.callsPerDay === "three" ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" : ""}`}
            onClick={() => handleCallsPerDayChange("three")}
          >
            Three Times
          </Button>
        </div>
      </div>
      
      <div className="space-y-3 border-t pt-4">
        <Label>Preferred Times of Day</Label>
        <p className="text-sm text-gray-500 mb-2">
          {schedule.callsPerDay !== "one" 
            ? `Select up to ${maxAllowedTimeSlots} time slots based on your calls per day` 
            : "Select when the call should happen"}
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {timeSlots.map((slot) => (
            <Button
              key={slot.id}
              type="button"
              variant="outline"
              className={`flex flex-col items-center py-3 h-auto ${
                schedule.timePreferences.includes(slot.id) 
                ? "bg-[#e8f5f2] border-[#63BFAC] text-[#1F584D]" 
                : ""
              }`}
              onClick={() => toggleTimePreference(slot.id)}
              disabled={!schedule.timePreferences.includes(slot.id) && schedule.timePreferences.length >= maxAllowedTimeSlots}
            >
              <Clock className="mb-1" size={18} />
              <span>{slot.label}</span>
              <span className="text-xs opacity-70">{slot.time}</span>
            </Button>
          ))}
        </div>
        {schedule.timePreferences.length < 1 && (
          <p className="text-sm text-amber-600 mt-2">
            Please select at least one time slot
          </p>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        We'll make calls at a consistent time within your selected time ranges.
      </p>
    </div>
  );
};

export default CallScheduleStep;
