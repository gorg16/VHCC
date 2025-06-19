import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, Phone, CheckCircle, AlertTriangle, Plus, Edit, Trash2 } from "lucide-react";

export default function ReceptionistPortal() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Ahmed Al-Rashid",
      patientId: "P001",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2025-06-20",
      time: "10:00 AM",
      status: "scheduled",
      kycStatus: "verified",
      checkInStatus: "pending"
    },
    {
      id: 2,
      patientName: "Al Barsha",
      patientId: "P001",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2025-06-20",
      time: "10:00 AM",
      status: "scheduled",
      kycStatus: "verified",
      checkInStatus: "pending"
    },
    {
      id: 3,
      patientName: "Fatima Hassan",
      patientId: "P002",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-06-20",
      time: "2:30 PM",
      status: "confirmed",
      kycStatus: "pending",
      checkInStatus: "pending"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "confirmed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-black mb-2">Receptionist Portal</h1>
          <p className="text-gray-600">Manage appointments and patient check-ins</p>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patient Status</TabsTrigger>
            <TabsTrigger value="checkin">Check-in Workflow</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="text-healing-green" size={24} />
                    <span>Appointment Management</span>
                  </CardTitle>
                  <Button className="bg-healing-green hover:bg-green-600 rounded-xl">
                    <Plus size={16} className="mr-2" />
                    New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-xl p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-semibold text-slate-black">{appointment.patientName}</h3>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <User size={16} />
                              <span>{appointment.doctorName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(appointment.kycStatus)} variant="outline">
                                KYC: {appointment.kycStatus}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Edit size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl text-red-600 hover:text-red-700">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="text-healing-green" size={24} />
                  <span>Patient KYC Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="border rounded-xl p-4 bg-white">
                      <h3 className="font-semibold text-slate-black mb-3">Pending Verification</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="font-medium">Fatima Hassan</p>
                            <p className="text-sm text-gray-600">ID: P002</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-xl p-4 bg-white">
                      <h3 className="font-semibold text-slate-black mb-3">Verified Patients</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium">Ahmed Al-Rashid</p>
                            <p className="text-sm text-gray-600">ID: P001</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checkin" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="text-healing-green" size={24} />
                  <span>Check-in Workflow</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="border-2 border-yellow-200">
                      <CardHeader className="pb-4">
                        <h3 className="font-semibold text-slate-black">Awaiting Check-in</h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="font-medium">Ahmed Al-Rashid</p>
                            <p className="text-sm text-gray-600">10:00 AM - Dr. Johnson</p>
                            <Button size="sm" className="mt-2 bg-healing-green hover:bg-green-600 rounded-xl">
                              Check In
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-200">
                      <CardHeader className="pb-4">
                        <h3 className="font-semibold text-slate-black">In Progress</h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="font-medium">Fatima Hassan</p>
                            <p className="text-sm text-gray-600">2:30 PM - Dr. Chen</p>
                            <Badge className="bg-blue-100 text-blue-800 mt-2">In Consultation</Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="font-medium">Fatima Hassan</p>
                            <p className="text-sm text-gray-600">2:30 PM - Dr. Chen</p>
                            <Badge className="bg-blue-100 text-blue-800 mt-2">In Consultation</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-200">
                      <CardHeader className="pb-4">
                        <h3 className="font-semibold text-slate-black">Completed</h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="font-medium">Omar Khalil</p>
                            <p className="text-sm text-gray-600">9:00 AM - Dr. Smith</p>
                            <Badge className="bg-green-100 text-green-800 mt-2">Completed</Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="font-medium">Omar Khalil</p>
                            <p className="text-sm text-gray-600">9:00 AM - Dr. Smith</p>
                            <Badge className="bg-green-100 text-green-800 mt-2">Completed</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
