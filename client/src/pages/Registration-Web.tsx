import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Smartphone, UserPlus, Hospital, UserCheck, CalendarPlus, AlertTriangle } from "lucide-react";
import { useAppState } from "../hooks/useAppState";
import PhoneInput from "../components/PhoneInput";

export default function RegistrationWeb() {
  const [, setLocation] = useLocation();
  const { currentUser, setCurrentUser } = useAppState();
  const [registrationStep, setRegistrationStep] = useState<"otp" | "full-form" | "medical-center" | "dashboard">("otp");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    nationality: "JORDAN",
    nationalId: "",
    country: "",
    city: "",
  });


  const handleRegistrationSubmit = () => {
    setRegistrationStep("dashboard");
    const newUser = {
      id: 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      mrn: "00000000",
      nationality: formData.nationality,
      country: formData.country,
      city: formData.city,
      createdAt: new Date(),
    };
    
    setCurrentUser(newUser);
  };

  return (
    <div>

      <div className="grid lg:grid-cols-1 gap-8">

        {/* Medical Center Registration */}
        <Card className="shadow-neuro">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-warm-amber rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-neuro">
                <Hospital className="text-white text-2xl" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-black mb-2">Medical Center Registration</h3>
              <p className="text-gray-600 text-sm">Register with complete medical information</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input placeholder="John" className="rounded-xl" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="john@example.com" className="rounded-xl" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Surname</Label>
                  <Input placeholder="Doe" className="rounded-xl" />
                </div>
                <div>
                  <Label>Confirm Email</Label>
                  <Input type="email" placeholder="john@example.com" className="rounded-xl" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" className="rounded-xl" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" className="rounded-xl" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Gender</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="••••••••" className="rounded-xl" />
                </div>
              </div>
              
              <PhoneInput
                value=""
                onChange={() => {}}
                countryCode="+962"
                onCountryCodeChange={() => {}}
              />
              
              <div>
                <Label>Nationality</Label>
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JORDAN">JORDAN</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>
                  <span className="text-medical-red">*</span> National / Personal NO
                </Label>
                <Input placeholder="National ID Number" className="rounded-xl" />
                <p className="text-xs text-gray-500 mt-1">
                  To be activated in phase 2, to be filled and verified in phase by the medical center during the 1st consultation
                </p>
              </div>
              
              <div>
                <Label>Address</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Country" className="rounded-xl" />
                  <Input placeholder="City" className="rounded-xl" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="robot-check" />
                <Label htmlFor="robot-check" className="text-sm text-gray-700">I'm not a robot</Label>
              </div>
              
              <Button
                  onClick={handleRegistrationSubmit}
                  className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro">
                Register
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
