import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dgzqsvnoqjghquprliyj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnenFzdm5vcWpnaHF1cHJsaXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMTU4OTAsImV4cCI6MjA1MDY5MTg5MH0.uef-eeICOGovBeiTbVejl-xLJIYZlAPxwLAztRkVeXs'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        