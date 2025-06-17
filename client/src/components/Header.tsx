import { useLocation } from "wouter";
import VHCCLogo from "./VHCCLogo";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { id: "registration", label: "Registration", path: "/registration" },
    { id: "registration", label: "Registration-Web", path: "/registration-web" },
    { id: "dashboard", label: "Dashboard", path: "/dashboard" },
    { id: "scheduling", label: "Scheduling", path: "/scheduling" },
    { id: "consultation", label: "Consultation", path: "/consultation" },
    { id: "kyc", label: "KYC", path: "/kyc" },
    { id: "nurse-form", label: "Nurs form", path: "/nurse-form" },
  ];

  return (
    <header className="bg-white shadow-neuro sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/*<VHCCLogo />*/}
          
          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => setLocation(item.path)}
                variant={location === item.path ? "default" : "ghost"}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
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
              {/*<div className="w-2 h-2 bg-healing-green rounded-full"></div>*/}
              <span className="text-sm text-gray-600">John Doe</span>
            </div>
            <div className="w-10 h-10 bg-trust-blue rounded-full flex items-center justify-center shadow-neuro">
              <User className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
