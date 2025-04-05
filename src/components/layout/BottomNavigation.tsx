
import { Link, useLocation } from "react-router-dom";
import { Home, Settings, MessageSquare, Bell } from "lucide-react";
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
      icon: Bell,
      path: "/settings",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-lovable-50 border-t border-lovable-100 z-10 h-16 shadow-soft dark:bg-lovable-800 dark:border-lovable-700">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-4 h-full",
              currentPath === item.path ? "text-lovable-300" : "text-lovable-600 dark:text-lovable-400"
            )}
          >
            {item.primary ? (
              <div className="bg-lovable-300 text-lovable-800 dark:bg-lovable-300 dark:text-lovable-800 p-3 rounded-full -mt-6 shadow-md">
                <item.icon size={24} />
              </div>
            ) : (
              <item.icon
                size={24}
                className={cn(
                  currentPath === item.path ? "text-lovable-300" : "text-lovable-600 dark:text-lovable-400"
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
