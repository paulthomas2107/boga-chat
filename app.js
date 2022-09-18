const { createClient } = supabase;

supabase = createClient(
  'https://kwxheeocnkeetctmxcmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eGhlZW9jbmtlZXRjdG14Y21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNDY5NDEsImV4cCI6MTk3ODkyMjk0MX0.UE_Q7SZScwN0jhSShJKXj6yNMODynHBniOsPXyeXrlQ'
);

const messagesElement = document.querySelector('#messages');

function addMessageToPage(message) {
  const element = document.createElement('li');
  element.classList.add('card', 'm-2');
  element.innerHTML = `
          <div class="card-body">
            <div class="row">
              <div class="col-sm-2 avatar-container">
                <img src="monkey3.png" width="100" height="100" />
                <p class="avatar-username">${message.username}</p>
              </div>
              <div class="col-sm-10">
                <p>${message.content}</p>
              </div>
            </div>
            <div class="row">
              <p class="col-sm-12 timestamp">${message.created_at}</p>
            </div>
          </div>
        `;
  messagesElement.append(element);

  setTimeout(() => {
    element.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

const form = document.querySelector('form');

async function init() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const message = {
      username: formData.get('username'),
      content: formData.get('content'),
    };
    // Insert new message
    console.log(message);
    supabase
      .from('messages')
      .insert([message])
      .then(() => {
        console.log('Message saved to DB');
      });
  });

  let { data, error } = await supabase.from('messages').select('*');

  console.log(data);

  data.forEach((element) => {
    addMessageToPage(element);
  });

  // Check for new rows on message table in DB
  supabase
    .from('messages')
    .on('INSERT', (message) => {
      console.log('Message received...', message);
      addMessageToPage(message.new);
    })
    .subscribe();
}

init();
