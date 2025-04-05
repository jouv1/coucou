
import { Link, useLocation } from "react-router-dom";
import { Home, Settings, MessageSquare } from "lucide-react";
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
      label: "Home",
      icon: Home,
      path: "/dashboard",
      primary: true,
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 h-16">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-4 h-full",
              currentPath === item.path ? "text-lovable-500" : "text-gray-500"
            )}
          >
            {item.primary ? (
              <div className="bg-lovable-400 text-white p-3 rounded-full -mt-6 shadow-md">
                <item.icon size={24} />
              </div>
            ) : (
              <item.icon
                size={24}
                className={cn(
                  currentPath === item.path ? "text-lovable-500" : "text-gray-500"
                )}
              />
            )}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
