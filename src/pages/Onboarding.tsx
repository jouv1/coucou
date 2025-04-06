
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, ArrowRight, Check, 
  User, Pill, Clock, Bell,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AccountCreationStep from "@/components/onboarding/AccountCreationStep";
import BasicInfoStep from "@/components/onboarding/BasicInfoStep";
import MedicationsStep from "@/components/onboarding/MedicationsStep";
import PreferencesStep from "@/components/onboarding/PreferencesStep";
import CallScheduleStep from "@/components/onboarding/CallScheduleStep";
import NotificationsStep from "@/components/onboarding/NotificationsStep";
import CompletionStep from "@/components/onboarding/CompletionStep";

const steps = [
  {
    id: "account-creation",
    title: "Create Your Account",
    description: "Tell us about yourself",
    icon: User,
    component: AccountCreationStep,
  },
  {
    id: "basic-info",
    title: "About Your Loved One",
    description: "Tell us about who you care for",
    icon: User,
    component: BasicInfoStep,
  },
  {
    id: "medications",
    title: "Medications",
    description: "Add medications that need monitoring",
    icon: Pill,
    component: MedicationsStep,
  },
  {
    id: "preferences",
    title: "Call Preferences",
    description: "Customize the conversation style",
    icon: MessageSquare,
    component: PreferencesStep,
  },
  {
    id: "schedule",
    title: "Call Schedule",
    description: "Set when calls should happen",
    icon: Clock,
    component: CallScheduleStep,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Choose your alert preferences",
    icon: Bell,
    component: NotificationsStep,
  },
  {
    id: "complete",
    title: "Ready to Go!",
    description: "You're ready to start",
    icon: Check,
    component: CompletionStep,
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, onboardingStep, setOnboardingStep } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    account: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
    basicInfo: {
      name: "",
      nickname: "",
      age: "",
      gender: "",
      relationship: "",
      photo: null,
      language: "",
    },
    medications: [],
    preferences: {
      callLength: "short",
      voiceGender: "female",
      customVoice: "",
      checkItems: ["medication", "mood", "sleep", "appointments"],
      customCheckItem: "",
    },
    callSchedule: {
      frequency: "daily",
      callsPerDay: "one",
      timePreferences: [],
      specificDays: [],
    },
    notifications: {
      callSummary: true,
      missedCall: true,
      lowSentiment: true,
      medication: false,
      sleep: false,
      appointments: false,
    },
  });

  // Check if user is authenticated and if onboardingStep is set
  useEffect(() => {
    if (user) {
      // Pre-fill some user data if available
      setFormData(prev => ({
        ...prev,
        account: {
          ...prev.account,
          fullName: user.user_metadata?.full_name || "",
          email: user.email || "",
        }
      }));
    }
    
    // If coming from email verification, skip to the appropriate step
    if (onboardingStep === "basic-info") {
      const stepIndex = steps.findIndex(step => step.id === "basic-info");
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
        // Reset the onboarding step to avoid unexpected redirects
        setOnboardingStep(null);
      }
    }
  }, [user, onboardingStep, setOnboardingStep]);
  
  // Redirect to auth if not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/auth');
        toast({
          title: "Authentication required",
          description: "Please sign in or create an account to continue with onboarding.",
        });
      }
    };
    
    checkAuth();
  }, [navigate]);

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/");
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  
  const IconComponent = steps[currentStep].icon;

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      <div className="mb-6">
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#63BFAC] h-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      <Card className="mb-6 border-[#63BFAC] border-opacity-30 ios-card ios-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#e8f5f2] p-2 rounded-md text-[#63BFAC]">
              <IconComponent size={24} />
            </div>
            <div>
              <h2 className="text-xl font-medium text-[#1F584D]">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>
          </div>
          <CurrentStepComponent
            data={formData}
            updateData={updateFormData}
            stepId={steps[currentStep].id}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between gap-3 mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex-1 border-[#63BFAC] text-[#1F584D] hover:bg-[#e8f5f2] ios-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-[#63BFAC] hover:bg-[#4da899] text-white ios-button"
        >
          {isLastStep ? "Go to Dashboard" : "Continue"}
          {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
