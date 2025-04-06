
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
    <div className="min-h-screen w-full flex flex-col bg-background">
      <main className="flex-1 container max-w-md mx-auto px-4 pb-16 overflow-x-hidden">
        <div className="ios-blur fixed top-0 left-0 right-0 h-[env(safe-area-inset-top)] z-40"></div>
        <Outlet />
      </main>
      {showNavigation && <BottomNavigation />}
      <div className="ios-blur fixed bottom-0 left-0 right-0 h-[env(safe-area-inset-bottom)] z-40"></div>
    </div>
  );
};

export default Layout;
