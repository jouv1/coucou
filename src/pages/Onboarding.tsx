
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, ArrowRight, Check, 
  User, Pill, Clock, Bell,
  MessageSquare, Mic
} from "lucide-react";
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
    healthConditions: {
      mentalState: 5, // Scale of 1-10
      lowMentalStateReasons: [],
      conditions: [],
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
            className="bg-coucou-400 h-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      <Card className="mb-6 border-coucou-100 ios-card ios-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-coucou-100 p-2 rounded-md text-coucou-600">
              <IconComponent size={24} />
            </div>
            <div>
              <h2 className="text-xl font-medium text-coucou-800">
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
          className="flex-1 border-coucou-200 ios-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-coucou-400 hover:bg-coucou-500 text-white ios-button"
        >
          {isLastStep ? "Go to Dashboard" : "Continue"}
          {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
