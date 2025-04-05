
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Trash2, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
  });

  const handleAddOrUpdate = () => {
    if (formData.title && formData.date) {
      if (isEditingAppointment && currentAppointment) {
        // Update existing appointment
        const updatedAppointments = appointments.map(apt => 
          apt.id === currentAppointment.id 
            ? { ...apt, title: formData.title, date: formData.date, time: formData.time || "TBD" }
            : apt
        );
        setAppointments(updatedAppointments);
        setIsEditingAppointment(false);
      } else {
        // Add new appointment
        const appointment = {
          id: Date.now().toString(),
          title: formData.title,
          date: formData.date,
          time: formData.time || "TBD",
        };
        setAppointments([...appointments, appointment]);
        setIsAddingAppointment(false);
      }
      
      // Reset form
      setFormData({ title: "", date: "", time: "" });
      setCurrentAppointment(null);
    }
  };
  
  const handleEdit = (appointment: any) => {
    setCurrentAppointment(appointment);
    setFormData({
      title: appointment.title,
      date: appointment.date,
      time: appointment.time,
    });
    setIsEditingAppointment(true);
  };
  
  const confirmDelete = (id: string) => {
    setAppointmentToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (appointmentToDelete) {
      setAppointments(appointments.filter(apt => apt.id !== appointmentToDelete));
      setDeleteDialogOpen(false);
      setAppointmentToDelete(null);
    }
  };
  
  const closeDialog = () => {
    setIsAddingAppointment(false);
    setIsEditingAppointment(false);
    setFormData({ title: "", date: "", time: "" });
    setCurrentAppointment(null);
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-coucou-800">Appointments</h1>
          <p className="text-gray-600">
            Manage your loved one's medical and social appointments
          </p>
        </div>
        
        <Button 
          className="bg-coucou-400 hover:bg-coucou-500 text-white"
          onClick={() => {
            setFormData({ title: "", date: "", time: "" });
            setIsAddingAppointment(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
      
      <Card className="border-coucou-100">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-coucou-500" />
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
                      <Edit2 size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => confirmDelete(appointment.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No appointments scheduled</p>
              <Button 
                className="mt-3 bg-coucou-400 hover:bg-coucou-500 text-white"
                onClick={() => setIsAddingAppointment(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add First Appointment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isAddingAppointment || isEditingAppointment} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditingAppointment ? "Edit Appointment" : "Add New Appointment"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div className="space-y-2">
              <Label htmlFor="title">Appointment Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. Doctor Visit"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                placeholder="e.g. May 7, 2025"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time (optional)</Label>
              <Input 
                id="time" 
                placeholder="e.g. 10:30 AM"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              />
            </div>
            
            <div className="flex justify-between pt-3">
              <Button variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button 
                className="bg-coucou-400 hover:bg-coucou-500 text-white"
                onClick={handleAddOrUpdate}
                disabled={!formData.title || !formData.date}
              >
                {isEditingAppointment ? "Update" : "Add"} Appointment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Appointments;
