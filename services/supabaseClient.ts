import { createClient } from '@supabase/supabase-js';

// REPLACE THESE VALUES WITH YOUR ACTUAL SUPABASE KEYS
// You can get these from your Supabase Project Settings -> API
// Note: We use a placeholder URL that is syntactically valid (starts with https://) 
// to prevent the app from crashing if you haven't set up the keys yet. 
// You MUST replace these with your actual project URL and Key.
const supabaseUrl = process.env.SUPABASE_URL || 'https://rtxhfykqadlnkbackiwu.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0eGhmeWtxYWRsbmtiYWNraXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTM2MTYsImV4cCI6MjA4MjA2OTYxNn0.FJ6RNXPOspKkFByBTQxrLwmZh3tnJCGQ-ynspokfwkA';

export const supabase = createClient(supabaseUrl, supabaseKey);