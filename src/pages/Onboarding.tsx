
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, ArrowRight, Check, 
  User, Heart, Pill, Clock, Bell
} from "lucide-react";
import AccountCreationStep from "@/components/onboarding/AccountCreationStep";
import BasicInfoStep from "@/components/onboarding/BasicInfoStep";
import HealthConditionsStep from "@/components/onboarding/HealthConditionsStep";
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
    id: "health-conditions",
    title: "Health Assessment",
    description: "Help us understand their health",
    icon: Heart,
    component: HealthConditionsStep,
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
    icon: User,
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
    title: "All Set!",
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
      interests: [],
      voiceNote: null,
      additionalInfo: "",
    },
    healthConditions: {
      generalHealth: "",
      hearingAbility: "",
      mentalState: 5, // Scale of 1-10
      forgetfulness: "",
      loneliness: 5, // Scale of 1-10
      conditions: [],
      notes: "",
    },
    medications: [],
    preferences: {
      voiceTone: "calm",
      topics: [],
      interestAreas: [],
      customVoice: "",
      callLength: "short",
      checkItems: [],
    },
    callSchedule: {
      frequency: "daily",
      timePreferences: [],
      specificDays: [],
    },
    notifications: {
      missedCall: true,
      lowSentiment: true,
      medication: true,
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
      // Submit data and navigate to dashboard
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
  
  // Get the current icon component
  const IconComponent = steps[currentStep].icon;

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-lovable-400 h-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Step content */}
      <Card className="mb-6 border-lovable-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-lovable-100 p-2 rounded-md text-lovable-600">
              <IconComponent size={24} />
            </div>
            <div>
              <h2 className="text-xl font-medium text-lovable-800">
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

      {/* Navigation buttons */}
      <div className="flex justify-between gap-3 mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex-1 border-lovable-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-lovable-400 hover:bg-lovable-500 text-white"
        >
          {isLastStep ? "Complete" : "Continue"}
          {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
