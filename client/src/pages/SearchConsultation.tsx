import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Search, ChevronDown, ChevronUp, Calendar, User, FileText, Stethoscope, Download} from "lucide-react";
import {mockMedicalCenters} from "@/lib/mockData";

export default function SearchConsultation() {
    const [filters, setFilters] = useState({
        center: "",
        patient: "",
        specialty: "",
        doctor: ""
    });

    const [expandedConsultations, setExpandedConsultations] = useState<Set<string>>(new Set());

    const consultationData = [
        {
            doctorId: "1",
            doctorName: "Dr. Ahmed Hassan",
            specialty: "Cardiology",
            consultations: [
                {
                    id: "c1",
                    date: "2024-01-15",
                    patientName: "Ahmed Al-Rashid",
                    patientAge: 46,
                    summary: "Routine cardiac check-up. Patient reports occasional chest discomfort during exercise.",
                    fullDetails: {
                        fullName: "Ahmed Mohammed Al-Rashid",
                        birthDate: "1978-08-22",
                        preConsultation: {
                            vitalSigns: {bp: "140/90", pulse: "78", temp: "36.8", weight: "82kg"},
                            chiefComplaint: "Chest discomfort during physical activity",
                            medications: ["Aspirin 100mg daily", "Atorvastatin 20mg"],
                            allergies: "None known"
                        },
                        consultation: {
                            description: "Patient presents with intermittent chest discomfort during moderate exercise. Physical examination reveals normal heart sounds, no murmurs. ECG shows normal sinus rhythm. Recommended stress test and echocardiogram.",
                            files: ["ECG_20240115.pdf", "chest_xray_20240115.jpg"],
                            transcript: "Patient: I've been having some chest tightness when I exercise... Doctor: Can you describe the sensation? Patient: It feels like pressure, especially when I climb stairs or walk fast..."
                        }
                    }
                },
                {
                    id: "c2",
                    date: "2024-01-10",
                    patientName: "Sara Mohammed",
                    patientAge: 54,
                    summary: "Follow-up for hypertension management. Blood pressure well controlled on current medications.",
                    fullDetails: {
                        fullName: "Sara Ahmed Mohammed",
                        birthDate: "1971-03-15",
                        preConsultation: {
                            vitalSigns: {bp: "128/82", pulse: "72", temp: "36.6", weight: "68kg"},
                            chiefComplaint: "Hypertension follow-up",
                            medications: ["Lisinopril 10mg daily", "Amlodipine 5mg"],
                            allergies: "Penicillin"
                        },
                        consultation: {
                            description: "Blood pressure well controlled on current regimen. Patient reports good compliance with medications. No side effects noted. Continue current therapy.",
                            files: ["bp_log_jan2024.pdf"],
                            transcript: "Doctor: How have you been feeling on your current medications? Patient: Much better, no dizziness anymore..."
                        }
                    }
                }
            ]
        },
        {
            doctorId: "2",
            doctorName: "Dr. Fatima Al-Zahra",
            specialty: "Dermatology",
            consultations: [
                {
                    id: "c3",
                    date: "2024-01-12",
                    patientName: "Omar Hassan",
                    patientAge: 29,
                    summary: "Evaluation of suspicious skin lesion on left arm. Biopsy recommended for further assessment.",
                    fullDetails: {
                        fullName: "Omar Khalil Hassan",
                        birthDate: "1995-11-08",
                        preConsultation: {
                            vitalSigns: {bp: "120/75", pulse: "68", temp: "36.5", weight: "75kg"},
                            chiefComplaint: "New dark spot on left arm",
                            medications: ["None"],
                            allergies: "None known"
                        },
                        consultation: {
                            description: "2cm irregular pigmented lesion on left forearm. Asymmetric with irregular borders. Dermoscopy shows atypical features. Punch biopsy performed and sent for histopathology.",
                            files: ["dermoscopy_20240112.jpg", "lesion_photo_20240112.jpg", "biopsy_form.pdf"],
                            transcript: "Patient: I noticed this spot about 2 months ago and it seems to be getting darker... Doctor: Let me examine this with the dermoscope..."
                        }
                    }
                }
            ]
        },
        {
            doctorId: "3",
            doctorName: "Dr. Mohammed bin Rashid",
            specialty: "Internal Medicine",
            consultations: [
                {
                    id: "c4",
                    date: "2024-01-14",
                    patientName: "Layla Ahmad",
                    patientAge: 37,
                    summary: "Annual physical examination. Generally healthy, recommended routine blood work.",
                    fullDetails: {
                        fullName: "Layla Ibrahim Ahmad",
                        birthDate: "1988-06-20",
                        preConsultation: {
                            vitalSigns: {bp: "115/70", pulse: "65", temp: "36.7", weight: "62kg"},
                            chiefComplaint: "Annual check-up",
                            medications: ["Multivitamin"],
                            allergies: "Latex"
                        },
                        consultation: {
                            description: "Comprehensive physical examination normal. Patient reports good energy levels and no specific concerns. Recommended routine CBC, CMP, lipid panel, and thyroid function tests.",
                            files: ["physical_exam_20240114.pdf"],
                            transcript: "Doctor: How have you been feeling overall this past year? Patient: Pretty good, just want to make sure everything is okay..."
                        }
                    }
                },
                {
                    id: "c5",
                    date: "2024-01-08",
                    patientName: "Khalid Ibrahim",
                    patientAge: 42,
                    summary: "Consultation for persistent fatigue and joint pain. Further investigation needed.",
                    fullDetails: {
                        fullName: "Khalid Omar Ibrahim",
                        birthDate: "1982-12-03",
                        preConsultation: {
                            vitalSigns: {bp: "130/85", pulse: "80", temp: "37.1", weight: "79kg"},
                            chiefComplaint: "Fatigue and joint pain for 3 months",
                            medications: ["Ibuprofen as needed"],
                            allergies: "None known"
                        },
                        consultation: {
                            description: "Patient presents with 3-month history of fatigue and polyarthralgia. Physical exam shows mild joint tenderness without swelling. Ordered rheumatology panel, ANA, ESR, CRP.",
                            files: ["lab_order_20240108.pdf"],
                            transcript: "Patient: I've been so tired lately and my joints ache... Doctor: Let's run some tests to see what might be causing this..."
                        }
                    }
                }
            ]
        }
    ];

    const specialties = ["Cardiology", "Dermatology", "Internal Medicine", "Pediatrics", "Orthopedics", "Neurology"];

    const toggleConsultationExpanded = (consultationId: string) => {
        const newExpanded = new Set(expandedConsultations);
        if (newExpanded.has(consultationId)) {
            newExpanded.delete(consultationId);
        } else {
            newExpanded.add(consultationId);
        }
        setExpandedConsultations(newExpanded);
    };

    const filteredData = consultationData.filter(doctorData => {
        if (filters.doctor && !doctorData.doctorName.toLowerCase().includes(filters.doctor.toLowerCase())) {
            return false;
        }

        if (filters.specialty && doctorData.specialty !== filters.specialty) {
            return false;
        }

        if (filters.patient) {
            doctorData.consultations = doctorData.consultations.filter(consultation =>
                consultation.patientName.toLowerCase().includes(filters.patient.toLowerCase())
            );
        }

        return doctorData.consultations.length > 0;
    });

    const resetFilters = () => {
        setFilters({center: "", patient: "", specialty: "", doctor: ""});
    };

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-black mb-2">Search Consultations</h1>
                    <p className="text-gray-600">Find and review consultation records by filtering on center, patient,
                        specialty, or doctor</p>
                </div>

                {/* Filters Section */}
                <Card className="shadow-neuro mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Search className="text-trust-blue" size={24}/>
                            <span>Search Filters</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <Label htmlFor="center">Medical Center</Label>
                                <Select value={filters.center}
                                        onValueChange={(value) => setFilters({...filters, center: value})}>
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="All Centers"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">All Centers</SelectItem>
                                        {mockMedicalCenters.map(center => (
                                            <SelectItem key={center.id} value={center.id.toString()}>
                                                {center.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="patient">Patient Name</Label>
                                <Input
                                    id="patient"
                                    placeholder="Search by patient name..."
                                    value={filters.patient}
                                    onChange={(e) => setFilters({...filters, patient: e.target.value})}
                                    className="rounded-xl"
                                />
                            </div>

                            <div>
                                <Label htmlFor="specialty">Specialty</Label>
                                <Select value={filters.specialty}
                                        onValueChange={(value) => setFilters({...filters, specialty: value})}>
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="All Specialties"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cardiology">All Specialties</SelectItem>
                                        {specialties.map(specialty => (
                                            <SelectItem key={specialty} value={specialty}>
                                                {specialty}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="doctor">Doctor Name</Label>
                                <Input
                                    id="doctor"
                                    placeholder="Search by doctor name..."
                                    value={filters.doctor}
                                    onChange={(e) => setFilters({...filters, doctor: e.target.value})}
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button onClick={resetFilters} variant="outline" className="rounded-xl">
                                Clear Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {filteredData.length === 0 ? (
                        <Card className="shadow-neuro">
                            <CardContent className="p-8 text-center">
                                <FileText className="mx-auto text-gray-400 mb-4" size={48}/>
                                <p className="text-gray-600">No consultations found matching your search criteria.</p>
                                <Button onClick={resetFilters} variant="outline" className="mt-4 rounded-xl">
                                    Clear Filters
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredData.map((doctorData) => (
                            <Card key={doctorData.doctorId} className="shadow-neuro">
                                <CardHeader
                                    className="bg-gradient-to-r from-trust-blue to-blue-600 rounded-t-xl">
                                    <CardTitle className="flex items-center space-x-2">
                                        <Stethoscope size={24}/>
                                        <div>
                                            <h3 className="text-xl font-bold">{doctorData.doctorName}</h3>
                                            <p className="text-gray-400 text-xs">{doctorData.specialty}</p>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-gray-200">
                                        {doctorData.consultations.map((consultation) => (
                                            <Collapsible key={consultation.id}>
                                                <CollapsibleTrigger asChild>
                                                    <div
                                                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                                        onClick={() => toggleConsultationExpanded(consultation.id)}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div
                                                                className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                                                <div className="flex items-center space-x-2">
                                                                    <Calendar className="text-trust-blue" size={16}/>
                                                                    <span
                                                                        className="font-medium">{consultation.date}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <User className="text-healing-green" size={16}/>
                                                                    <span>{consultation.patientName}</span>
                                                                    <Badge variant="outline"
                                                                           className="ml-2">{consultation.patientAge}y</Badge>
                                                                </div>
                                                                <div className="text-sm text-gray-600">
                                                                    {consultation.summary}
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                {expandedConsultations.has(consultation.id) ? (
                                                                    <ChevronUp className="text-gray-400" size={20}/>
                                                                ) : (
                                                                    <ChevronDown className="text-gray-400" size={20}/>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CollapsibleTrigger>

                                                <CollapsibleContent>
                                                    <div className="p-6 bg-gray-50 border-t">
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                            {/* Patient Information */}
                                                            <div>
                                                                <h4 className="font-semibold text-slate-black mb-3 flex items-center">
                                                                    <User className="mr-2 text-trust-blue" size={18}/>
                                                                    Patient Information
                                                                </h4>
                                                                <div className="bg-white rounded-xl p-4 space-y-2">
                                                                    <div className="flex justify-between">
                                                                        <span
                                                                            className="text-gray-600">Full Name:</span>
                                                                        <span
                                                                            className="font-medium">{consultation.fullDetails.fullName}</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span
                                                                            className="text-gray-600">Birth Date:</span>
                                                                        <span
                                                                            className="font-medium">{consultation.fullDetails.birthDate}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Pre-Consultation Assessment */}
                                                            <div>
                                                                <h4 className="font-semibold text-slate-black mb-3 flex items-center">
                                                                    <FileText className="mr-2 text-healing-green"
                                                                              size={18}/>
                                                                    Pre-Consultation Assessment
                                                                </h4>
                                                                <div className="bg-white rounded-xl p-4 space-y-3">
                                                                    <div>
                                                                        <span
                                                                            className="text-sm font-medium text-gray-700">Vital Signs:</span>
                                                                        <div className="text-sm text-gray-600 mt-1">
                                                                            BP: {consultation.fullDetails.preConsultation.vitalSigns.bp} |
                                                                            Pulse: {consultation.fullDetails.preConsultation.vitalSigns.pulse} |
                                                                            Temp: {consultation.fullDetails.preConsultation.vitalSigns.temp} |
                                                                            Weight: {consultation.fullDetails.preConsultation.vitalSigns.weight}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            className="text-sm font-medium text-gray-700">Chief Complaint:</span>
                                                                        <p className="text-sm text-gray-600 mt-1">{consultation.fullDetails.preConsultation.chiefComplaint}</p>
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            className="text-sm font-medium text-gray-700">Current Medications:</span>
                                                                        <p className="text-sm text-gray-600 mt-1">{consultation.fullDetails.preConsultation.medications.join(", ")}</p>
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            className="text-sm font-medium text-gray-700">Allergies:</span>
                                                                        <p className="text-sm text-gray-600 mt-1">{consultation.fullDetails.preConsultation.allergies}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Consultation Details */}
                                                        <div className="mt-6">
                                                            <h4 className="font-semibold text-slate-black mb-3 flex items-center">
                                                                <Stethoscope className="mr-2 text-orange-500"
                                                                             size={18}/>
                                                                Consultation Details
                                                            </h4>
                                                            <div className="bg-white rounded-xl p-4">
                                                                <div className="mb-4">
                                                                    <span
                                                                        className="text-sm font-medium text-gray-700">Description:</span>
                                                                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{consultation.fullDetails.consultation.description}</p>
                                                                </div>

                                                                {consultation.fullDetails.consultation.files.length > 0 && (
                                                                    <div className="mb-4">
                                                                        <span
                                                                            className="text-sm font-medium text-gray-700">Attached Files:</span>
                                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                                            {consultation.fullDetails.consultation.files.map((file, index) => (
                                                                                <Badge key={index} variant="outline"
                                                                                       className="cursor-pointer hover:bg-blue-50">
                                                                                    <Download size={12}
                                                                                              className="mr-1"/>
                                                                                    {file}
                                                                                </Badge>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                <div>
                                                                    <span className="text-sm font-medium text-gray-700">Consultation Transcript:</span>
                                                                    <div
                                                                        className="bg-gray-50 rounded-lg p-3 mt-2 text-sm text-gray-600 italic">
                                                                        {consultation.fullDetails.consultation.transcript}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
