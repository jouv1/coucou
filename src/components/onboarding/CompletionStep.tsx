
import { Check } from "lucide-react";

interface CompletionStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
  stepId: string;
}

const CompletionStep = ({ data }: CompletionStepProps) => {
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
        <h3 className="text-xl font-medium text-lovable-700">You're all set!</h3>
        <p className="text-gray-600">
          We've configured everything to start checking in with {data.basicInfo.name || "your loved one"}
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
              Our AI will call {data.basicInfo.name || "your loved one"} at the scheduled times to check how they're doing.
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
      
      <p className="text-sm text-muted-foreground italic">
        We're here to help you stay connected with your loved one. Click "Complete" to go to your dashboard.
      </p>
    </div>
  );
};

export default CompletionStep;
