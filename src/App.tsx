
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Calls from "./pages/Calls";
import CallDetails from "./pages/CallDetails";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Import settings pages
import ProfileSettings from "./pages/settings/ProfileSettings";
import LovedOneSettings from "./pages/settings/LovedOneSettings";
import HealthSettings from "./pages/settings/HealthSettings";
import MedicationSettings from "./pages/settings/MedicationSettings";
import CallTypeSettings from "./pages/settings/CallTypeSettings";
import ScheduleSettings from "./pages/settings/ScheduleSettings";
import NotificationSettings from "./pages/settings/NotificationSettings";

const queryClient = new QueryClient();

const App = () => {
  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful:', registration);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed:', error);
          });
      });
    }

    // Add meta theme-color for iOS PWA
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#63BFAC';
    document.head.appendChild(metaThemeColor);

    // Add apple-touch-icon for iOS
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = '/icons/icon-192x192.png';
    document.head.appendChild(appleTouchIcon);

    // Add manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    // Add apple-mobile-web-app-capable for iOS
    const mobileWebApp = document.createElement('meta');
    mobileWebApp.name = 'apple-mobile-web-app-capable';
    mobileWebApp.content = 'yes';
    document.head.appendChild(mobileWebApp);

    // Add apple-mobile-web-app-status-bar-style for iOS
    const statusBarStyle = document.createElement('meta');
    statusBarStyle.name = 'apple-mobile-web-app-status-bar-style';
    statusBarStyle.content = 'default';
    document.head.appendChild(statusBarStyle);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="auth" element={<Auth />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="calls" element={<Calls />} />
              <Route path="calls/:id" element={<CallDetails />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="settings" element={<Settings />} />
              
              {/* Settings SubPages */}
              <Route path="settings/profile" element={<ProfileSettings />} />
              <Route path="settings/loved-one" element={<LovedOneSettings />} />
              <Route path="settings/health" element={<HealthSettings />} />
              <Route path="settings/medications" element={<MedicationSettings />} />
              <Route path="settings/call-type" element={<CallTypeSettings />} />
              <Route path="settings/schedule" element={<ScheduleSettings />} />
              <Route path="settings/summary" element={<NotificationSettings />} />
              <Route path="settings/health-alerts" element={<NotificationSettings />} />
              <Route path="settings/missed-calls" element={<NotificationSettings />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
