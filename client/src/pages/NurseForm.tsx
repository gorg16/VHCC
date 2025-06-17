import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  Clock,
  Stethoscope,
  AlertTriangle
} from "lucide-react";

export default function NurseForm() {
  const [, setLocation] = useLocation();
  
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
    additionalNotes: ""
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateVitalSigns = () => {
    const errors: Record<string, string> = {};
    
    const systolic = parseInt(nurseFormData.bloodPressureSystolic);
    if (systolic && (systolic < 80 || systolic > 200)) {
      errors.bloodPressureSystolic = "Systolic BP must be between 80-200 mmHg";
    }

    const temp = parseFloat(nurseFormData.temperature);
    if (temp && (temp < 30 || temp > 45)) {
      errors.temperature = "Temperature must be between 30-45°C";
    }

    const pulse = parseInt(nurseFormData.pulse);
    if (pulse && (pulse < 30 || pulse > 200)) {
      errors.pulse = "Pulse must be between 30-200 bpm";
    }

    const rr = parseInt(nurseFormData.respiratoryRate);
    if (rr && (rr < 5 || rr > 40)) {
      errors.respiratoryRate = "Respiratory rate must be between 5-40 /min";
    }

    const spo2 = parseInt(nurseFormData.oxygenSaturation);
    if (spo2 && (spo2 < 70 || spo2 > 100)) {
      errors.oxygenSaturation = "SpO₂ must be between 70-100%";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateVitalSigns()) {
      setLocation("/consultation");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNurseFormData({...nurseFormData, [field]: value});
    
    if (validationErrors[field]) {
      setValidationErrors({...validationErrors, [field]: ""});
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-black mb-2">Nurse Pre-Consultation Assessment</h2>
        <p className="text-gray-600">Complete medical screening before consultation starts</p>
        
        {/*<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">*/}
        {/*  <div className="p-4 bg-blue-50 border border-trust-blue rounded-xl">*/}
        {/*    <div className="flex items-start space-x-3">*/}
        {/*      <Shield className="text-trust-blue mt-1" size={20} />*/}
        {/*      <div>*/}
        {/*        <h4 className="font-medium text-slate-black mb-1">Access Control</h4>*/}
        {/*        <p className="text-sm text-gray-700">*/}
        {/*          Only nurses and consulting doctors can view or edit this form*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  */}
        {/*  <div className="p-4 bg-healing-green bg-opacity-10 border border-healing-green rounded-xl">*/}
        {/*    <div className="flex items-start space-x-3">*/}
        {/*      <CheckCircle className="text-healing-green mt-1" size={20} />*/}
        {/*      <div>*/}
        {/*        <h4 className="font-medium text-slate-black mb-1">EMR Integration</h4>*/}
        {/*        <p className="text-sm text-gray-700">*/}
        {/*          Form data auto-populates the EMR visit note upon consultation start*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>

      <Card className="shadow-neuro">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-healing-green rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-neuro">
              <Stethoscope className="text-white text-2xl" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-black mb-2">Pre-Consultation Medical Assessment</h3>
            <p className="text-gray-600 text-sm">Complete triage and vital signs collection</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Medical History Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-black mb-4 flex items-center">
                  <User className="mr-2" size={20} />
                  Medical History & Complaints
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <Label className="required">Chief Complaint</Label>
                    <Textarea
                      placeholder="Patient's main reason for consultation today"
                      value={nurseFormData.chiefComplaint}
                      onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
                      className="rounded-xl"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label>Medical History</Label>
                    <Textarea
                      placeholder="Previous medical conditions, surgeries, hospitalizations"
                      value={nurseFormData.medicalHistory}
                      onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                      className="rounded-xl"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Current Medications</Label>
                    <Textarea
                      placeholder="List all current medications, dosages, and frequency"
                      value={nurseFormData.currentMedications}
                      onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                      className="rounded-xl"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Allergies</Label>
                    <Textarea
                      placeholder="Food, drug, or environmental allergies and reactions"
                      value={nurseFormData.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      className="rounded-xl"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vital Signs Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-black mb-4 flex items-center">
                  <Stethoscope className="mr-2" size={20} />
                  Vital Signs
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <Label className="required">Temperature (°C)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="36.5"
                      value={nurseFormData.temperature}
                      onChange={(e) => handleInputChange('temperature', e.target.value)}
                      className={`rounded-xl ${validationErrors.temperature ? 'border-red-500' : ''}`}
                      required
                    />
                    {validationErrors.temperature && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.temperature}</p>
                    )}
                  </div>

                  <div>
                    <Label className="required">Blood Pressure</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Input
                          type="number"
                          placeholder="Systolic (120)"
                          value={nurseFormData.bloodPressureSystolic}
                          onChange={(e) => handleInputChange('bloodPressureSystolic', e.target.value)}
                          className={`rounded-xl ${validationErrors.bloodPressureSystolic ? 'border-red-500' : ''}`}
                          required
                        />
                        {validationErrors.bloodPressureSystolic && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.bloodPressureSystolic}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="Diastolic (80)"
                          value={nurseFormData.bloodPressureDiastolic}
                          onChange={(e) => handleInputChange('bloodPressureDiastolic', e.target.value)}
                          className="rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="required">Pulse (bpm)</Label>
                    <Input
                      type="number"
                      placeholder="72"
                      value={nurseFormData.pulse}
                      onChange={(e) => handleInputChange('pulse', e.target.value)}
                      className={`rounded-xl ${validationErrors.pulse ? 'border-red-500' : ''}`}
                      required
                    />
                    {validationErrors.pulse && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.pulse}</p>
                    )}
                  </div>

                  <div>
                    <Label className="required">Respiratory Rate (/min)</Label>
                    <Input
                      type="number"
                      placeholder="18"
                      value={nurseFormData.respiratoryRate}
                      onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
                      className={`rounded-xl ${validationErrors.respiratoryRate ? 'border-red-500' : ''}`}
                      required
                    />
                    {validationErrors.respiratoryRate && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.respiratoryRate}</p>
                    )}
                  </div>

                  <div>
                    <Label className="required">Oxygen Saturation (SpO₂ %)</Label>
                    <Input
                      type="number"
                      placeholder="98"
                      value={nurseFormData.oxygenSaturation}
                      onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                      className={`rounded-xl ${validationErrors.oxygenSaturation ? 'border-red-500' : ''}`}
                      required
                    />
                    {validationErrors.oxygenSaturation && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.oxygenSaturation}</p>
                    )}
                  </div>

                  <div>
                    <Label>Additional Clinical Notes</Label>
                    <Textarea
                      placeholder="Any additional observations, clinical findings, or nursing notes"
                      value={nurseFormData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      className="rounded-xl"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-yellow-50 p-4 rounded-xl mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="text-warm-amber mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-slate-black mb-1">Real-Time Validation</h4>
                  <p className="text-sm text-gray-700">
                    System performs real-time checks for required fields and valid ranges. 
                    Example: BP systolic must be 80-200 mmHg. Form data will automatically populate the EMR visit note when consultation begins.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-trust-blue text-white border-trust-blue">
                <Clock size={14} className="mr-1" />
                Pre-Consultation Assessment
              </Badge>
              
              <Button
                onClick={handleSubmit}
                className="bg-healing-green hover:bg-green-600 rounded-xl shadow-neuro px-8"
              >
                Complete Assessment & Start Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
