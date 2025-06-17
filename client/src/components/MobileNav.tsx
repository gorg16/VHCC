import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function MobileNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { id: "registration", label: "Registration", path: "/registration" },
    { id: "dashboard", label: "Dashboard", path: "/dashboard" },
    { id: "scheduling", label: "Scheduling", path: "/scheduling" },
    { id: "consultation", label: "Consultation", path: "/consultation" },
    { id: "kyc", label: "KYC", path: "/kyc" },
  ];

  return (
    <div className="md:hidden bg-white border-b border-gray-100">
      <div className="flex space-x-1 p-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => setLocation(item.path)}
            variant="ghost"
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              location === item.path
                ? "bg-trust-blue text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
