
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Calls from "./pages/Calls";
import CallDetails from "./pages/CallDetails";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Import settings pages
import ProfileSettings from "./pages/settings/ProfileSettings";
import LovedOneSettings from "./pages/settings/LovedOneSettings";
import HealthSettings from "./pages/settings/HealthSettings";
import MedicationSettings from "./pages/settings/MedicationSettings";
import CallTypeSettings from "./pages/settings/CallTypeSettings";
import ScheduleSettings from "./pages/settings/ScheduleSettings";
import NotificationSettings from "./pages/settings/NotificationSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
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

export default App;
