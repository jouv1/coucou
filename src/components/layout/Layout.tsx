
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const Layout = () => {
  const location = useLocation();
  const isOnboarding = location.pathname === "/onboarding";
  const isIndex = location.pathname === "/";
  
  // Hide navigation on landing page and onboarding
  const showNavigation = !isIndex && !isOnboarding;

  return (
    <div className="min-h-screen w-full flex flex-col bg-background pt-safe">
      <main className="flex-1 container max-w-md mx-auto px-4 pb-16 overflow-auto">
        <Outlet />
      </main>
      {showNavigation && (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-background/60 border-t border-white/10 pb-safe">
          <BottomNavigation />
        </div>
      )}
    </div>
  );
};

export default Layout;
