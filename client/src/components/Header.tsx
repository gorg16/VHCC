import { useLocation } from "wouter";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { id: "registration", label: "Registration", path: "/registration" },
    { id: "dashboard", label: "Dashboard", path: "/dashboard" },
    { id: "scheduling", label: "Scheduling", path: "/scheduling" },
    { id: "consultation", label: "Consultation", path: "/consultation" },
    { id: "feedback", label: "Feedback", path: "/feedback" },
    { id: "kyc", label: "KYC", path: "/kyc" },
    { id: "nurse-form", label: "Nurse Form", path: "/nurse-form" },
    { id: "admin", label: "Admin", path: "/admin" },
    // { id: "emr", label: "EMR", path: "/emr-visit-note" },
    { id: "search-consultation", label: "Search Consultation", path: "/search-consultation" },
    { id: "receptionist-portal", label: "Receptionist Portal", path: "/receptionist" },
    { id: "doctor-availability", label: "Doctor Availability", path: "/doctor-availability" },
    { id: "notifications", label: "Notifications Center", path: "/notifications" },
  ];

  // Split navigation items into two rows
  const firstRow = navItems.slice(0, 7);
  const secondRow = navItems.slice(7);

  return (
      <header className="bg-white shadow-neuro sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2">

            <div className="flex justify-center items-center mb-2">
              <nav className="hidden md:flex flex-wrap justify-center space-x-2">
                {firstRow.map((item) => (
                    <Button
                        key={item.id}
                        onClick={() => setLocation(item.path)}
                        variant={location === item.path ? "default" : "ghost"}
                        className={`px-3 py-1.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                            location === item.path
                                ? "bg-trust-blue text-white shadow-neuro"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {item.label}
                    </Button>
                ))}
              </nav>
            </div>

            {/* Second Row Navigation + User Profile */}
            <div className="flex justify-between items-center">
              <nav className="hidden md:flex flex-wrap space-x-2">
                {secondRow.map((item) => (
                    <Button
                        key={item.id}
                        onClick={() => setLocation(item.path)}
                        variant={location === item.path ? "default" : "ghost"}
                        className={`px-3 py-1.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                            location === item.path
                                ? "bg-trust-blue text-white shadow-neuro"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {item.label}
                    </Button>
                ))}
              </nav>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-2 h-2 bg-healing-green rounded-full"></div>
                  <span className="text-sm text-gray-600">John Doe</span>
                </div>
                <div className="w-10 h-10 bg-trust-blue rounded-full flex items-center justify-center shadow-neuro">
                  <User className="text-white" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}
