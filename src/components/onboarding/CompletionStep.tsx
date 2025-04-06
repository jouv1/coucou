
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface CompletionStepProps {
  data: any;
}

const CompletionStep = ({ data }: CompletionStepProps) => {
  const { user } = useAuth();
  
  const handleTestCall = () => {
    toast({
      title: "Test Call Initiated",
      description: "This would call your number in a real implementation.",
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-600">
        Great job setting up Coucou 🫶🏼! We're ready to start checking in on {data.basicInfo?.name || "your loved one"}.
      </p>
      
      <div className="text-center">
        <h3 className="font-medium text-lg mb-2">Next Steps</h3>
        <ol className="text-left list-decimal pl-5 space-y-2 mb-6">
          <li>We'll start calling based on the schedule you provided.</li>
          <li>You'll receive notifications about the calls based on your preferences.</li>
          <li>You can always adjust settings from the dashboard.</li>
        </ol>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleTestCall} 
          className="bg-[#63BFAC] hover:bg-[#4da899] text-white"
        >
          <Phone className="mr-2 h-4 w-4" />
          Call My Number
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-500">
        This is a test call that will call you, not your loved one.
      </p>
    </div>
  );
};

export default CompletionStep;
