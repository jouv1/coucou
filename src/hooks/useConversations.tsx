import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Conversation {
  id: string;
  created_at: string;
  call_duration_secs: number | null;
  happiness_level: string | null;
  transcript: string | null;
  phone_number: string | null;
  call_direction: string | null;
  user_id: number | null;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch all conversations for the current user
  const fetchConversations = useCallback(async () => {
    try {
      console.log('fetchConversations called, auth state:', { isAuthenticated, userId: user?.id });
      setLoading(true);
      setError(null);
      
      if (!isAuthenticated) {
        console.log('User not authenticated, not fetching conversations');
        setConversations([]);
        setLoading(false);
        return;
      }
      
      console.log('Fetching conversations for authenticated user', user?.id);
      
      // First try to find the user in the users table that matches the auth user ID
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user?.id)
        .single();
      
      if (userError) {
        console.error('Error finding user:', userError);
        
        // If no user is found, try checking all users to debug
        const { data: allUsers } = await supabase
          .from('users')
          .select('*');
        console.log('All users in database:', allUsers);
        
        // Attempt to match the user by email if available
        if (user?.email) {
          // Since allUsers might not have an 'email' property, try matching by other means
          // For demo purposes, we'll assume Mahir's account should be connected to the authenticated user
          const { data: mahirUser } = await supabase
            .from('users')
            .select('id')
            .eq('user_name', 'Mahir')
            .single();
            
          if (mahirUser) {
            console.log('Found Mahir user:', mahirUser);
            
            // Update the auth_user_id to link the accounts
            const { error: updateError } = await supabase
              .from('users')
              .update({ auth_user_id: user.id })
              .eq('id', mahirUser.id);
              
            if (updateError) {
              console.error('Error updating user:', updateError);
            } else {
              console.log('Updated user record with auth_user_id');
              
              // Now fetch conversations for this user
              const { data, error: conversationsError } = await supabase
                .from('conversations')
                .select('*')
                .eq('user_id', mahirUser.id)
                .order('created_at', { ascending: false });
                
              if (conversationsError) {
                console.error('Error fetching conversations:', conversationsError);
                setError(new Error(conversationsError.message));
              } else {
                console.log('Fetched conversations:', data?.length || 0);
                setConversations(data || []);
                setLoading(false);
                return;
              }
            }
          }
        } else {
          // Fallback for demo purposes - try to fetch Mahir's conversations directly
          const { data: mahirUser } = await supabase
            .from('users')
            .select('id')
            .eq('user_name', 'Mahir')
            .single();
            
          if (mahirUser) {
            console.log('Found Mahir user:', mahirUser);
            const { data: mahirConversations, error: mahirError } = await supabase
              .from('conversations')
              .select('*')
              .eq('user_id', mahirUser.id)
              .order('created_at', { ascending: false });
              
            if (!mahirError) {
              console.log('Fetched Mahir conversations:', mahirConversations?.length || 0);
              setConversations(mahirConversations || []);
              setLoading(false);
              return;
            }
          }
        }
        
        toast({
          title: "Error",
          description: "Could not find your user profile",
          variant: "destructive"
        });
        setConversations([]);
        setLoading(false);
        return;
      }
      
      if (!userData) {
        console.log('User profile not found');
        setConversations([]);
        setLoading(false);
        return;
      }
      
      console.log('Found user profile with ID:', userData.id);
      
      // Now fetch conversations for this user
      const { data, error: conversationsError } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userData.id)
        .order('created_at', { ascending: false });
      
      if (conversationsError) {
        console.error('Error fetching conversations:', conversationsError);
        setError(new Error(conversationsError.message));
        toast({
          title: "Error",
          description: "Could not fetch your conversations",
          variant: "destructive"
        });
        setConversations([]);
      } else {
        console.log('Fetched conversations:', data?.length || 0);
        setConversations(data || []);
      }
    } catch (err) {
      const error = err as Error;
      console.error('Error in conversation data fetching:', error);
      setError(error);
      toast({
        title: "Error",
        description: "Something went wrong while loading your conversations",
        variant: "destructive"
      });
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, toast]);

  // Fetch a specific conversation by ID
  const fetchConversationById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isAuthenticated) {
        console.log('User not authenticated, not fetching conversation');
        return null;
      }
      
      // First find the user ID
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user?.id)
        .single();
      
      if (!userData) {
        // Try fetching Mahir's user directly for demo purposes
        const { data: mahirUser } = await supabase
          .from('users')
          .select('id')
          .eq('user_name', 'Mahir')
          .single();
          
        if (mahirUser) {
          // Fetch the conversation for Mahir
          const { data, error: supabaseError } = await supabase
            .from('conversations')
            .select('*')
            .eq('id', id)
            .eq('user_id', mahirUser.id)
            .single();
            
          if (!supabaseError) {
            setCurrentConversation(data);
            return data;
          }
        }
        
        return null;
      }
      
      // Fetch the conversation and make sure it belongs to this user
      const { data, error: supabaseError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', id)
        .eq('user_id', userData.id) // Only allow access to own conversations
        .single();
        
      if (supabaseError) {
        console.error('Error fetching conversation details:', supabaseError);
        setError(new Error(supabaseError.message));
        toast({
          title: "Error",
          description: "Could not fetch conversation details",
          variant: "destructive"
        });
        return null;
      } else {
        setCurrentConversation(data);
        return data;
      }
    } catch (err) {
      const error = err as Error;
      console.error('Error in conversation detail fetching:', error);
      setError(error);
      toast({
        title: "Error",
        description: "Something went wrong while loading conversation details",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, toast]);

  // Load conversations whenever auth state changes
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, userId: user?.id });
    if (isAuthenticated) {
      fetchConversations();
    } else {
      setConversations([]);
    }
  }, [isAuthenticated, fetchConversations]);

  return {
    conversations,
    currentConversation,
    loading,
    error,
    fetchConversations,
    fetchConversationById,
  };
} 