import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	(import.meta.env.SUPABASE_URL as string) ||
		" https://ptyykitcbxutpzzjgiwh.supabase.co",
	import.meta.env.ANON_KEY ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0eXlraXRjYnh1dHB6empnaXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyOTkxNDIsImV4cCI6MjA1Mjg3NTE0Mn0.EXeEPRzbN-9ehD4UNirsDwHYgKl5j4RFIWyNdQzZwr0"
);
