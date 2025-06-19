import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, Lock, Shield, Bell, Save } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: "Ahmed",
    lastName: "Al-Rashid", 
    email: "ahmed.alrashid@email.com",
    phone: "555123456",
    countryCode: "+971"
  });

  const [emailVerification, setEmailVerification] = useState({
    currentEmail: "ahmed.alrashid@email.com",
    newEmail: "",
    verificationSent: false,
    verified: false
  });

  const [phoneChange, setPhoneChange] = useState({
    currentPhone: "+971 55 512 3456",
    newPhone: "",
    newCountryCode: "+971",
    emailLinkSent: false
  });

  const [passwordReset, setPasswordReset] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    resetEmailSent: false
  });

  const handleEmailVerification = () => {
    setEmailVerification(prev => ({ ...prev, verificationSent: true }));
  };

  const handlePhoneChangeRequest = () => {
    setPhoneChange(prev => ({ ...prev, emailLinkSent: true }));
  };

  const handlePasswordReset = () => {
    setPasswordReset(prev => ({ ...prev, resetEmailSent: true }));
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-black mb-2">Profile & Account Settings</h1>
          <p className="text-gray-600">Manage your personal information and security settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="text-healing-green" size={24} />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-healing-green hover:bg-green-600 rounded-xl">
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="text-healing-green" size={24} />
                  <span>Email Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-black">Current Email</p>
                      <p className="text-sm text-gray-600">{emailVerification.currentEmail}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>New Email Address</Label>
                    <Input
                      type="email"
                      placeholder="Enter new email address"
                      value={emailVerification.newEmail}
                      onChange={(e) => setEmailVerification({...emailVerification, newEmail: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>

                  {emailVerification.verificationSent ? (
                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Mail className="text-warm-amber" size={20} />
                        <div>
                          <p className="font-medium text-slate-black">Verification Email Sent</p>
                          <p className="text-sm text-gray-600">
                            Please check your new email and click the verification link
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleEmailVerification}
                      disabled={!emailVerification.newEmail}
                      className="bg-healing-green hover:bg-green-600 rounded-xl"
                    >
                      Send Verification Email
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phone" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="text-healing-green" size={24} />
                  <span>Phone Number Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-black">Current Phone</p>
                      <p className="text-sm text-gray-600">{phoneChange.currentPhone}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>New Phone Number</Label>
                    <PhoneInput
                      value={phoneChange.newPhone}
                      onChange={(value) => setPhoneChange({...phoneChange, newPhone: value})}
                      countryCode={phoneChange.newCountryCode}
                      onCountryCodeChange={(code) => setPhoneChange({...phoneChange, newCountryCode: code})}
                      placeholder="Enter new phone number"
                    />
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <Shield className="text-warm-amber" size={20} />
                      <div>
                        <p className="font-medium text-slate-black">Security Notice</p>
                        <p className="text-sm text-gray-600">
                          Phone number changes require email confirmation for security
                        </p>
                      </div>
                    </div>
                  </div>

                  {phoneChange.emailLinkSent ? (
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Mail className="text-healing-green" size={20} />
                        <div>
                          <p className="font-medium text-slate-black">Email Link Sent</p>
                          <p className="text-sm text-gray-600">
                            Check your email and click the link to confirm phone number change
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handlePhoneChangeRequest}
                      disabled={!phoneChange.newPhone}
                      className="bg-healing-green hover:bg-green-600 rounded-xl"
                    >
                      Request Phone Change
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="text-healing-green" size={24} />
                  <span>Password & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      value={passwordReset.currentPassword}
                      onChange={(e) => setPasswordReset({...passwordReset, currentPassword: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      value={passwordReset.newPassword}
                      onChange={(e) => setPasswordReset({...passwordReset, newPassword: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordReset.confirmPassword}
                      onChange={(e) => setPasswordReset({...passwordReset, confirmPassword: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>

                  {passwordReset.resetEmailSent ? (
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Shield className="text-healing-green" size={20} />
                        <div>
                          <p className="font-medium text-slate-black">Password Updated</p>
                          <p className="text-sm text-gray-600">
                            Your password has been successfully changed
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex space-x-4">
                      <Button 
                        onClick={handlePasswordReset}
                        className="bg-healing-green hover:bg-green-600 rounded-xl"
                      >
                        Update Password
                      </Button>
                      <Button variant="outline" className="rounded-xl">
                        Send Reset Email
                      </Button>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-slate-black mb-4">Security Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Two-Factor Authentication</span>
                      <Badge className="bg-red-100 text-red-800">Disabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Login Notifications</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
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
