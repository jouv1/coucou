
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockAppointments = [
  { id: "1", date: "May 7, 2025", title: "Doctor Appointment", time: "10:30 AM" },
  { id: "2", date: "May 12, 2025", title: "Hair Salon", time: "2:00 PM" },
  { id: "3", date: "May 18, 2025", title: "Dentist", time: "9:15 AM" },
  { id: "4", date: "June 5, 2025", title: "Eye Doctor", time: "11:00 AM" },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    time: "",
  });

  const addAppointment = () => {
    if (newAppointment.title && newAppointment.date) {
      const appointment = {
        id: Date.now().toString(),
        title: newAppointment.title,
        date: newAppointment.date,
        time: newAppointment.time || "TBD",
      };
      
      setAppointments([...appointments, appointment]);
      setNewAppointment({ title: "", date: "", time: "" });
      setIsAddingAppointment(false);
    }
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-lovable-800">Appointments</h1>
          <p className="text-gray-600">
            Manage your loved one's medical and social appointments
          </p>
        </div>
        
        <Dialog open={isAddingAppointment} onOpenChange={setIsAddingAppointment}>
          <DialogTrigger asChild>
            <Button className="bg-lovable-400 hover:bg-lovable-500 text-white">
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-3">
              <div className="space-y-2">
                <Label htmlFor="title">Appointment Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Doctor Visit"
                  value={newAppointment.title}
                  onChange={e => setNewAppointment({...newAppointment, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={newAppointment.date}
                  onChange={e => setNewAppointment({...newAppointment, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time (optional)</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={newAppointment.time}
                  onChange={e => setNewAppointment({...newAppointment, time: e.target.value})}
                />
              </div>
              
              <div className="flex justify-between pt-3">
                <Button variant="outline" onClick={() => setIsAddingAppointment(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-lovable-400 hover:bg-lovable-500 text-white"
                  onClick={addAppointment}
                  disabled={!newAppointment.title || !newAppointment.date}
                >
                  Add Appointment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-lovable-500" />
            <CardTitle className="text-lg font-medium">Upcoming Appointments</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-3">
          {appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{appointment.title}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.date}, {appointment.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No appointments scheduled</p>
              <Button 
                className="mt-3 bg-lovable-400 hover:bg-lovable-500 text-white"
                onClick={() => setIsAddingAppointment(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add First Appointment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
