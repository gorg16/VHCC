import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  History, 
  FileText, 
  Video, 
  Mic, 
  Phone, 
  Settings,
  UserRound,
  User,
  Stethoscope,
  FileImage,
  File
} from "lucide-react";
import { mockVitalSigns, mockVisitHistory, mockTestResults } from "../lib/mockData";

export default function Consultation() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-black mb-2">Virtual Consultation</h2>
        <p className="text-gray-600">Connect with your healthcare provider remotely</p>
      </div>

      {/* Consultation Dashboard */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Vital Signs */}
        <Card className="shadow-neuro">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-black mb-4 flex items-center">
              <Heart className="text-medical-red mr-2" size={20} />
              Vital Signs
            </h3>
            
            <div className="space-y-4">
              {mockVitalSigns.map((vital, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{vital.label}</span>
                  <span className="font-semibold text-slate-black bg-gray-50 px-3 py-1 rounded-lg">
                    {vital.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Visits History */}
        <Card className="shadow-neuro">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-black mb-4 flex items-center">
              <History className="text-trust-blue mr-2" size={20} />
              Visit History
            </h3>
            
            <div className="space-y-4">
              {mockVisitHistory.map((visit, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <div className="font-medium text-slate-black mb-1">Visit {index + 1}</div>
                  <p className="text-sm text-gray-600">{visit.description}</p>
                  <div className="text-xs text-gray-500 mt-2">{visit.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Tests */}
        <Card className="shadow-neuro">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-black mb-4 flex items-center">
              <FileText className="text-healing-green mr-2" size={20} />
              Latest Tests
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                {mockTestResults.map((test, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 ${test.bgColor} rounded-xl flex items-center justify-center shadow-neuro mb-2`}>
                      {test.type === "X-Ray" ? (
                        <FileImage className="text-white text-xl" size={24} />
                      ) : (
                        <File className="text-white text-xl" size={24} />
                      )}
                    </div>
                    <span className="text-sm font-medium">{test.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Consultation Interface */}
      <Card className="shadow-neuro">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-slate-black mb-2">Virtual Consultation Session</h3>
            <p className="text-gray-600">Connect with Dr. Ahmed Fawzi</p>
          </div>

          {/* Video Call Interface Mockup */}
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-6" style={{height: "400px"}}>
            {/* Main video area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-neuro">
                  <Video className="text-white text-3xl" size={48} />
                </div>
                <h4 className="text-lg font-semibold text-slate-black mb-2">Video Call Ready</h4>
                <p className="text-gray-600">Dr. Ahmed Fawzi will join shortly</p>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <div className="w-2 h-2 bg-healing-green rounded-full animate-pulse"></div>
                  <span className="text-sm text-healing-green font-medium">Waiting for doctor</span>
                </div>
              </div>
            </div>

            {/* Doctor's video placeholder */}
            <div className="absolute top-4 left-4 w-48 h-32 bg-white rounded-xl shadow-neuro flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-2">
                  <UserRound className="text-white" size={24} />
                </div>
                <div className="text-xs font-medium">Dr. Ahmed Fawzi</div>
                <div className="text-xs text-gray-500">Medical Center</div>
              </div>
            </div>

            {/* Patient's video placeholder */}
            <div className="absolute top-4 right-4 w-48 h-32 bg-white rounded-xl shadow-neuro flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-healing-green rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="text-white" size={24} />
                </div>
                <div className="text-xs font-medium">John Doe</div>
                <div className="text-xs text-gray-500">Al Fanar Medical</div>
              </div>
            </div>

            {/* VHCC Connection Indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-warm-amber p-4 rounded-2xl shadow-neuro">
                <div className="text-center">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Stethoscope className="text-warm-amber" size={20} />
                  </div>
                  <div className="text-white font-bold text-sm">VHCC</div>
                </div>
              </div>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="25%" y1="30%" x2="50%" y2="50%" stroke="var(--trust-blue)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite"/>
              </line>
              <line x1="75%" y1="30%" x2="50%" y2="50%" stroke="var(--healing-green)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite"/>
              </line>
            </svg>
          </div>

          {/* Call Controls */}
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-full shadow-neuro">
              <Mic className="text-gray-600" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-full shadow-neuro">
              <Video className="text-gray-600" size={20} />
            </Button>
            <Button size="icon" className="w-12 h-12 bg-medical-red hover:bg-red-600 rounded-full shadow-neuro">
              <Phone className="text-white" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-full shadow-neuro">
              <Settings className="text-gray-600" size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
