import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = "https://owjxlmmbihsvtlctiucz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93anhsbW1iaWhzdnRsY3RpdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNTg3MjQsImV4cCI6MjEwNzYzNDcyNH0.gErzhluN9k_MzzZagVFnq7EK1gvyxZJLJNNVW-bkOOI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
