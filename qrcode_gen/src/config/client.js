import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://iavstpiizpieblnatzya.supabase.co";
const anon =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdnN0cGlpenBpZWJsbmF0enlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM2OTc2NDgsImV4cCI6MTk4OTI3MzY0OH0.OKv40jWhe0h7Mdd7GbmTOwVsPESYEwQycZ-mtgLyrCM";

export const supabase = createClient(supabaseURL, anon);
