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

export default function Registration() {
  const [, setLocation] = useLocation();
  const { currentUser, setCurrentUser } = useAppState();
  const [registrationStep, setRegistrationStep] = useState<"otp" | "full-form" | "medical-center" | "dashboard">("otp");
  const [otpCode, setOtpCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+962");

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

  const handleOtpSubmit = () => {
    if (otpCode.length === 6) {
      setRegistrationStep("full-form");
    }
  };

  const handleRegistrationSubmit = () => {
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
    setRegistrationStep("dashboard");
  };

  return (
    <div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* OTP Verification */}
        {registrationStep === "otp" && (
          <Card className="shadow-neuro">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-trust-blue rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-neuro">
                  <Smartphone className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-black mb-2">Mobile Verification</h3>
                <p className="text-gray-600 text-sm">Enter your mobile number to receive OTP</p>
              </div>

              <div className="space-y-6">
                <PhoneInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  countryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                />
                
                <Button className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro">
                  Get OTP Code
                </Button>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP Code</Label>
                  <Input
                    type="text"
                    placeholder="- - - - - -"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="text-center text-lg tracking-widest rounded-xl"
                    maxLength={6}
                  />
                </div>
                
                <Button
                  onClick={handleOtpSubmit}
                  className="w-full bg-healing-green hover:bg-green-600 rounded-xl shadow-neuro"
                >
                  Verify & Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Full Registration Form */}
        {registrationStep === "full-form" && (
          <Card className="shadow-neuro">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-healing-green rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-neuro">
                  <UserPlus className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-black mb-2">Complete Registration</h3>
                <p className="text-gray-600 text-sm">Fill in your personal information</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Surname</Label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="rounded-xl"
                  />
                </div>
                
                <div>
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Confirm Email</Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.confirmEmail}
                      onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleRegistrationSubmit}
                  className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro"
                >
                  Register
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Patient Dashboard */}
        {registrationStep === "dashboard" && currentUser && (
          <Card className="shadow-neuro">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-healing-green rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-neuro">
                  <UserCheck className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-black mb-2">Welcome, {currentUser.firstName}!</h3>
                <p className="text-gray-600 text-sm">Your registration is complete</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-medium text-gray-700 mb-2">Patient Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Patient Name:</span>
                      <span className="font-medium">{currentUser.firstName} {currentUser.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">MRN:</span>
                      <span className="font-medium">{currentUser.mrn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">35</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{currentUser.gender}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setLocation("/dashboard")}
                  className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro flex items-center justify-center space-x-2"
                >
                  <CalendarPlus size={20} />
                  <span>Go to Dashboard</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
