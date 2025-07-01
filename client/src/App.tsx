import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppStateProvider } from "./hooks/useAppState";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Registration from "./pages/Registration";
import Scheduling from "./pages/Scheduling";
import Consultation from "./pages/Consultation";
import Dashboard from "./pages/Dashboard";
import KYC from "./pages/KYC";
import NurseForm from "./pages/NurseForm";
import RegistrationWeb from "@/pages/Registration-Web.tsx";
import AdminConfiguration from "@/pages/AdminConfiguration.tsx";
import ReceptionistPortal from "@/pages/ReceptionistPortal.tsx";
import DoctorAvailability from "@/pages/DoctorAvailability.tsx";
import EMRVisitNote from "@/pages/EMRVisitNote.tsx";
import ProfileSettings from "@/pages/ProfileSettings.tsx";
import NotificationsCenter from "@/pages/NotificationsCenter.tsx";
import PostVisitFeedback from "@/pages/PostVisitFeedback.tsx";
import SearchConsultation from "@/pages/SearchConsultation.tsx";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Registration} />
      <Route path="/registration" component={Registration} />
      <Route path="/registration-web" component={RegistrationWeb} />
      <Route path="/scheduling" component={Scheduling} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/kyc" component={KYC} />
      <Route path="/nurse-form" component={NurseForm} />

     <Route path="/receptionist" component={ReceptionistPortal} />
     <Route path="/doctor-availability" component={DoctorAvailability} />
     <Route path="/emr-visit-note" component={EMRVisitNote} />
     <Route path="/search-consultation" component={SearchConsultation} />
     <Route path="/profile-settings" component={ProfileSettings} />
     <Route path="/notifications" component={NotificationsCenter} />
     <Route path="/feedback" component={PostVisitFeedback} />
     <Route path="/admin" component={AdminConfiguration} />

    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppStateProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <MobileNav />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Router />
            </main>
            <Toaster />
          </div>
        </AppStateProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
