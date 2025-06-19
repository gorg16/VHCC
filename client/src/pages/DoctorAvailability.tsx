import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, User, Save, Copy } from "lucide-react";
import { mockDoctors, mockMedicalCenters } from "@/lib/mockData";

export default function DoctorAvailability() {
  const [selectedCenter, setSelectedCenter] = useState("1");
  const [selectedDoctor, setSelectedDoctor] = useState("1");
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(new Date()));

  const [weekSchedule, setWeekSchedule] = useState({
    Monday: {
      enabled: true,
      morning: { start: "09:00", end: "12:00", enabled: true },
      afternoon: { start: "14:00", end: "17:00", enabled: true },
      appointments: 8, capacity: 14
    },
    Tuesday: {
      enabled: true,
      morning: { start: "09:00", end: "12:00", enabled: true },
      afternoon: { start: "14:00", end: "17:00", enabled: true },
      appointments: 5, capacity: 14
    },
    Wednesday: {
      enabled: true,
      morning: { start: "09:00", end: "12:00", enabled: true },
      afternoon: { start: "13:00", end: "16:00", enabled: true },
      appointments: 12, capacity: 12
    },
    Thursday: {
      enabled: false,
      morning: { start: "09:00", end: "12:00", enabled: false },
      afternoon: { start: "14:00", end: "17:00", enabled: false },
      appointments: 0, capacity: 0
    },
    Friday: {
      enabled: true,
      morning: { start: "08:00", end: "12:00", enabled: true },
      afternoon: { start: "", end: "", enabled: false },
      appointments: 6, capacity: 8
    },
    Saturday: {
      enabled: false,
      morning: { start: "09:00", end: "12:00", enabled: false },
      afternoon: { start: "14:00", end: "17:00", enabled: false },
      appointments: 0, capacity: 0
    },
    Sunday: {
      enabled: false,
      morning: { start: "09:00", end: "12:00", enabled: false },
      afternoon: { start: "14:00", end: "17:00", enabled: false },
      appointments: 0, capacity: 0
    }
  });

  const quickTemplates = [
    {
      name: "Full Time (Mon-Fri)",
      description: "9AM-5PM with lunch break",
      template: {
        Monday: { enabled: true, morning: { start: "09:00", end: "12:00", enabled: true }, afternoon: { start: "13:00", end: "17:00", enabled: true } },
        Tuesday: { enabled: true, morning: { start: "09:00", end: "12:00", enabled: true }, afternoon: { start: "13:00", end: "17:00", enabled: true } },
        Wednesday: { enabled: true, morning: { start: "09:00", end: "12:00", enabled: true }, afternoon: { start: "13:00", end: "17:00", enabled: true } },
        Thursday: { enabled: true, morning: { start: "09:00", end: "12:00", enabled: true }, afternoon: { start: "13:00", end: "17:00", enabled: true } },
        Friday: { enabled: true, morning: { start: "09:00", end: "12:00", enabled: true }, afternoon: { start: "13:00", end: "17:00", enabled: true } },
        Saturday: { enabled: false, morning: { start: "09:00", end: "12:00", enabled: false }, afternoon: { start: "13:00", end: "17:00", enabled: false } },
        Sunday: { enabled: false, morning: { start: "09:00", end: "12:00", enabled: false }, afternoon: { start: "13:00", end: "17:00", enabled: false } }
      }
    },
    {
      name: "Part Time (3 Days)",
      description: "Tue, Thu, Sat mornings only",
      template: {
        Monday: { enabled: false, morning: { start: "09:00", end: "12:00", enabled: false }, afternoon: { start: "13:00", end: "17:00", enabled: false } },
        Tuesday: { enabled: true, morning: { start: "08:00", end: "12:00", enabled: true }, afternoon: { start: "", end: "", enabled: false } },
        Wednesday: { enabled: false, morning: { start: "09:00", end: "12:00", enabled: false }, afternoon: { start: "13:00", end: "17:00", enabled: false } },
        Thursday: { enabled: true, morning: { start: "08:00", end: "12:00", enabled: true }, afternoon: { start: "", end: "", enabled: false } },
        Friday: { enabled: false, morning: { start: "09:00", end: "12:00", enabled: false }, afternoon: { start: "13:00", end: "17:00", enabled: false } },
        Saturday: { enabled: true, morning: { start: "09:00", end: "13:00", enabled: true }, afternoon: { start: "", end: "", enabled: false } },
        Sunday: { enabled: false, morning: { start: "09:00", end: "12:00", enabled: false }, afternoon: { start: "13:00", end: "17:00", enabled: false } }
      }
    }
  ];

  function getWeekDates(date: Date) {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek[0]);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(getWeekDates(newDate));
  };

  const toggleDayEnabled = (day: string) => {
    setWeekSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        enabled: !prev[day as keyof typeof prev].enabled
      }
    }));
  };

  const updateTimeSlot = (day: string, period: 'morning' | 'afternoon', field: 'start' | 'end' | 'enabled', value: string | boolean) => {
    setWeekSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [period]: {
          ...prev[day as keyof typeof prev][period],
          [field]: value
        }
      }
    }));
  };

  const applyTemplate = (templateIndex: number) => {
    const template = quickTemplates[templateIndex];
    if (template) {
      setWeekSchedule(prev => {
        const newSchedule = { ...prev };
        Object.keys(template.template).forEach(day => {
          newSchedule[day as keyof typeof newSchedule] = {
            ...prev[day as keyof typeof prev],
            ...template.template[day as keyof typeof template.template]
          };
        });
        return newSchedule;
      });
    }
  };

  const calculateStats = () => {
    let workingDays = 0;
    let totalHours = 0;
    let totalAppointments = 0;
    let totalCapacity = 0;

    Object.values(weekSchedule).forEach(day => {
      if (day.enabled) {
        workingDays++;
        if (day.morning.enabled && day.morning.start && day.morning.end) {
          totalHours += calculateHours(day.morning.start, day.morning.end);
        }
        if (day.afternoon.enabled && day.afternoon.start && day.afternoon.end) {
          totalHours += calculateHours(day.afternoon.start, day.afternoon.end);
        }
        totalAppointments += day.appointments || 0;
        totalCapacity += day.capacity || 0;
      }
    });

    return { workingDays, totalHours, totalAppointments, totalCapacity };
  };

  const calculateHours = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startTime = new Date(`2000-01-01 ${start}`);
    const endTime = new Date(`2000-01-01 ${end}`);
    return (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  };

  const stats = calculateStats();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
      <div className="min-h-screen  p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-black mb-2">Doctor Availability Management</h1>
            <p className="text-gray-600">Simple weekly schedule builder for medical centers</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <Card className="shadow-neuro">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Medical Center</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedCenter} onValueChange={setSelectedCenter}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMedicalCenters.map(center => (
                        <SelectItem key={center.id} value={center.id.toString()}>
                          {center.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="shadow-neuro">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Doctor</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDoctors.map(doctor => (
                        <SelectItem key={doctor.id.toString()} value={doctor.id.toString()}>
                          {doctor.firstName} {doctor.lastName}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="shadow-neuro">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Week Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => navigateWeek('prev')} variant="outline" size="sm" className="rounded-xl">
                    ←
                  </Button>
                  <div className="text-center flex-1">
                    <p className="text-sm font-medium">
                      {currentWeek[0].toLocaleDateString()} - {currentWeek[6].toLocaleDateString()}
                    </p>
                  </div>
                  <Button onClick={() => navigateWeek('next')} variant="outline" size="sm" className="rounded-xl">
                    →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-neuro">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickTemplates.map((template, index) => (
                      <Button
                          key={index}
                          onClick={() => applyTemplate(index)}
                          variant="outline"
                          size="sm"
                          className="w-full rounded-xl text-left justify-start"
                      >
                        <Copy size={14} className="mr-2" />
                        {template.name}
                      </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="shadow-neuro">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="text-healing-green" size={20} />
                  <div>
                    <p className="text-2xl font-bold text-slate-black">{stats.workingDays}</p>
                    <p className="text-sm text-gray-600">Working Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-neuro">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="text-blue-500" size={20} />
                  <div>
                    <p className="text-2xl font-bold text-slate-black">{Math.round(stats.totalHours)}</p>
                    <p className="text-sm text-gray-600">Total Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-neuro">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="text-orange-500" size={20} />
                  <div>
                    <p className="text-2xl font-bold text-slate-black">{stats.totalAppointments}</p>
                    <p className="text-sm text-gray-600">Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Schedule Grid */}
          <Card className="shadow-neuro">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="text-healing-green" size={24} />
                  <span>Weekly Schedule</span>
                </CardTitle>
                <Button className="bg-healing-green hover:bg-green-600 rounded-xl">
                  <Save size={16} className="mr-2" />
                  Save Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                {daysOfWeek.map((day, index) => {
                  const daySchedule = weekSchedule[day as keyof typeof weekSchedule];
                  const currentDate = currentWeek[index];

                  return (
                      <div key={day} className={`border rounded-xl p-4 ${daySchedule.enabled ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="text-center mb-4">
                          <h3 className="font-semibold text-slate-black">{day}</h3>
                          <p className="text-sm text-gray-600">{currentDate.toLocaleDateString()}</p>
                          <div className="mt-2">
                            <Switch
                                checked={daySchedule.enabled}
                                onCheckedChange={() => toggleDayEnabled(day)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {daySchedule.enabled ? 'Working' : 'Off'}
                            </p>
                          </div>
                        </div>

                        {daySchedule.enabled && (
                            <div className="space-y-4">
                              {/* Morning Slot */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium">Morning</Label>
                                  <Switch
                                      checked={daySchedule.morning.enabled}
                                      onCheckedChange={(checked) => updateTimeSlot(day, 'morning', 'enabled', checked)}
                                  />
                                </div>
                                {daySchedule.morning.enabled && (
                                    <div className="grid gap-2">
                                      <Input
                                          type="time"
                                          value={daySchedule.morning.start}
                                          onChange={(e) => updateTimeSlot(day, 'morning', 'start', e.target.value)}
                                          className="rounded-lg text-sm"
                                      />
                                      <Input
                                          type="time"
                                          value={daySchedule.morning.end}
                                          onChange={(e) => updateTimeSlot(day, 'morning', 'end', e.target.value)}
                                          className="rounded-lg text-sm"
                                      />
                                    </div>
                                )}
                              </div>

                              {/* Afternoon Slot */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium">Afternoon</Label>
                                  <Switch
                                      checked={daySchedule.afternoon.enabled}
                                      onCheckedChange={(checked) => updateTimeSlot(day, 'afternoon', 'enabled', checked)}
                                  />
                                </div>
                                {daySchedule.afternoon.enabled && (
                                    <div className="grid gap-2">
                                      <Input
                                          type="time"
                                          value={daySchedule.afternoon.start}
                                          onChange={(e) => updateTimeSlot(day, 'afternoon', 'start', e.target.value)}
                                          className="rounded-lg text-sm"
                                      />
                                      <Input
                                          type="time"
                                          value={daySchedule.afternoon.end}
                                          onChange={(e) => updateTimeSlot(day, 'afternoon', 'end', e.target.value)}
                                          className="rounded-lg text-sm"
                                      />
                                    </div>
                                )}
                              </div>

                              {/* Appointment Info */}
                              <div className="pt-2 border-t border-gray-200">
                                <div className="text-center">
                                  <p className="text-lg font-semibold text-slate-black">
                                    {daySchedule.appointments}/{daySchedule.capacity}
                                  </p>
                                  <p className="text-xs text-gray-600">Appointments</p>
                                  <Badge
                                      className={`mt-1 ${
                                          (daySchedule.appointments / Math.max(daySchedule.capacity, 1)) > 0.8 ?
                                              'bg-red-100 text-red-800' :
                                              'bg-green-100 text-green-800'
                                      }`}
                                  >
                                    {daySchedule.capacity > 0 ?
                                        Math.round((daySchedule.appointments / daySchedule.capacity) * 100) : 0}% Full
                                  </Badge>
                                </div>
                              </div>
                            </div>
                        )}
                      </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
