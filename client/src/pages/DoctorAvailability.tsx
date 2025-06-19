import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, User, Save, Copy, Plus, Trash2 } from "lucide-react";
import { mockDoctors, mockMedicalCenters } from "@/lib/mockData";

export default function DoctorAvailability() {
  const [selectedCenter, setSelectedCenter] = useState("1");
  const [selectedDoctor, setSelectedDoctor] = useState("1");
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(new Date()));

  const [weeklyAvailability, setWeeklyAvailability] = useState({
    Monday: {
      isWorking: true,
      timeSlots: [
        { id: 1, startTime: "09:00", endTime: "12:00", slotDuration: 30 },
        { id: 2, startTime: "14:00", endTime: "17:00", slotDuration: 30 }
      ]
    },
    Tuesday: {
      isWorking: true,
      timeSlots: [
        { id: 1, startTime: "09:00", endTime: "12:00", slotDuration: 30 },
        { id: 2, startTime: "14:00", endTime: "17:00", slotDuration: 30 }
      ]
    },
    Wednesday: {
      isWorking: true,
      timeSlots: [
        { id: 1, startTime: "09:00", endTime: "13:00", slotDuration: 30 }
      ]
    },
    Thursday: {
      isWorking: false,
      timeSlots: []
    },
    Friday: {
      isWorking: true,
      timeSlots: [
        { id: 1, startTime: "08:00", endTime: "12:00", slotDuration: 30 }
      ]
    },
    Saturday: {
      isWorking: false,
      timeSlots: []
    },
    Sunday: {
      isWorking: false,
      timeSlots: []
    }
  });

  const [bookedAppointments, setBookedAppointments] = useState([
    { id: 1, day: "Monday", time: "09:00", patientName: "Ahmed Al-Rashid", duration: 30 },
    { id: 2, day: "Monday", time: "09:30", patientName: "Sara Mohammed", duration: 30 },
    { id: 3, day: "Monday", time: "14:30", patientName: "Omar Hassan", duration: 30 },
    { id: 4, day: "Tuesday", time: "10:00", patientName: "Fatima Ali", duration: 30 },
    { id: 5, day: "Wednesday", time: "09:00", patientName: "Khalid Ibrahim", duration: 30 },
    { id: 6, day: "Wednesday", time: "10:30", patientName: "Layla Ahmad", duration: 30 },
    { id: 7, day: "Friday", time: "08:30", patientName: "Noor Saleh", duration: 30 }
  ]);

  const quickTemplates = [
    {
      name: "Full Time (Mon-Fri)",
      description: "Standard 40-hour week",
      schedule: {
        Monday: { isWorking: true, timeSlots: [{ id: 1, startTime: "09:00", endTime: "12:00", slotDuration: 30 }, { id: 2, startTime: "13:00", endTime: "17:00", slotDuration: 30 }] },
        Tuesday: { isWorking: true, timeSlots: [{ id: 1, startTime: "09:00", endTime: "12:00", slotDuration: 30 }, { id: 2, startTime: "13:00", endTime: "17:00", slotDuration: 30 }] },
        Wednesday: { isWorking: true, timeSlots: [{ id: 1, startTime: "09:00", endTime: "12:00", slotDuration: 30 }, { id: 2, startTime: "13:00", endTime: "17:00", slotDuration: 30 }] },
        Thursday: { isWorking: true, timeSlots: [{ id: 1, startTime: "09:00", endTime: "12:00", slotDuration: 30 }, { id: 2, startTime: "13:00", endTime: "17:00", slotDuration: 30 }] },
        Friday: { isWorking: true, timeSlots: [{ id: 1, startTime: "09:00", endTime: "12:00", slotDuration: 30 }, { id: 2, startTime: "13:00", endTime: "17:00", slotDuration: 30 }] },
        Saturday: { isWorking: false, timeSlots: [] },
        Sunday: { isWorking: false, timeSlots: [] }
      }
    },
    {
      name: "Part Time (3 Days)",
      description: "Morning shifts only",
      schedule: {
        Monday: { isWorking: false, timeSlots: [] },
        Tuesday: { isWorking: true, timeSlots: [{ id: 1, startTime: "08:00", endTime: "12:00", slotDuration: 30 }] },
        Wednesday: { isWorking: false, timeSlots: [] },
        Thursday: { isWorking: true, timeSlots: [{ id: 1, startTime: "08:00", endTime: "12:00", slotDuration: 30 }] },
        Friday: { isWorking: false, timeSlots: [] },
        Saturday: { isWorking: true, timeSlots: [{ id: 1, startTime: "09:00", endTime: "13:00", slotDuration: 30 }] },
        Sunday: { isWorking: false, timeSlots: [] }
      }
    }
  ];

  function getWeekDates(date: Date) {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);

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

  const toggleDayWorking = (day: string) => {
    setWeeklyAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        isWorking: !prev[day as keyof typeof prev].isWorking,
        timeSlots: !prev[day as keyof typeof prev].isWorking ?
            [{ id: Date.now(), startTime: "09:00", endTime: "17:00", slotDuration: 30 }] :
            []
      }
    }));
  };

  const addTimeSlot = (day: string) => {
    const newSlot = {
      id: Date.now(),
      startTime: "09:00",
      endTime: "12:00",
      slotDuration: 30
    };

    setWeeklyAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        timeSlots: [...prev[day as keyof typeof prev].timeSlots, newSlot]
      }
    }));
  };

  const updateTimeSlot = (day: string, slotId: number, field: string, value: any) => {
    setWeeklyAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        timeSlots: prev[day as keyof typeof prev].timeSlots.map(slot =>
            slot.id === slotId ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const removeTimeSlot = (day: string, slotId: number) => {
    setWeeklyAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        timeSlots: prev[day as keyof typeof prev].timeSlots.filter(slot => slot.id !== slotId)
      }
    }));
  };

  const applyTemplate = (templateIndex: number) => {
    const template = quickTemplates[templateIndex];
    if (template) {
      setWeeklyAvailability(template.schedule as any);
    }
  };

  const getAvailableSlots = (day: string) => {
    const dayAvailability = weeklyAvailability[day as keyof typeof weeklyAvailability];
    if (!dayAvailability.isWorking) return [];

    const slots: string[] = [];
    dayAvailability.timeSlots.forEach(timeSlot => {
      const start = new Date(`2000-01-01 ${timeSlot.startTime}`);
      const end = new Date(`2000-01-01 ${timeSlot.endTime}`);
      const duration = timeSlot.slotDuration;

      let current = new Date(start);
      while (current < end) {
        const timeString = current.toTimeString().slice(0, 5);
        slots.push(timeString);
        current.setMinutes(current.getMinutes() + duration);
      }
    });
    return slots;
  };

  const getDayAppointments = (day: string) => {
    return bookedAppointments.filter(apt => apt.day === day);
  };

  const calculateStats = () => {
    let workingDays = 0;
    let totalAvailableSlots = 0;
    let totalBookedSlots = 0;

    Object.keys(weeklyAvailability).forEach(day => {
      const dayData = weeklyAvailability[day as keyof typeof weeklyAvailability];
      if (dayData.isWorking) {
        workingDays++;
        const availableSlots = getAvailableSlots(day);
        const bookedSlots = getDayAppointments(day);
        totalAvailableSlots += availableSlots.length;
        totalBookedSlots += bookedSlots.length;
      }
    });

    return { workingDays, totalAvailableSlots, totalBookedSlots };
  };

  const stats = calculateStats();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-black mb-2">Doctor Availability Management</h1>
            <p className="text-gray-600">Set working hours first, then appointments can be booked within available time slots</p>
          </div>

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
                <CardTitle className="text-lg">Schedule Templates</CardTitle>
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
                    <p className="text-2xl font-bold text-slate-black">{stats.totalAvailableSlots}</p>
                    <p className="text-sm text-gray-600">Available Slots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-neuro">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="text-orange-500" size={20} />
                  <div>
                    <p className="text-2xl font-bold text-slate-black">{stats.totalBookedSlots}</p>
                    <p className="text-sm text-gray-600">Booked Slots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-neuro">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="text-green-500" size={20} />
                  <div>
                    <p className="text-2xl font-bold text-slate-black">
                      {stats.totalAvailableSlots - stats.totalBookedSlots}
                    </p>
                    <p className="text-sm text-gray-600">Free Slots</p>
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
                  <span>Weekly Availability Schedule</span>
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
                  const dayData = weeklyAvailability[day as keyof typeof weeklyAvailability];
                  const currentDate = currentWeek[index];
                  const availableSlots = getAvailableSlots(day);
                  const dayAppointments = getDayAppointments(day);

                  return (
                      <div key={day} className={`border rounded-xl p-4 ${dayData.isWorking ? 'bg-white' : 'bg-gray-50'}`}>
                        {/* Day Header */}
                        <div className="text-center mb-4">
                          <h3 className="font-semibold text-slate-black">{day}</h3>
                          <p className="text-sm text-gray-600">{currentDate.toLocaleDateString()}</p>
                          <div className="mt-2">
                            <Switch
                                checked={dayData.isWorking}
                                onCheckedChange={() => toggleDayWorking(day)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {dayData.isWorking ? 'Working Day' : 'Day Off'}
                            </p>
                          </div>
                        </div>

                        {dayData.isWorking && (
                            <div className="space-y-4">
                              {/* Available Time Slots */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <Label className="text-sm font-medium text-blue-700">Available Times</Label>
                                  <Button
                                      onClick={() => addTimeSlot(day)}
                                      size="sm"
                                      variant="outline"
                                      className="p-1 h-6 w-6 rounded-full"
                                  >
                                    <Plus size={12} />
                                  </Button>
                                </div>

                                {dayData.timeSlots.map((slot) => (
                                    <div key={slot.id} className="bg-blue-50 rounded-lg p-2 mb-2">
                                      <div className="grid  gap-1 mb-2">
                                        <Input
                                            type="time"
                                            value={slot.startTime}
                                            onChange={(e) => updateTimeSlot(day, slot.id, 'startTime', e.target.value)}
                                            className="text-xs h-7"
                                        />
                                        <Input
                                            type="time"
                                            value={slot.endTime}
                                            onChange={(e) => updateTimeSlot(day, slot.id, 'endTime', e.target.value)}
                                            className="text-xs h-7"
                                        />
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <Select
                                            value={slot.slotDuration.toString()}
                                            onValueChange={(value) => updateTimeSlot(day, slot.id, 'slotDuration', parseInt(value))}
                                        >
                                          <SelectTrigger className="h-6 text-xs">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="15">15 min</SelectItem>
                                            <SelectItem value="30">30 min</SelectItem>
                                            <SelectItem value="45">45 min</SelectItem>
                                            <SelectItem value="60">60 min</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <Button
                                            onClick={() => removeTimeSlot(day, slot.id)}
                                            size="sm"
                                            variant="ghost"
                                            className="p-1 h-6 w-6 text-red-500"
                                        >
                                          <Trash2 size={12} />
                                        </Button>
                                      </div>
                                    </div>
                                ))}
                              </div>

                              {/* Appointment Summary */}
                              <div className="pt-2 border-t border-gray-200">
                                <Label className="text-sm font-medium text-green-700">Appointments</Label>
                                <div className="mt-2 space-y-1">
                                  {dayAppointments.length > 0 ? (
                                      dayAppointments.map((apt) => (
                                          <div key={apt.id} className="bg-green-50 rounded p-2 text-xs">
                                            <div className="font-medium">{apt.time}</div>
                                            <div className="text-gray-600">{apt.patientName}</div>
                                          </div>
                                      ))
                                  ) : (
                                      <p className="text-xs text-gray-500">No appointments</p>
                                  )}
                                </div>

                                <div className="mt-2 text-center">
                                  <Badge className={`${
                                      dayAppointments.length === 0 ? 'bg-gray-100 text-gray-600' :
                                          dayAppointments.length / availableSlots.length > 0.8 ? 'bg-red-100 text-red-800' :
                                              'bg-green-100 text-green-800'
                                  }`}>
                                    {dayAppointments.length}/{availableSlots.length} slots booked
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
