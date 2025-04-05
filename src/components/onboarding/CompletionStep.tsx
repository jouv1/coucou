
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletionStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const CompletionStep = ({ data }: CompletionStepProps) => {
  const handleTestCall = () => {
    // In a real implementation, this would initiate a test call
    alert("This would initiate a test call to you, not your loved one.");
  };
  
  return (
    <div className="text-center space-y-6 py-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-lovable-100 p-3">
          <div className="rounded-full bg-lovable-400 p-3">
            <Check className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-medium text-lovable-700">Ready to Go!</h3>
        <p className="text-gray-600">
          We've configured everything to start checking in with {data.basicInfo?.name || "your loved one"}
        </p>
      </div>
      
      <div className="bg-lovable-50 rounded-lg p-4 space-y-4 text-left">
        <h4 className="font-medium text-lovable-600">What happens next?</h4>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="bg-lovable-100 text-lovable-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">1</span>
            </div>
            <p className="text-sm">
              Our AI will call {data.basicInfo?.name || "your loved one"} at the scheduled times to check how they're doing.
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="bg-lovable-100 text-lovable-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">2</span>
            </div>
            <p className="text-sm">
              You'll receive notifications based on your preferences and can view all reports in the dashboard.
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="bg-lovable-100 text-lovable-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">3</span>
            </div>
            <p className="text-sm">
              You can update settings, add appointments, or make changes anytime from your dashboard.
            </p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleTestCall}
        className="bg-lovable-400 hover:bg-lovable-500 text-white flex items-center gap-2"
      >
        <Phone size={16} />
        Call My Number
      </Button>
      <p className="text-xs text-gray-500">
        This is a test call that will call you, not your loved one
      </p>
    </div>
  );
};

export default CompletionStep;
