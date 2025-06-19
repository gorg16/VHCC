import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Building, CreditCard, Globe, Plus, Edit, Trash2, Save } from "lucide-react";

export default function AdminConfiguration() {
  const [specialties, setSpecialties] = useState([
    { id: 1, name: "Cardiology", active: true, centerCount: 3 },
    { id: 2, name: "Dermatology", active: true, centerCount: 2 },
    { id: 3, name: "Pediatrics", active: false, centerCount: 1 },
    { id: 4, name: "Orthopedics", active: true, centerCount: 4 }
  ]);

  const [centers, setCenters] = useState([
    {
      id: 1,
      name: "VHCC Dubai Marina",
      address: "Marina Walk, Dubai Marina",
      phone: "+971 4 123 4567",
      email: "marina@vhcc.ae",
      active: true,
      specialties: ["Cardiology", "Dermatology"]
    },
    {
      id: 2,
      name: "VHCC Downtown",
      address: "Business Bay, Downtown Dubai",
      phone: "+971 4 234 5678",
      email: "downtown@vhcc.ae",
      active: true,
      specialties: ["Pediatrics", "Orthopedics"]
    }
  ]);

  const [paymentProviders, setPaymentProviders] = useState([
    {
      id: 1,
      name: "Stripe",
      type: "Credit Card",
      status: "active",
      testMode: false,
      publicKey: "pk_live_****",
      secretKey: "sk_live_****"
    },
    {
      id: 2,
      name: "PayPal",
      type: "Digital Wallet",
      status: "inactive",
      testMode: true,
      clientId: "client_****",
      clientSecret: "secret_****"
    }
  ]);

  const [localization, setLocalization] = useState<any>({
    defaultLanguage: "en",
    supportedLanguages: ["en", "ar", "fr"],
    strings: {
      en: {
        "welcome_message": "Welcome to VHCC",
        "book_appointment": "Book Appointment",
        "consultation_fee": "Consultation Fee"
      },
      ar: {
        "welcome_message": "مرحباً بكم في VHCC",
        "book_appointment": "احجز موعد",
        "consultation_fee": "رسوم الاستشارة"
      },
      fr: {
        "welcome_message": "Bienvenue à VHCC",
        "book_appointment": "Prendre rendez-vous",
        "consultation_fee": "Frais de consultation"
      }
    }
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const [newCenter, setNewCenter] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    specialties: []
  });

  const addSpecialty = () => {
    if (newSpecialty) {
      setSpecialties([...specialties, {
        id: Date.now(),
        name: newSpecialty,
        active: true,
        centerCount: 0
      }]);
      setNewSpecialty("");
    }
  };

  const toggleSpecialtyStatus = (id: number) => {
    setSpecialties(specialties.map(specialty =>
      specialty.id === id ? { ...specialty, active: !specialty.active } : specialty
    ));
  };

  const togglePaymentProvider = (id: number) => {
    setPaymentProviders(providers =>
      providers.map(provider =>
        provider.id === id ? {
          ...provider,
          status: provider.status === 'active' ? 'inactive' : 'active'
        } : provider
      )
    );
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-black mb-2">Admin / System Configuration</h1>
          <p className="text-gray-600">Manage system settings, specialties, centers, and integrations</p>
        </div>

        <Tabs defaultValue="specialties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
            <TabsTrigger value="centers">Centers</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
          </TabsList>

          <TabsContent value="specialties" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="text-healing-green" size={24} />
                    <span>Specialty Management</span>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add new specialty"
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      className="rounded-xl w-48"
                    />
                    <Button onClick={addSpecialty} className="bg-healing-green hover:bg-green-600 rounded-xl">
                      <Plus size={16} className="mr-2" />
                      Add
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {specialties.map((specialty) => (
                    <div key={specialty.id} className="border rounded-xl p-4 bg-white">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-slate-black">{specialty.name}</h3>
                          <Badge className={specialty.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {specialty.active ? 'Active' : 'Inactive'}
                          </Badge>
                          <span className="text-sm text-gray-600">{specialty.centerCount} centers</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => toggleSpecialtyStatus(specialty.id)}
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                          >
                            {specialty.active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            <Edit size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-xl text-red-600">
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

          <TabsContent value="centers" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building className="text-healing-green" size={24} />
                    <span>Medical Center Setup</span>
                  </div>
                  <Button className="bg-healing-green hover:bg-green-600 rounded-xl">
                    <Plus size={16} className="mr-2" />
                    Add Center
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {centers.map((center) => (
                    <div key={center.id} className="border rounded-xl p-6 bg-white">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label>Center Name</Label>
                            <Input value={center.name} className="rounded-xl" />
                          </div>
                          <div>
                            <Label>Address</Label>
                            <Input value={center.address} className="rounded-xl" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Phone</Label>
                              <Input value={center.phone} className="rounded-xl" />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input value={center.email} className="rounded-xl" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label>Available Specialties</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {center.specialties.map((specialty, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-800">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge className={center.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {center.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="flex space-x-2 pt-4">
                            <Button size="sm" className="bg-healing-green hover:bg-green-600 rounded-xl">
                              <Save size={16} className="mr-2" />
                              Save
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-xl">
                              <Edit size={16} className="mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="text-healing-green" size={24} />
                  <span>Payment Provider Credentials</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {paymentProviders.map((provider) => (
                    <div key={provider.id} className="border rounded-xl p-6 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <h3 className="text-lg font-semibold text-slate-black">{provider.name}</h3>
                          <Badge className={provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {provider.status}
                          </Badge>
                          <Badge variant="outline">
                            {provider.testMode ? 'Test Mode' : 'Live Mode'}
                          </Badge>
                        </div>
                        <Button
                          onClick={() => togglePaymentProvider(provider.id)}
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                        >
                          {provider.status === 'active' ? 'Disable' : 'Enable'}
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Public Key / Client ID</Label>
                          <Input
                            type="password"
                            value={provider.name === 'Stripe' ? provider.publicKey : provider.clientId}
                            className="rounded-xl"
                          />
                        </div>
                        <div>
                          <Label>Secret Key / Client Secret</Label>
                          <Input
                            type="password"
                            value={provider.name === 'Stripe' ? provider.secretKey : provider.clientSecret}
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={provider.testMode}
                              onChange={() => {}}
                            />
                            <span className="text-sm">Test Mode</span>
                          </label>
                        </div>
                        <Button size="sm" className="bg-healing-green hover:bg-green-600 rounded-xl">
                          <Save size={16} className="mr-2" />
                          Save Configuration
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="localization" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="text-healing-green" size={24} />
                  <span>Localization Strings (FR/AR/EN)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Default Language</Label>
                      <Select value={localization.defaultLanguage}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English (EN)</SelectItem>
                          <SelectItem value="ar">العربية (AR)</SelectItem>
                          <SelectItem value="fr">Français (FR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label>Supported Languages</Label>
                      <div className="flex space-x-2 mt-2">
                        {localization.supportedLanguages.map((lang: any) => (
                          <Badge key={lang} className="bg-blue-100 text-blue-800">
                            {lang.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-black">Translation Strings</h4>
                    {Object.keys(localization.strings.en).map((key) => (
                      <div key={key} className="border rounded-xl p-4 bg-gray-50">
                        <Label className="text-sm font-medium">{key.replace(/_/g, ' ').toUpperCase()}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                          <div>
                            <Label className="text-xs">English</Label>
                            <Input
                              value={localization.strings.en[key]}
                              className="rounded-xl"
                              onChange={(e) => {
                                setLocalization((prev: any) => ({
                                  ...prev,
                                  strings: {
                                    ...prev.strings,
                                    en: { ...prev.strings.en, [key]: e.target.value }
                                  }
                                }));
                              }}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Arabic</Label>
                            <Input
                              value={localization.strings.ar[key]}
                              className="rounded-xl"
                              dir="rtl"
                              onChange={(e) => {
                                setLocalization((prev: any) => ({
                                  ...prev,
                                  strings: {
                                    ...prev.strings,
                                    ar: { ...prev.strings.ar, [key]: e.target.value }
                                  }
                                }));
                              }}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">French</Label>
                            <Input
                              value={localization.strings.fr[key]}
                              className="rounded-xl"
                              onChange={(e) => {
                                setLocalization((prev: any) => ({
                                  ...prev,
                                  strings: {
                                    ...prev.strings,
                                    fr: { ...prev.strings.fr, [key]: e.target.value }
                                  }
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-healing-green hover:bg-green-600 rounded-xl">
                      <Save size={16} className="mr-2" />
                      Save Translations
                    </Button>
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
