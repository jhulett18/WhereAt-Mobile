// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gbxtbdzbkpulodsljird.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieHRiZHpia3B1bG9kc2xqaXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MTU5MTksImV4cCI6MjA0MTM5MTkxOX0.GoYo7dyIWbz7oGfhvIfIzIfHVZc4tbDpqPbkMmRTOs8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
