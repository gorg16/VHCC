import type { Doctor, Patient, VitalSigns, MedicalRecord } from "@shared/schema";

export const mockDoctors: Doctor[] = [
  {
    id: 1,
    firstName: "Ahmed",
    lastName: "Fawzi",
    specialty: "E.N.T (Ear, Nose & Throat)",
    medicalCenter: "Al Fanar Medical Center",
    email: "ahmed.fawzi@alfarar.com",
    phone: "+962791234567",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    specialty: "Cardiology",
    medicalCenter: "City Hospital",
    email: "sarah.johnson@cityhospital.com",
    phone: "+962791234568",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Chen",
    specialty: "Dermatology",
    medicalCenter: "Central Clinic",
    email: "michael.chen@centralclinic.com",
    phone: "+962791234569",
  },
];

export const mockMedicalCenters = [
  { id: 1, name: "Al Fanar Medical Center", location: "Amman, Jordan" },
  { id: 2, name: "City Hospital", location: "Dubai, UAE" },
  { id: 3, name: "Central Clinic", location: "Riyadh, Saudi Arabia" },
];

export const arabicCountries = [
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+963", name: "Syria", flag: "🇸🇾" },
  { code: "+964", name: "Iraq", flag: "🇮🇶" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳" },
];

export const mockVitalSigns = [
  { label: "Temperature", value: "36°C" },
  { label: "Blood Pressure", value: "120/80" },
  { label: "Pulse", value: "72 bpm" },
  { label: "Respiratory Rate", value: "18 /min" },
];

export const mockVisitHistory = [
  {
    date: "Dec 1, 2024",
    description: "Routine checkup with Dr. Ahmed Fawzi. Patient complained of seasonal allergies. Prescribed antihistamines.",
  },
  {
    date: "Nov 15, 2024", 
    description: "Follow-up consultation. Patient showing improvement in allergy symptoms. Continue current medication.",
  },
];

export const mockTestResults = [
  { type: "X-Ray", bgColor: "bg-slate-black" },
  { type: "Lab Results", bgColor: "bg-medical-red" },
  { type: "Report", bgColor: "bg-medical-red" },
];

export const mockPatient: Patient = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+96279123456",
  dateOfBirth: "1989-06-15",
  gender: "Male",
  mrn: "00000000",
  nationality: "JORDAN",
  country: "Jordan",
  city: "Amman",
  createdAt: new Date(),
};
