import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Image, Download, Save, AlertTriangle, Clock } from "lucide-react";

export default function EMRVisitNote() {
  const [visitNote, setVisitNote] = useState({
    chiefComplaint: "",
    historyOfPresentIllness: "",
    reviewOfSystems: "",
    pastMedicalHistory: "",
    medications: "",
    allergies: "NKDA",
    socialHistory: "",
    physicalExam: {
      general: "",
      vital: "BP: 120/80, HR: 72, Temp: 98.6°F, RR: 16, O2Sat: 98%",
      heent: "",
      cardiovascular: "",
      respiratory: "",
      abdomen: "",
      neurological: "",
      skin: ""
    },
    assessment: "",
    plan: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "Blood_Test_Results.pdf",
      type: "lab",
      size: "2.3 MB",
      uploadDate: "2024-06-19",
      status: "processed"
    },
    {
      id: 2,
      name: "Chest_Xray.jpg",
      type: "image",
      size: "1.8 MB",
      uploadDate: "2024-06-19",
      status: "processed"
    }
  ]);

  const [allergies, setAllergies] = useState([
    { id: 1, allergen: "Penicillin", reaction: "Rash", severity: "Moderate" },
    { id: 2, allergen: "Shellfish", reaction: "Anaphylaxis", severity: "Severe" }
  ]);

  const [chronicConditions, setChronicConditions] = useState([
    { id: 1, condition: "Type 2 Diabetes", diagnosed: "2020", status: "Controlled" },
    { id: 2, condition: "Hypertension", diagnosed: "2018", status: "Well-controlled" }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'lab' : 'document',
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: "processing"
        };
        setUploadedFiles(prev => [...prev, newFile]);
      });
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-black mb-2">EMR Visit Note & File Upload</h1>
          <p className="text-gray-600">Structured clinical documentation and file management</p>
        </div>

        <Tabs defaultValue="visit-note" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="visit-note">Visit Note</TabsTrigger>
            <TabsTrigger value="files">Files & Reports</TabsTrigger>
            <TabsTrigger value="allergies">Allergies</TabsTrigger>
            <TabsTrigger value="conditions">Chronic Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="visit-note" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* History of Present Illness */}
              <Card className="shadow-neuro">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="text-healing-green" size={20} />
                    <span>History of Present Illness (HPI)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Chief Complaint</Label>
                    <Textarea
                      placeholder="Patient's main concern or reason for visit"
                      value={visitNote.chiefComplaint}
                      onChange={(e) => setVisitNote({...visitNote, chiefComplaint: e.target.value})}
                      className="rounded-xl"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>History of Present Illness</Label>
                    <Textarea
                      placeholder="Detailed description of the current illness"
                      value={visitNote.historyOfPresentIllness}
                      onChange={(e) => setVisitNote({...visitNote, historyOfPresentIllness: e.target.value})}
                      className="rounded-xl"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Review of Systems</Label>
                    <Textarea
                      placeholder="Systematic review of body systems"
                      value={visitNote.reviewOfSystems}
                      onChange={(e) => setVisitNote({...visitNote, reviewOfSystems: e.target.value})}
                      className="rounded-xl"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Physical Examination */}
              <Card className="shadow-neuro">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="text-healing-green" size={20} />
                    <span>Physical Examination</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>General Appearance</Label>
                    <Textarea
                      placeholder="Overall appearance and demeanor"
                      value={visitNote.physicalExam.general}
                      onChange={(e) => setVisitNote({
                        ...visitNote, 
                        physicalExam: {...visitNote.physicalExam, general: e.target.value}
                      })}
                      className="rounded-xl"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Vital Signs</Label>
                    <Input
                      placeholder="BP, HR, Temp, RR, O2Sat"
                      value={visitNote.physicalExam.vital}
                      onChange={(e) => setVisitNote({
                        ...visitNote, 
                        physicalExam: {...visitNote.physicalExam, vital: e.target.value}
                      })}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Cardiovascular</Label>
                    <Textarea
                      placeholder="Heart examination findings"
                      value={visitNote.physicalExam.cardiovascular}
                      onChange={(e) => setVisitNote({
                        ...visitNote, 
                        physicalExam: {...visitNote.physicalExam, cardiovascular: e.target.value}
                      })}
                      className="rounded-xl"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Respiratory</Label>
                    <Textarea
                      placeholder="Lung examination findings"
                      value={visitNote.physicalExam.respiratory}
                      onChange={(e) => setVisitNote({
                        ...visitNote, 
                        physicalExam: {...visitNote.physicalExam, respiratory: e.target.value}
                      })}
                      className="rounded-xl"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Assessment & Plan */}
              <Card className="shadow-neuro lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="text-healing-green" size={20} />
                    <span>Assessment & Plan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Assessment</Label>
                    <Textarea
                      placeholder="Clinical assessment and differential diagnosis"
                      value={visitNote.assessment}
                      onChange={(e) => setVisitNote({...visitNote, assessment: e.target.value})}
                      className="rounded-xl"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Plan</Label>
                    <Textarea
                      placeholder="Treatment plan, medications, follow-up"
                      value={visitNote.plan}
                      onChange={(e) => setVisitNote({...visitNote, plan: e.target.value})}
                      className="rounded-xl"
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button className="bg-healing-green hover:bg-green-600 rounded-xl">
                      <Save size={16} className="mr-2" />
                      Save Note
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      Generate Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Upload className="text-healing-green" size={24} />
                    <span>File Upload & Management</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="rounded-xl">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                        <Upload size={16} className="mr-2" />
                        Upload Files
                      </label>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="border rounded-xl p-4 bg-white">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {file.type === 'image' ? (
                              <Image className="text-blue-600" size={20} />
                            ) : (
                              <FileText className="text-blue-600" size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-black">{file.name}</p>
                            <p className="text-sm text-gray-600">{file.size} • {file.uploadDate}</p>
                          </div>
                          <Badge className={
                            file.status === 'processed' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {file.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Download size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allergies" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="text-red-500" size={24} />
                  <span>Allergy Summary Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergies.map((allergy) => (
                    <div key={allergy.id} className="border rounded-xl p-4 bg-red-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-slate-black">{allergy.allergen}</h3>
                          <p className="text-sm text-gray-600">Reaction: {allergy.reaction}</p>
                        </div>
                        <Badge className={
                          allergy.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                          allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {allergy.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conditions" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="text-healing-green" size={24} />
                  <span>Chronic Conditions Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chronicConditions.map((condition) => (
                    <div key={condition.id} className="border rounded-xl p-4 bg-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-slate-black">{condition.condition}</h3>
                          <p className="text-sm text-gray-600">Diagnosed: {condition.diagnosed}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {condition.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
