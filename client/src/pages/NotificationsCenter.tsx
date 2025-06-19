import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Mail, MessageSquare, CreditCard, Clock, Settings } from "lucide-react";

export default function NotificationsCenter() {
  const [notificationSettings, setNotificationSettings] = useState({
    smsReminders: true,
    emailReminders: true,
    appointmentConfirmations: true,
    paymentAlerts: true,
    doctorUpdates: false,
    promotionalEmails: false
  });

  const [notificationHistory, setNotificationHistory] = useState([
    {
      id: 1,
      type: "appointment",
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Johnson is tomorrow at 10:00 AM",
      timestamp: "2024-06-19 14:30",
      method: "SMS",
      status: "delivered"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Confirmation",
      message: "Payment of $150 received for consultation",
      timestamp: "2024-06-18 16:45",
      method: "Email",
      status: "delivered"
    },
    {
      id: 3,
      type: "reminder",
      title: "Follow-up Reminder",
      message: "Time for your follow-up appointment scheduling",
      timestamp: "2024-06-17 09:00",
      method: "SMS",
      status: "delivered"
    }
  ]);

  const [paymentAlerts, setPaymentAlerts] = useState([
    {
      id: 2,
      type: "payment_received",
      amount: "$200",
      service: "Dermatology Follow-up",
      date: "2024-06-18",
      status: "completed"
    }
  ]);

  const updateNotificationSetting = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment": return <Clock className="text-blue-600" size={20} />;
      case "payment": return <CreditCard className="text-green-600" size={20} />;
      case "reminder": return <Bell className="text-orange-600" size={20} />;
      default: return <Bell className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-black mb-2">Notifications Center</h1>
          <p className="text-gray-600">Manage your notification preferences and history</p>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="payments">Payment Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-neuro">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="text-healing-green" size={24} />
                    <span>SMS/Text Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-black">Appointment Reminders</p>
                      <p className="text-sm text-gray-600">24-hour and 1-hour before appointments</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsReminders}
                      onCheckedChange={(checked) => updateNotificationSetting('smsReminders', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-black">Appointment Confirmations</p>
                      <p className="text-sm text-gray-600">When appointments are scheduled or changed</p>
                    </div>
                    <Switch
                      checked={notificationSettings.appointmentConfirmations}
                      onCheckedChange={(checked) => updateNotificationSetting('appointmentConfirmations', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-black">Payment Reminders</p>
                      <p className="text-sm text-gray-600">Payment due dates and confirmations</p>
                    </div>
                    <Switch
                      checked={notificationSettings.paymentAlerts}
                      onCheckedChange={(checked) => updateNotificationSetting('paymentAlerts', checked)}
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-700">
                      <strong>Current Phone:</strong> +971 55 512 3456
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-neuro">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="text-healing-green" size={24} />
                    <span>Email Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-black">Appointment Reminders</p>
                      <p className="text-sm text-gray-600">Email summaries of upcoming appointments</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailReminders}
                      onCheckedChange={(checked) => updateNotificationSetting('emailReminders', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-black">Doctor Updates</p>
                      <p className="text-sm text-gray-600">Schedule changes and availability updates</p>
                    </div>
                    <Switch
                      checked={notificationSettings.doctorUpdates}
                      onCheckedChange={(checked) => updateNotificationSetting('doctorUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-black">Promotional Emails</p>
                      <p className="text-sm text-gray-600">Health tips and service updates</p>
                    </div>
                    <Switch
                      checked={notificationSettings.promotionalEmails}
                      onCheckedChange={(checked) => updateNotificationSetting('promotionalEmails', checked)}
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-700">
                      <strong>Current Email:</strong> ahmed.alrashid@email.com
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-neuro">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="text-healing-green" size={24} />
                  <span>Notification History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationHistory.map((notification) => (
                    <div key={notification.id} className="border rounded-xl p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-black">{notification.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">{notification.timestamp}</span>
                              <Badge variant="outline" className="text-xs">
                                {notification.method}
                              </Badge>
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                {notification.status}
                              </Badge>
                            </div>
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
                  <span>Payment Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentAlerts.map((alert) => (
                    <div key={alert.id} className="border rounded-xl p-4 bg-white">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <CreditCard className={
                            alert.type === 'payment_due' ? 'text-orange-600' : 'text-green-600'
                          } size={20} />
                          <div>
                            <h3 className="font-semibold text-slate-black">
                              {alert.type === 'payment_due' ? 'Payment Due' : 'Payment Received'}
                            </h3>
                            <p className="text-sm text-gray-600">{alert.service}</p>
                            <p className="text-xs text-gray-500">
                              Paid: ${alert.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-black">{alert.amount}</p>
                          <Badge className={
                            alert.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                          }>
                            {alert.status}
                          </Badge>
                        </div>
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
