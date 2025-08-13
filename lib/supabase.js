import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "process.env.https://nbxvrlwjsxekvsezvksy.supabase.co"
const supabaseKey = "process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ieHZybHdqc3hla3ZzZXp2a3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwODY4NzAsImV4cCI6MjA3MDY2Mjg3MH0.4x-y1LYHGhc_0aHLhDOAZ6fVEHR8mZxqmI4Cb7-8usA"

export const supabase = createClient(supabaseUrl, supabaseKey)