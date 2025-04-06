import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import BasicInfoStep from "@/components/onboarding/BasicInfoStep";
import HealthConditionsStep from "@/components/onboarding/HealthConditionsStep";
import MedicationsStep from "@/components/onboarding/MedicationsStep";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const LovedOneSettings = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [lovedOne, setLovedOne] = useState<any>(null);
  const [medications, setMedications] = useState<any[]>([]);
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    basicInfo: {
      name: "",
      nickname: "",
      age: "",
      gender: "",
      relationship: "",
      photo: null,
      language: "english",
    },
    healthConditions: {
      generalHealth: "good",
      hearingAbility: "good",
      mentalState: 7,
      lowMentalStateReasons: [],
      forgetfulness: "sometimes",
      loneliness: 6,
      conditions: [],
    },
    medications: [] as any[]
  });

  // Fetch loved one data from Supabase
  useEffect(() => {
    const fetchLovedOneData = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }
      
      try {
        // First get the user's id from the users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', user.id)
          .single();
          
        if (userError) {
          throw userError;
        }
        
        setUserData(userData);
        
        // Fetch the loved one data related to this user
        const { data: lovedOneData, error: lovedOneError } = await supabase
          .from('loved_ones')
          .select('*')
          .eq('user_id', userData.id)
          .single();
          
        if (lovedOneError) {
          if (lovedOneError.code === 'PGRST116') {
            // No results found
            setLoading(false);
            return;
          }
          throw lovedOneError;
        }
        
        setLovedOne(lovedOneData);
        
        // Fetch medications for this loved one
        const { data: medicationsData, error: medicationsError } = await supabase
          .from('medications')
          .select('*')
          .eq('loved_one_id', lovedOneData.id);
          
        if (medicationsError) {
          throw medicationsError;
        }
        
        setMedications(medicationsData || []);
        
        // Update the form data with the fetched data
        setFormData({
          basicInfo: {
            name: lovedOneData.name || "",
            nickname: lovedOneData.nickname || "",
            age: lovedOneData.age_range || "",
            gender: lovedOneData.gender ? lovedOneData.gender.toLowerCase() : "",
            relationship: lovedOneData.relationship_to_user || "",
            photo: null,
            language: "english", // Default as this might not be in database
          },
          healthConditions: {
            generalHealth: "good", // These would need to come from a health_conditions table
            hearingAbility: "good", // if you have one, otherwise keep defaults
            mentalState: 7,
            lowMentalStateReasons: [],
            forgetfulness: "sometimes",
            loneliness: 6,
            conditions: healthConditions,
          },
          medications: medicationsData ? medicationsData.map((med: any) => ({
            id: med.id.toString(),
            name: med.medication_name,
            timeOfDay: med.time_taken || [],
          })) : []
        });
      } catch (error: any) {
        console.error("Error fetching loved one data:", error);
        toast({
          title: "Error fetching data",
          description: error.message || "Could not load your loved one's information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchLovedOneData();
  }, [isAuthenticated, user]);

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleSave = async () => {
    if (!isAuthenticated || !user || !userData) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to update information",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      let lovedOneId = lovedOne?.id;
      
      // If we don't have a loved one record yet, create one
      if (!lovedOneId) {
        const { data: newLovedOne, error: createError } = await supabase
          .from('loved_ones')
          .insert({
            user_id: userData.id,
            name: formData.basicInfo.name,
            nickname: formData.basicInfo.nickname,
            age_range: formData.basicInfo.age,
            gender: formData.basicInfo.gender,
            relationship_to_user: formData.basicInfo.relationship,
          })
          .select()
          .single();
          
        if (createError) throw createError;
        
        lovedOneId = newLovedOne.id;
        setLovedOne(newLovedOne);
      } else {
        // Update existing loved one record
        const { error: updateError } = await supabase
          .from('loved_ones')
          .update({
            name: formData.basicInfo.name,
            nickname: formData.basicInfo.nickname,
            age_range: formData.basicInfo.age,
            gender: formData.basicInfo.gender,
            relationship_to_user: formData.basicInfo.relationship,
          })
          .eq('id', lovedOneId);
          
        if (updateError) throw updateError;
      }
      
      // Handle medications updates
      // First remove all existing medications
      if (medications.length > 0) {
        const { error: deleteError } = await supabase
          .from('medications')
          .delete()
          .eq('loved_one_id', lovedOneId);
          
        if (deleteError) throw deleteError;
      }
      
      // Then insert all medications from the form
      if (formData.medications.length > 0) {
        const medicationsToInsert = formData.medications.map(med => ({
          loved_one_id: lovedOneId,
          medication_name: med.name,
          time_taken: med.timeOfDay
        }));
        
        const { error: insertError } = await supabase
          .from('medications')
          .insert(medicationsToInsert);
          
        if (insertError) throw insertError;
      }
      
      // Update the local medications state
      const { data: updatedMeds, error: fetchError } = await supabase
        .from('medications')
        .select('*')
        .eq('loved_one_id', lovedOneId);
        
      if (!fetchError && updatedMeds) {
        setMedications(updatedMeds);
      }
      
      // Provide feedback to user
      toast({
        title: "Information updated",
        description: "Your loved one's information has been updated successfully!",
      });
    } catch (error: any) {
      console.error("Error updating loved one data:", error);
      toast({
        title: "Update failed",
        description: error.message || "There was a problem updating the information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <Link to="/settings" className="inline-flex items-center text-lovable-600">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Settings
      </Link>
      
      <div>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Loved One Personal Information</h1>
        <p className="text-gray-600">Update information about your loved one</p>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <Card className="border-lovable-100">
            <CardHeader className="pb-2"></CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-lovable-100">
            <CardHeader className="pb-2"></CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <Card className="border-lovable-100">
            <CardHeader className="pb-2">
              <h2 className="text-lg font-medium">Basic Information</h2>
            </CardHeader>
            <CardContent>
              <BasicInfoStep 
                data={formData}
                updateData={updateFormData}
                stepId="basicInfo"
              />
            </CardContent>
          </Card>
          
          <Card className="border-lovable-100">
            <CardHeader className="pb-2">
              <h2 className="text-lg font-medium">Health Conditions</h2>
            </CardHeader>
            <CardContent>
              <HealthConditionsStep 
                data={formData}
                updateData={updateFormData}
                stepId="healthConditions"
              />
            </CardContent>
          </Card>
          
          <Card className="border-lovable-100">
            <CardHeader className="pb-2">
              <h2 className="text-lg font-medium">Medications</h2>
            </CardHeader>
            <CardContent>
              <MedicationsStep 
                data={formData}
                updateData={updateFormData}
                stepId="medications"
              />
              
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-lovable-400 hover:bg-lovable-500 text-white"
                  onClick={handleSave}
                  disabled={loading}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default LovedOneSettings;
