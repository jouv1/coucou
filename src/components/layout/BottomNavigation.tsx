
import { Link, useLocation } from "react-router-dom";
import { Home, Settings, MessageSquare, Calendar, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      label: "Calls",
      icon: MessageSquare,
      path: "/calls",
    },
    {
      label: "🫶🏼",
      icon: Home,
      path: "/dashboard",
      primary: true,
    },
    {
      label: "Alerts",
      icon: Bell,
      path: "/settings",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-10 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-4 h-full",
              currentPath === item.path ? "text-coucou-800" : "text-gray-400"
            )}
          >
            {item.primary ? (
              <div className="bg-coucou-800 text-white p-3 rounded-full -mt-6 shadow-md flex items-center justify-center">
                <span className="text-xl">{item.label}</span>
              </div>
            ) : (
              <item.icon
                size={24}
                className={cn(
                  currentPath === item.path ? "text-coucou-800" : "text-gray-400"
                )}
              />
            )}
            {!item.primary && <span className="text-xs mt-1">{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
