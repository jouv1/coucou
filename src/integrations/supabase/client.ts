// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kkbxakihnsfewnmysijw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYnhha2lobnNmZXdubXlzaWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjU0MDMsImV4cCI6MjA1OTQ0MTQwM30.HJdieE1dPlC2jkTKLGEqXrKannJQ01-trVAqXeAlBrY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);