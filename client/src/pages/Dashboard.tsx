import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  UserRound, 
  Hospital, 
  FileText, 
  Bell, 
  CreditCard,
  Star,
  Settings,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  CalendarPlus
} from "lucide-react";
import { useAppState } from "../hooks/useAppState";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { currentUser } = useAppState();

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Ahmed Fawzi",
      specialty: "E.N.T",
      date: "Dec 20, 2024",
      time: "2:00 PM",
      center: "Al Fanar Medical",
      status: "confirmed",
      kycRequired: false
    },
    {
      id: 2,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology", 
      date: "Dec 25, 2024",
      time: "10:30 AM",
      center: "City Hospital",
      status: "pending_kyc",
      kycRequired: true
    }
  ];

  const pastConsultations = [
    {
      id: 1,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "Dec 1, 2024",
      time: "3:00 PM",
      center: "Central Clinic",
      summary: "Routine skin checkup completed. No concerns identified.",
      prescription: "Moisturizing cream - Apply twice daily",
      rating: 5
    },
    {
      id: 2,
      doctor: "Dr. Ahmed Fawzi",
      specialty: "E.N.T",
      date: "Nov 15, 2024", 
      time: "11:00 AM",
      center: "Al Fanar Medical",
      summary: "Follow-up for seasonal allergies. Patient showing improvement.",
      prescription: "Continue antihistamines as prescribed",
      rating: 4
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "reminder",
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Ahmed Fawzi is in 2 hours",
      time: "2 hours ago",
      urgent: true
    },
    {
      id: 2,
      type: "kyc",
      title: "KYC Required",
      message: "Please complete KYC verification for your upcoming appointment",
      time: "1 day ago",
      urgent: true
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Confirmation",
      message: "Payment of $57.75 received for consultation",
      time: "3 days ago",
      urgent: false
    }
  ];

  const getStatusBadge = (status: string, kycRequired: boolean) => {
    if (kycRequired) {
      return <Badge variant="destructive" className="bg-warm-amber text-white">KYC Required</Badge>;
    }
    
    switch (status) {
      case "confirmed":
        return <Badge variant="default" className="bg-healing-green text-white">Confirmed</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-trust-blue text-white">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-black mb-2">Patient Dashboard</h2>
        <p className="text-gray-600">Welcome back, {currentUser?.firstName || "Patient"}!</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Dashboard Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <Card className="shadow-neuro">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-black mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => setLocation("/scheduling")}
                  className="bg-trust-blue hover:bg-blue-600 rounded-xl shadow-neuro h-16 flex items-center justify-center space-x-2"
                >
                  <CalendarPlus size={20} />
                  <span>Book Appointment</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="shadow-neuro">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-black">Upcoming Appointments</h3>
                <Button variant="ghost" size="sm" className="text-trust-blue hover:text-blue-600">
                  View All <ChevronRight size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-3 cursor-pointer"  onClick={() => setLocation("/consultation")}>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-trust-blue rounded-xl flex items-center justify-center shadow-neuro">
                          <UserRound className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-black">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        </div>
                      </div>
                      {getStatusBadge(appointment.status, appointment.kycRequired)}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-500" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hospital size={16} className="text-gray-500" />
                        <span className="truncate">{appointment.center}</span>
                      </div>
                    </div>

                    {appointment.kycRequired && (
                      <div className="mt-3 p-3 bg-warm-amber bg-opacity-10 border border-warm-amber rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle size={16} className="text-warm-amber" />
                          <div className="text-sm text-slate-black">
                            <p className="font-semibold mb-1">Mandatory On-Site KYC Required</p>
                            <p>Visit {appointment.center} at least 30 minutes before your appointment with valid ID for:</p>
                            <ul className="list-disc list-inside mt-1 text-xs">
                              <li>Identity verification by medical staff</li>
                              <li>Pre-consultation medical screening by nurse</li>
                            </ul>
                            <p className="text-xs text-medical-red mt-1 font-medium">
                              Failure to complete KYC will result in automatic appointment cancellation
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Past Consultations */}
          <Card className="shadow-neuro">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-black">Past Consultations</h3>
                <Button variant="ghost" size="sm" className="text-trust-blue hover:text-blue-600">
                  View All <ChevronRight size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                {pastConsultations.map((consultation) => (
                  <div key={consultation.id} className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-healing-green rounded-xl flex items-center justify-center shadow-neuro">
                          <CheckCircle className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-black">{consultation.doctor}</h4>
                          <p className="text-sm text-gray-600">{consultation.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < consultation.rating ? "text-warm-amber fill-current" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>{consultation.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-500" />
                        <span>{consultation.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hospital size={16} className="text-gray-500" />
                        <span className="truncate">{consultation.center}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="text-gray-700 mb-2"><strong>Summary:</strong> {consultation.summary}</p>
                      <p className="text-gray-700"><strong>Prescription:</strong> {consultation.prescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient Profile */}
          <Card className="shadow-neuro">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-trust-blue rounded-full mx-auto mb-4 flex items-center justify-center shadow-neuro">
                  <UserRound className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-black">
                  {currentUser?.firstName} {currentUser?.lastName}
                </h3>
                <p className="text-sm text-gray-600">MRN: {currentUser?.mrn}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">35 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium">{currentUser?.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{currentUser?.city}, {currentUser?.country}</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4 rounded-xl"
                      onClick={() => setLocation("/profile-settings")}
              >
                <Settings size={16} className="mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="shadow-neuro">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-black flex items-center">
                  <Bell size={18} className="mr-2" />
                  Notifications
                </h3>
                <Badge variant="secondary" className="bg-trust-blue text-white">
                  {notifications.filter(n => n.urgent).length}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg ${notification.urgent ? 'bg-warm-amber bg-opacity-10 border border-warm-amber' : 'bg-gray-50'}`}>
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${notification.urgent ? 'bg-warm-amber' : 'bg-gray-400'}`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-slate-black">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-3 text-trust-blue hover:text-blue-600">
                View All Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-neuro">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-black mb-4">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-trust-blue" />
                    <span className="text-sm text-gray-600">Total Appointments</span>
                  </div>
                  <span className="font-semibold text-slate-black">12</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-healing-green" />
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <span className="font-semibold text-slate-black">8</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <CreditCard size={16} className="text-warm-amber" />
                    <span className="text-sm text-gray-600">Total Spent</span>
                  </div>
                  <span className="font-semibold text-slate-black">$462.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
