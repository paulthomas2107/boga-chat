const { createClient } = supabase;

supabase = createClient(
  'https://kwxheeocnkeetctmxcmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eGhlZW9jbmtlZXRjdG14Y21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNDY5NDEsImV4cCI6MTk3ODkyMjk0MX0.UE_Q7SZScwN0jhSShJKXj6yNMODynHBniOsPXyeXrlQ'
);

async function getMessages() {
  let { data, error } = await supabase.from('messages').select('*');
  return data;
}

getMessages().then((data) => {
  console.log(data);
});
