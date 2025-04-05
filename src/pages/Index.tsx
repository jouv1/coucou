
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Heart, Bell } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-lovable-600 mb-2">Bisous</h1>
          <p className="text-xl text-lovable-800 mb-6">AI-powered check-ins for your loved ones</p>
        </div>
        
        <div className="space-y-4 pt-4">
          <div className="bg-white p-5 rounded-xl shadow-md border border-lovable-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Phone size={20} />
              </div>
              <div>
                <h2 className="text-lg font-medium text-lovable-700 mb-2">Daily AI Check-ins</h2>
                <p className="text-gray-600">
                  Our AI makes natural-sounding calls to check on your loved ones daily, ensuring they're well and safe.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-md border border-lovable-100">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-600">
                <Heart size={20} />
              </div>
              <div>
                <h2 className="text-lg font-medium text-lovable-700 mb-2">Health Monitoring</h2>
                <p className="text-gray-600">
                  Track medication adherence, sleep quality, and overall well-being with insightful dashboards.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-md border border-lovable-100">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <Bell size={20} />
              </div>
              <div>
                <h2 className="text-lg font-medium text-lovable-700 mb-2">Peace of Mind</h2>
                <p className="text-gray-600">
                  Get notifications only when they matter, so you can stay connected without constant worry.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 flex flex-col gap-4">
          <Button 
            onClick={() => navigate("/onboarding")}
            className="w-full bg-lovable-400 hover:bg-lovable-500 text-white py-6"
          >
            Get Started
          </Button>
          <div className="flex gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1 border-lovable-300 text-lovable-600 hover:bg-lovable-50"
              onClick={() => navigate("/dashboard")}
            >
              See Demo
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-lovable-300 text-lovable-600 hover:bg-lovable-50"
              onClick={() => navigate("/onboarding")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
