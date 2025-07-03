import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    User,
    Calendar,
    Heart,
    FileText,
    History,
    Thermometer,
    Activity,
    Weight,
    Search,
    Filter,
    Clock, CheckCircle, Star, Hospital,
} from "lucide-react";

export default function DoctorConsultation() {
    const [doctorNotes, setDoctorNotes] = useState("");
    const [assessment, setAssessment] = useState("");
    const [treatmentPlan, setTreatmentPlan] = useState("");

    const currentPatient = {
        id: "P001",
        name: "Ahmed Mohammed Al-Rashid",
        age: 45,
        gender: "Male",
        mrn: "MRN-2024-001",
        phone: "+971501234567",
        email: "ahmed.alrashid@email.com",
        nationalId: "784-1985-1234567-8",
        emergencyContact: "Fatima Al-Rashid (+971501234568)",
        bloodType: "O+",
        allergies: ["Penicillin", "Shellfish"],
        chronicConditions: ["Type 2 Diabetes", "Hypertension"]
    };

    const currentVitalSigns = {
        bloodPressure: "140/90 mmHg",
        heartRate: "78 bpm",
        temperature: "36.8°C",
        respiratoryRate: "16 /min",
        oxygenSaturation: "98%",
        weight: "82 kg",
        height: "175 cm",
        bmi: "26.8",
        painLevel: "3/10",
        recordedAt: "2025-07-15 10:30 AM",
        recordedBy: "Nurse Sarah Ahmed"
    };

    const currentConsultation = {
        appointmentDate: "2025-07-15",
        appointmentTime: "10:30 AM",
        specialty: "Cardiology",
        doctor: "Dr. Ahmed Hassan",
        chiefComplaint: "Chest pain during exercise",
        symptoms: "Patient reports chest discomfort and shortness of breath during moderate exercise for the past 2 weeks",
        duration: "2 weeks",
        severity: "Moderate",
        previousTreatment: "Self-medication with pain relievers",
        currentMedications: "Lisinopril 10mg OD, Metformin 500mg BD",
        nurseName: "Nurse Sarah Ahmed",
        nurseNotes: "Patient appears anxious about symptoms. Vital signs stable. No acute distress observed."
    };

    // Past consultations with filtering
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


    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [filterSpecialty, setFilterSpecialty] = useState("");
    const [searchText, setSearchText] = useState("");

    const specialties = ["All Specialties", "Cardiology", "Internal Medicine", "Dermatology", "Orthopedics", "Neurology", "Pediatrics"];

    const filteredConsultations = pastConsultations.filter(consultation => {
        // Filter by specialty
        if (filterSpecialty && filterSpecialty !== "All Specialties" && consultation.specialty !== filterSpecialty) {
            return false;
        }

        // Filter by date range
        if (dateFrom && consultation.date < dateFrom) return false;
        if (dateTo && consultation.date > dateTo) return false;

        // Filter by search text
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            return (
                consultation.doctor.toLowerCase().includes(searchLower) ||
                consultation.doctor.toLowerCase().includes(searchLower) ||
                consultation.center.toLowerCase().includes(searchLower)
            );
        }

        return true;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800";
            case "In Progress":
                return "bg-blue-100 text-blue-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen  p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-black mb-2">
                    Doctor Consultation
                </h1>
                <p className="text-gray-600">
                    {/*Comprehensive patient consultation with vital signs and medical history*/}
                </p>
            </div>
            <div className="max-w-7xl mx-auto">
                <Card className="shadow-neuro mb-6">
                    <CardHeader className="bg-gradient-to-r from-trust-blue to-blue-600  rounded-t-xl">
                        <CardTitle className="flex items-center space-x-3">
                            <User size={24}/>
                            <div>
                                <h2 className="text-xl font-bold text-blue-500">{currentPatient.name}</h2>
                                <p className="text-gray-800">MRN: {currentPatient.mrn} |
                                    Age: {currentPatient.age} | {currentPatient.gender}</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                </Card>


                <Tabs defaultValue="vital-signs" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-white shadow-neuro rounded-xl">
                        <TabsTrigger
                            value="vital-signs"
                            className="rounded-xl font-medium text-sm data-[state=active]:bg-trust-blue data-[state=active]:text-white data-[state=active]:shadow-neuro transition-all duration-200"
                        >
                            <Heart size={16} className="mr-2"/>
                            Vital Signs
                        </TabsTrigger>
                        <TabsTrigger
                            value="current-consultation"
                            className="rounded-xl font-medium text-sm data-[state=active]:bg-trust-blue data-[state=active]:text-white data-[state=active]:shadow-neuro transition-all duration-200"
                        >
                            <FileText size={16} className="mr-2"/>
                            Current Consultation
                        </TabsTrigger>
                        <TabsTrigger
                            value="past-consultations"
                            className="rounded-xl font-medium text-sm data-[state=active]:bg-trust-blue data-[state=active]:text-white data-[state=active]:shadow-neuro transition-all duration-200"
                        >
                            <History size={16} className="mr-2"/>
                            Past Consultations
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="vital-signs" className="space-y-6">
                        <Card className="shadow-neuro">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Activity className="text-healing-green" size={24}/>
                                    <span>Current Vital Signs</span>
                                    <Badge className="bg-green-100 text-green-800 ml-auto">
                                        Recorded: {currentVitalSigns.recordedAt}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                        <div className="flex items-center space-x-3">
                                            <Heart className="text-red-500" size={24}/>
                                            <div>
                                                <p className="text-sm font-medium text-red-700">Blood Pressure</p>
                                                <p className="text-xl font-bold text-red-800">{currentVitalSigns.bloodPressure}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                        <div className="flex items-center space-x-3">
                                            <Activity className="text-blue-500" size={24}/>
                                            <div>
                                                <p className="text-sm font-medium text-blue-700">Heart Rate</p>
                                                <p className="text-xl font-bold text-blue-800">{currentVitalSigns.heartRate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                                        <div className="flex items-center space-x-3">
                                            <Thermometer className="text-orange-500" size={24}/>
                                            <div>
                                                <p className="text-sm font-medium text-orange-700">Temperature</p>
                                                <p className="text-xl font-bold text-orange-800">{currentVitalSigns.temperature}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                        <div className="flex items-center space-x-3">
                                            <Activity className="text-green-500" size={24}/>
                                            <div>
                                                <p className="text-sm font-medium text-green-700">Oxygen Saturation</p>
                                                <p className="text-xl font-bold text-green-800">{currentVitalSigns.oxygenSaturation}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                        <div className="flex items-center space-x-3">
                                            <Activity className="text-purple-500" size={24}/>
                                            <div>
                                                <p className="text-sm font-medium text-purple-700">Respiratory Rate</p>
                                                <p className="text-xl font-bold text-purple-800">{currentVitalSigns.respiratoryRate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                                        <div className="flex items-center space-x-3">
                                            <Weight className="text-indigo-500" size={24}/>
                                            <div>
                                                <p className="text-sm font-medium text-indigo-700">Weight</p>
                                                <p className="text-xl font-bold text-indigo-800">{currentVitalSigns.weight}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <Activity className="text-gray-500" size={24}/>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Height</p>
                                                <p className="text-xl font-bold text-gray-800">{currentVitalSigns.height}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                                        <div className="flex items-center space-x-3">
                                            <Activity className="text-yellow-500" size={24}/>
                                            <div>
                                                <p className="text-sm font-medium text-yellow-700">BMI</p>
                                                <p className="text-xl font-bold text-yellow-800">{currentVitalSigns.bmi}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="current-consultation" className="space-y-6">
                        <Card className="shadow-neuro">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="text-trust-blue" size={24}/>
                                    <span>Current Consultation Details</span>
                                    <Badge className="bg-blue-100 text-blue-800 ml-auto">
                                        {currentConsultation.appointmentDate} at {currentConsultation.appointmentTime}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Specialty &
                                                Doctor</Label>
                                            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                                <p className="font-semibold text-trust-blue">{currentConsultation.specialty}</p>
                                                <p className="text-sm text-gray-600">{currentConsultation.doctor}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Chief Complaint</Label>
                                            <div className="mt-1 p-3 bg-red-50 rounded-lg border border-red-200">
                                                <p className="text-gray-900">{currentConsultation.chiefComplaint}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Symptoms
                                                Description</Label>
                                            <div className="mt-1 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                                <p className="text-gray-900">{currentConsultation.symptoms}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Duration</Label>
                                                <div className="mt-1 p-2 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-900">{currentConsultation.duration}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Severity</Label>
                                                <div className="mt-1 p-2 bg-gray-50 rounded-lg">
                                                    <Badge
                                                        className="bg-orange-100 text-orange-800">{currentConsultation.severity}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Previous
                                                Treatment</Label>
                                            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-900">{currentConsultation.previousTreatment}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Current
                                                Medications</Label>
                                            <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                                                <p className="text-sm text-gray-900">{currentConsultation.currentMedications}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium text-gray-700">Nurse Notes</Label>
                                            <div className="mt-1 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                <p className="text-sm text-gray-900">{currentConsultation.nurseNotes}</p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <User className="text-trust-blue" size={14}/>
                                                    <span
                                                        className="text-xs text-trust-blue font-medium">{currentConsultation.nurseName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Doctor's Notes Section */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-slate-black mb-4">Doctor's Consultation
                                        Notes</h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="doctor-notes">Clinical Observations & Notes</Label>
                                                <Textarea
                                                    id="doctor-notes"
                                                    placeholder="Enter your clinical observations, examination findings, and additional notes..."
                                                    value={doctorNotes}
                                                    onChange={(e) => setDoctorNotes(e.target.value)}
                                                    className="rounded-xl min-h-[120px]"
                                                    rows={5}
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="assessment">Clinical Assessment</Label>
                                                <Textarea
                                                    id="assessment"
                                                    placeholder="Enter your clinical assessment and differential diagnosis..."
                                                    value={assessment}
                                                    onChange={(e) => setAssessment(e.target.value)}
                                                    className="rounded-xl min-h-[100px]"
                                                    rows={4}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="treatment-plan">Treatment Plan & Recommendations</Label>
                                                <Textarea
                                                    id="treatment-plan"
                                                    placeholder="Enter treatment plan, medications, follow-up instructions, and recommendations..."
                                                    value={treatmentPlan}
                                                    onChange={(e) => setTreatmentPlan(e.target.value)}
                                                    className="rounded-xl min-h-[120px]"
                                                    rows={5}
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex space-x-3">
                                                    <Button
                                                        className="rounded-xl bg-healing-green hover:bg-green-600 flex-1">
                                                        <FileText className="w-4 h-4 mr-2"/>
                                                        Save Consultation Notes
                                                    </Button>
                                                    <Button variant="outline" className="rounded-xl">
                                                        Print Notes
                                                    </Button>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="past-consultations" className="space-y-6">
                        <Card className="shadow-neuro">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Filter className="text-trust-blue" size={24}/>
                                    <span>Filter Past Consultations</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <Label htmlFor="date-from">Date From</Label>
                                        <Input
                                            id="date-from"
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                            className="rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="date-to">Date To</Label>
                                        <Input
                                            id="date-to"
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => setDateTo(e.target.value)}
                                            className="rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="specialty">Specialty</Label>
                                        <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                                            <SelectTrigger className="rounded-xl">
                                                <SelectValue placeholder="All Specialties"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {specialties.map(specialty => (
                                                    <SelectItem key={specialty} value={specialty}>
                                                        {specialty}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="search">Search</Label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-3 text-gray-400" size={16}/>
                                            <Input
                                                id="search"
                                                placeholder="Search consultations..."
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                className="rounded-xl pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={() => {
                                            setDateFrom("");
                                            setDateTo("");
                                            setFilterSpecialty("");
                                            setSearchText("");
                                        }}
                                        variant="outline"
                                        className="rounded-xl"
                                    >
                                        Reset Filters
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-slate-black">
                                            Past Consultations ({filteredConsultations.length} consultations)
                                        </h3>
                                    </div>

                                    {filteredConsultations.length === 0 ? (
                                        <Card className="shadow-neuro">
                                            <CardContent className="p-8 text-center">
                                                <History className="mx-auto text-gray-400 mb-4" size={48}/>
                                                <p className="text-gray-600">No consultations found matching your criteria.</p>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        filteredConsultations.map((consultation) => (
                                            <div key={consultation.id} className="bg-gray-50 p-4 rounded-xl">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div
                                                            className="w-12 h-12 bg-healing-green rounded-xl flex items-center justify-center shadow-neuro">
                                                            <CheckCircle className="text-white" size={20}/>
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
                                                        <Calendar size={16} className="text-gray-500"/>
                                                        <span>{consultation.date}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Clock size={16} className="text-gray-500"/>
                                                        <span>{consultation.time}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Hospital size={16} className="text-gray-500"/>
                                                        <span className="truncate">{consultation.center}</span>
                                                    </div>
                                                </div>

                                                <div className="text-sm">
                                                    <p className="text-gray-700 mb-2">
                                                        <strong>Summary:</strong> {consultation.summary}</p>
                                                    <p className="text-gray-700">
                                                        <strong>Prescription:</strong> {consultation.prescription}</p>
                                                </div>
                                            </div>
                                        ))

                                    )}
                                </div>

                            </CardContent>

                        </Card>

                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
