import { Stethoscope } from "lucide-react";

export default function VHCCLogo() {
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-warm-amber p-2 rounded-xl shadow-neuro">
        <Stethoscope className="text-white text-xl" size={24} />
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-black">VHCC</h1>
        <p className="text-xs text-gray-500">Virtual Healthcare Clinic</p>
      </div>
    </div>
  );
}
