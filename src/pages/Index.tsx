
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Heart, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-coucou-600 mb-2">Coucou 🫶🏼</h1>
          <p className="text-xl text-coucou-800 mb-6">Technology that <span className="font-bold">cares</span> like you do</p>
        </div>
        
        <div className="space-y-4 pt-4">
          <div className="bg-white p-5 ios-card ios-shadow">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Phone size={20} />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-medium text-coucou-700 mb-2">Daily AI Check-ins</h2>
                <p className="text-gray-600">
                  Our AI makes natural-sounding calls to check on your loved ones daily, ensuring they're well and safe.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 ios-card ios-shadow">
            <div className="flex items-start gap-3">
              <div className="bg-coucou-100 p-2 rounded-lg text-coucou-600">
                <Heart size={20} />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-medium text-coucou-700 mb-2">Health Monitoring</h2>
                <p className="text-gray-600">
                  Track medication adherence, sleep quality, and overall well-being with insightful dashboards.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 ios-card ios-shadow">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <Bell size={20} />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-medium text-coucou-700 mb-2">Peace of Mind</h2>
                <p className="text-gray-600">
                  Get notifications only when they matter, so you can stay connected without constant worry.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 text-center">
          <p className="text-gray-600 italic mb-6">"It's not just a check-in call. It's peace of mind"</p>
        </div>
        
        <div className="pt-2 flex flex-col gap-4">
          <Button 
            onClick={() => navigate("/auth?mode=signup")}
            className="w-full bg-[#63BFAC] hover:bg-[#4da899] text-white py-6 ios-button"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-[#63BFAC] text-[#1F584D] hover:bg-[#e8f5f2] ios-button"
            onClick={() => navigate("/auth")}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
