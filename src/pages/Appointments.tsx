
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const mockAppointments = [
  { id: "1", date: "May 7, 2025", title: "Doctor Appointment", time: "10:30 AM" },
  { id: "2", date: "May 12, 2025", title: "Hair Salon", time: "2:00 PM" },
  { id: "3", date: "May 18, 2025", title: "Dentist", time: "9:15 AM" },
  { id: "4", date: "June 5, 2025", title: "Eye Doctor", time: "11:00 AM" },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [isEditingAppointment, setIsEditingAppointment] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState({
    id: "",
    title: "",
    date: "",
    time: "",
  });

  const resetForm = () => {
    setCurrentAppointment({ id: "", title: "", date: "", time: "" });
  };

  const addAppointment = () => {
    if (currentAppointment.title && currentAppointment.date) {
      const appointment = {
        id: Date.now().toString(),
        title: currentAppointment.title,
        date: currentAppointment.date,
        time: currentAppointment.time || "TBD",
      };
      
      setAppointments([...appointments, appointment]);
      resetForm();
      setIsAddingAppointment(false);
      toast.success("Appointment added successfully");
    }
  };
  
  const editAppointment = () => {
    if (currentAppointment.title && currentAppointment.date) {
      const updatedAppointments = appointments.map(apt => 
        apt.id === currentAppointment.id ? currentAppointment : apt
      );
      
      setAppointments(updatedAppointments);
      resetForm();
      setIsEditingAppointment(false);
      toast.success("Appointment updated successfully");
    }
  };
  
  const handleEdit = (appointment) => {
    setCurrentAppointment({...appointment});
    setIsEditingAppointment(true);
  };
  
  const handleDelete = (id) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== id);
    setAppointments(updatedAppointments);
    toast.success("Appointment deleted successfully");
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
                  value={currentAppointment.title}
                  onChange={e => setCurrentAppointment({...currentAppointment, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={currentAppointment.date}
                  onChange={e => setCurrentAppointment({...currentAppointment, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time (optional)</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={currentAppointment.time}
                  onChange={e => setCurrentAppointment({...currentAppointment, time: e.target.value})}
                />
              </div>
              
              <div className="flex justify-between pt-3">
                <Button variant="outline" onClick={() => {
                  setIsAddingAppointment(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button 
                  className="bg-lovable-400 hover:bg-lovable-500 text-white"
                  onClick={addAppointment}
                  disabled={!currentAppointment.title || !currentAppointment.date}
                >
                  Add Appointment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Edit Appointment Dialog */}
        <Dialog open={isEditingAppointment} onOpenChange={setIsEditingAppointment}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-3">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Appointment Title</Label>
                <Input 
                  id="edit-title" 
                  placeholder="e.g. Doctor Visit"
                  value={currentAppointment.title}
                  onChange={e => setCurrentAppointment({...currentAppointment, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input 
                  id="edit-date" 
                  type="date"
                  value={currentAppointment.date}
                  onChange={e => setCurrentAppointment({...currentAppointment, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-time">Time (optional)</Label>
                <Input 
                  id="edit-time" 
                  type="time"
                  value={currentAppointment.time}
                  onChange={e => setCurrentAppointment({...currentAppointment, time: e.target.value})}
                />
              </div>
              
              <div className="flex justify-between pt-3">
                <Button variant="outline" onClick={() => {
                  setIsEditingAppointment(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button 
                  className="bg-lovable-400 hover:bg-lovable-500 text-white"
                  onClick={editAppointment}
                  disabled={!currentAppointment.title || !currentAppointment.date}
                >
                  Update Appointment
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
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
