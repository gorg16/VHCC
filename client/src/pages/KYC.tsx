import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Camera, 
  FileText, 
  CheckCircle,
  AlertTriangle,
  User,
  Clock,
  Building,
  Upload,
  Scan
} from "lucide-react";
import PhoneInput from "../components/PhoneInput";
import { arabicCountries } from "../lib/mockData";

export default function KYC() {
  const [, setLocation] = useLocation();
  const [kycStep, setKycStep] = useState<"verification" | "completed">("verification");
  const [countryCode, setCountryCode] = useState("+962");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [kycData, setKycData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationalId: "",
    nationality: "JORDAN",
    address: "",
    city: "",
    country: "",
    email: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const [nurseFormData, setNurseFormData] = useState({
    chiefComplaint: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    temperature: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    pulse: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    height: "",
    weight: "",
    additionalNotes: ""
  });

  const handleKycSubmit = () => {
    setKycStep("completed");
  };

  const handleProceedToDashboard = () => {
    setLocation("/dashboard");
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-black mb-2">On-Site KYC Verification</h2>
        <p className="text-gray-600">Complete your mandatory on-site identity verification and medical screening at the medical center</p>
        <div className="mt-4 p-4 bg-warm-amber bg-opacity-10 border border-warm-amber rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-warm-amber mt-1" size={20} />
            <div>
              <h4 className="font-medium text-slate-black mb-1">Important: On-Site Requirement</h4>
              <p className="text-sm text-gray-700">
                This KYC process must be completed at the medical center with valid ID at least 30 minutes before your appointment. 
                Failure to complete KYC will result in automatic appointment cancellation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center space-x-2 ${kycStep === "verification" ? "text-trust-blue" : kycStep === "completed" ? "text-healing-green" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${kycStep === "verification" ? "bg-trust-blue text-white" : kycStep === "completed" ? "bg-healing-green text-white" : "bg-gray-200"}`}>
              {kycStep === "completed" ? <CheckCircle size={20} /> : "1"}
            </div>
            <span className="font-medium">Identity Verification</span>
          </div>
          
          <div className="w-16 h-1 bg-gray-200 rounded">
            <div className={`h-full rounded transition-all duration-300 ${kycStep === "completed" ? "bg-healing-green w-full" : "bg-gray-200 w-0"}`}></div>
          </div>
          
          <div className={`flex items-center space-x-2 ${kycStep === "completed" ? "text-healing-green" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${kycStep === "completed" ? "bg-healing-green text-white" : "bg-gray-200"}`}>
              {kycStep === "completed" ? <CheckCircle size={20} /> : "2"}
            </div>
            <span className="font-medium">Complete</span>
          </div>
        </div>
      </div>

      {/* Step 1: Identity Verification */}
      {kycStep === "verification" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-neuro">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-trust-blue rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-neuro">
                  <Shield className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-black mb-2">WEB Medical Center Staff: Identity Verification</h3>
                <p className="text-gray-600 text-sm">Staff portal for completing patient KYC verification</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      placeholder="John"
                      value={kycData.firstName}
                      onChange={(e) => setKycData({...kycData, firstName: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      placeholder="Doe"
                      value={kycData.lastName}
                      onChange={(e) => setKycData({...kycData, lastName: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={kycData.dateOfBirth}
                      onChange={(e) => setKycData({...kycData, dateOfBirth: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Select value={kycData.gender} onValueChange={(value) => setKycData({...kycData, gender: value})}>
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
                </div>

                <div>
                  <Label>National/Personal ID Number</Label>
                  <Input
                    placeholder="Enter your ID number"
                    value={kycData.nationalId}
                    onChange={(e) => setKycData({...kycData, nationalId: e.target.value})}
                    className="rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nationality</Label>
                    <Select value={kycData.nationality} onValueChange={(value) => setKycData({...kycData, nationality: value})}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JORDAN">Jordan</SelectItem>
                        <SelectItem value="UAE">UAE</SelectItem>
                        <SelectItem value="SAUDI_ARABIA">Saudi Arabia</SelectItem>
                        <SelectItem value="KUWAIT">Kuwait</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={kycData.email}
                      onChange={(e) => setKycData({...kycData, email: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <PhoneInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  countryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                />

                <div>
                  <Label>Address</Label>
                  <Textarea
                    placeholder="Enter your full address"
                    value={kycData.address}
                    onChange={(e) => setKycData({...kycData, address: e.target.value})}
                    className="rounded-xl"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Emergency Contact Name</Label>
                    <Input
                      placeholder="Contact person"
                      value={kycData.emergencyContact}
                      onChange={(e) => setKycData({...kycData, emergencyContact: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Emergency Contact Phone</Label>
                    <Input
                      placeholder="Phone number"
                      value={kycData.emergencyPhone}
                      onChange={(e) => setKycData({...kycData, emergencyPhone: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card className="shadow-neuro">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-warm-amber rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-neuro">
                  <Camera className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-black mb-2">Document Verification</h3>
                <p className="text-gray-600 text-sm">Upload or scan your identification documents</p>
              </div>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <Upload className="text-gray-500" size={24} />
                  </div>
                  <h4 className="font-medium text-slate-black mb-2">Upload ID Document</h4>
                  <p className="text-sm text-gray-600 mb-4">Drag and drop or click to upload</p>
                  <Button variant="outline" className="rounded-xl">
                    Choose File
                  </Button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <Scan className="text-gray-500" size={24} />
                  </div>
                  <h4 className="font-medium text-slate-black mb-2">Scan with Camera</h4>
                  <p className="text-sm text-gray-600 mb-4">Use device camera to scan ID</p>
                  <Button variant="outline" className="rounded-xl">
                    Open Camera
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="text-trust-blue mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-slate-black mb-1">Important Notes</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Ensure document is clear and readable</li>
                        <li>• All four corners must be visible</li>
                        <li>• No glare or shadows on the document</li>
                        <li>• Document must be valid and not expired</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleKycSubmit}
                  className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro"
                >
                  Verify Identity & Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Completion */}
      {kycStep === "completed" && (
        <Card className="shadow-neuro max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-healing-green rounded-full mx-auto mb-6 flex items-center justify-center shadow-neuro">
              <CheckCircle className="text-white text-3xl" size={40} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-black mb-4">KYC Identity Verification Complete!</h3>
            <p className="text-gray-600 mb-6">
              Your identity has been verified by medical center staff. 
              You can now access all VHCC services and book appointments.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h4 className="font-semibold text-slate-black mb-4">Verification Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-healing-green" />
                  <span>Identity Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-healing-green" />
                  <span>Document Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-healing-green" />
                  <span>Document Uploaded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-healing-green" />
                  <span>Account Activated</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleProceedToDashboard}
                className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro"
              >
                Go to Dashboard
              </Button>
              
              <Button
                onClick={() => setLocation("/scheduling")}
                variant="outline"
                className="w-full rounded-xl"
              >
                Book Your First Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
