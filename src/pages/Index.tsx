
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Heart, Bell } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-lovable-50 to-lovable-100 dark:from-lovable-800 dark:to-lovable-900">
      <div className="w-full max-w-md space-y-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-light text-lovable-800 dark:text-lovable-50 mb-3">Coucou</h1>
          <p className="text-xl text-lovable-600 dark:text-lovable-200 font-light">
            AI-powered check-ins for your loved ones
          </p>
        </div>
        
        <div className="space-y-6 pt-4">
          <div className="neumorphic-light dark:neumorphic-dark p-5">
            <div className="flex items-start gap-4">
              <div className="text-lovable-600 dark:text-lovable-300">
                <Phone size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-lg font-normal text-lovable-800 dark:text-lovable-50 mb-2">Daily AI Check-ins</h2>
                <p className="text-lovable-600 dark:text-lovable-300 text-sm leading-relaxed">
                  Our AI makes natural-sounding calls to check on your loved ones daily, ensuring they're well and safe.
                </p>
              </div>
            </div>
          </div>
          
          <div className="neumorphic-light dark:neumorphic-dark p-5">
            <div className="flex items-start gap-4">
              <div className="text-lovable-600 dark:text-lovable-300">
                <Heart size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-lg font-normal text-lovable-800 dark:text-lovable-50 mb-2">Health Monitoring</h2>
                <p className="text-lovable-600 dark:text-lovable-300 text-sm leading-relaxed">
                  Track medication adherence, sleep quality, and overall well-being with insightful dashboards.
                </p>
              </div>
            </div>
          </div>
          
          <div className="neumorphic-light dark:neumorphic-dark p-5">
            <div className="flex items-start gap-4">
              <div className="text-lovable-600 dark:text-lovable-300">
                <Bell size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-lg font-normal text-lovable-800 dark:text-lovable-50 mb-2">Peace of Mind</h2>
                <p className="text-lovable-600 dark:text-lovable-300 text-sm leading-relaxed">
                  Get notifications only when they matter, so you can stay connected without constant worry.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col gap-4">
          <Button 
            onClick={() => navigate("/onboarding")}
            className="w-full py-6 bg-lovable-800 hover:bg-lovable-700 text-lovable-50 dark:bg-lovable-50 dark:hover:bg-lovable-100 dark:text-lovable-800"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            className="w-full py-6 border-lovable-300 text-lovable-600 hover:bg-lovable-100 dark:border-lovable-600 dark:text-lovable-300 dark:hover:bg-lovable-700"
            onClick={() => navigate("/dashboard")}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
