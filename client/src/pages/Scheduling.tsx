import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, UserRound, Hospital, Check, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockDoctors, mockMedicalCenters } from "../lib/mockData";
import {useLocation} from "wouter";

export default function Scheduling() {
  const [, setLocation] = useLocation();
  const [appointmentStep, setAppointmentStep] = useState<"booking" | "payment" | "card">("booking");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("15");
  const [selectedTime, setSelectedTime] = useState("2:00 PM");
  const [paymentData, setPaymentData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    ccv: "",
  });

  const consultationFee = 50.00;
  const platformFee = 5.00;
  const subtotal = consultationFee + platformFee;
  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  const handleConfirmAppointment = () => {
    setAppointmentStep("payment");
  };

  const handleProceedToPayment = () => {
    setAppointmentStep("card");
  };

  const handleCompletePayment = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setAppointmentStep("booking");
    setLocation('/dashboard')
  };

  const selectedDoctorInfo = mockDoctors.find(d => d.firstName === selectedDoctor.split(" ")[1]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-black mb-2">Schedule Appointment</h2>
        <p className="text-gray-600">Book your virtual consultation with our medical professionals</p>
        <div className="mt-4 p-4 bg-warm-amber bg-opacity-10 border border-warm-amber rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-warm-amber mt-1" size={20} />
            <div>
              <h4 className="font-medium text-slate-black mb-1">Pre-KYC Booking Allowed</h4>
              <p className="text-sm text-gray-700">
                You can book appointments without completed KYC, but you must visit the medical center 
                with valid ID at least 30 minutes before your appointment to complete:
              </p>
              <ul className="list-disc list-inside mt-1 text-xs">
                <li>Identity verification by medical center staff</li>
                {/*<li>Medical screening by nurse (vital signs, medical history)</li>*/}
              </ul>
              {/*<p className="text-xs text-medical-red mt-1 font-medium">*/}
              {/*  Slots are reserved for 24 hours. Failure to complete KYC results in automatic cancellation.*/}
              {/*</p>*/}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Appointment Booking Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-neuro">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-black mb-2">Appointment Details</h3>
                <p className="text-gray-600 text-sm">Select your preferred specialist and time</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Specialty</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="E. N. T (Ear, Nose & Throat)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ENT">E. N. T (Ear, Nose & Throat)</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                      <SelectItem value="General">General Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Consultant</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Dr. Ahmed Fawzi" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={`Dr. ${doctor.firstName} ${doctor.lastName}`}>
                          Dr. {doctor.firstName} {doctor.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Your Current Location</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Jordan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jordan">Jordan</SelectItem>
                        <SelectItem value="UAE">UAE</SelectItem>
                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Amman" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Amman">Amman</SelectItem>
                        <SelectItem value="Dubai">Dubai</SelectItem>
                        <SelectItem value="Riyadh">Riyadh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Medical Center</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Al Fanar Medical Center" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMedicalCenters.map((center) => (
                        <SelectItem key={center.id} value={center.name}>
                          {center.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Calendar Component */}
                <div>
                  <Label>Select Date & Time</Label>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-trust-blue p-4 rounded-2xl shadow-neuro">
                        <Calendar className="text-white text-3xl" size={32} />
                      </div>
                      <div className="ml-4">
                        <Clock className="text-warm-amber text-2xl" size={32} />
                      </div>
                    </div>
                    
                    {/* Simple Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="font-semibold text-gray-600 p-2">{day}</div>
                      ))}
                      
                      {/* Calendar days */}
                      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(day => (
                        <div key={day} className={`p-2 ${day <= 7 ? 'text-gray-400' : 'hover:bg-trust-blue hover:text-white rounded-lg cursor-pointer transition-colors'}`}>
                          {day}
                        </div>
                      ))}
                      <div 
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${selectedDate === "15" ? 'bg-trust-blue text-white' : 'hover:bg-trust-blue hover:text-white'}`}
                        onClick={() => setSelectedDate("15")}
                      >
                        15
                      </div>
                      {[16,17,18,19,20,21].map(day => (
                        <div key={day} className="p-2 hover:bg-trust-blue hover:text-white rounded-lg cursor-pointer transition-colors">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Time Slots */}
                    <div className="grid grid-cols-3 gap-2">
                      {["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"].map(time => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                            selectedTime === time 
                              ? "bg-trust-blue text-white" 
                              : "border-gray-200 hover:bg-trust-blue hover:text-white"
                          }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleConfirmAppointment}
                  className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro"
                >
                  Confirm Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Summary */}
        <div className="space-y-6">
          <Card className="shadow-neuro">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-black mb-4">Appointment Summary</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-trust-blue rounded-full flex items-center justify-center">
                    <UserRound className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-black">{selectedDoctor || "Dr. Ahmed Fawzi"}</p>
                    <p className="text-sm text-gray-600">{selectedDoctorInfo?.specialty || "E.N.T Specialist"}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-black">Dec {selectedDate}, 2024</p>
                    <p className="text-sm text-gray-600">{selectedTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-healing-green rounded-full flex items-center justify-center">
                    <Hospital className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-black">Al Fanar Medical</p>
                    <p className="text-sm text-gray-600">Virtual Consultation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details Card */}
          {appointmentStep === "payment" && (
            <Card className="shadow-neuro">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-black mb-4">Payment Details</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="font-medium">${consultationFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-medium">${platformFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">VAT (5%)</span>
                        <span className="font-medium">${vat.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-trust-blue">
                        <span>Total to Pay</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleProceedToPayment}
                    className="w-full bg-healing-green hover:bg-green-600 rounded-xl shadow-neuro"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Card Payment Form */}
          {appointmentStep === "card" && (
            <Card className="shadow-neuro">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-black mb-4">Card Payment</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Name on Card</Label>
                    <Input
                      placeholder="John Doe"
                      value={paymentData.nameOnCard}
                      onChange={(e) => setPaymentData({...paymentData, nameOnCard: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <Label>Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry Date</Label>
                      <Input
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label>CCV</Label>
                      <Input
                        placeholder="123"
                        value={paymentData.ccv}
                        onChange={(e) => setPaymentData({...paymentData, ccv: e.target.value})}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center py-4">
                    <div className="text-xl font-bold text-trust-blue mb-2">Total: ${total.toFixed(2)} USD</div>
                  </div>
                  
                  <Button
                    onClick={handleCompletePayment}
                    className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro"
                  >
                    Complete Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md mx-4 rounded-2xl">
          <DialogHeader>
            <div className="text-center">
              <div className="w-16 h-16 bg-healing-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-white text-2xl" size={32} />
              </div>
              <DialogTitle className="text-xl font-semibold text-slate-black mb-2">
                Appointment Confirmed!
              </DialogTitle>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                <h4 className="font-medium text-slate-black mb-2">Appointment Details:</h4>
                <div className="text-sm space-y-1">
                  <div><strong>Doctor:</strong> {selectedDoctor || "Dr. Ahmed Fawzi"}</div>
                  <div><strong>Date:</strong> Dec {selectedDate}, 2024</div>
                  <div><strong>Time:</strong> {selectedTime}</div>
                  <div><strong>Type:</strong> Virtual Consultation</div>
                </div>
              </div>
              
              <Button
                onClick={handleCloseConfirmation}
                className="w-full bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro"
              >
                Got it, Thanks!
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
