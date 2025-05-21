const contactsList = document.getElementById('contactsList');
const chatHeader = document.getElementById('chatHeader');
const messages = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const userSearch = document.getElementById('userSearch');
const usernameDisplay = document.getElementById('usernameDisplay');
const userInitials = document.getElementById('userInitials');

let chatData = {};
let activeContact = null;

async function getLoggedInUsername() {
  try {
    console.log('Fetching username from server...');
    // Use the full absolute path to avoid any path issues
    const response = await fetch('/IsychiaWebApp/backend/getCurrentUser.php');
    
    if (!response.ok) {
      console.error('Server responded with status:', response.status);
      return 'Error fetching user';
    }
    
    const data = await response.json();
    console.log('Server response:', data);
    
    if (data.success) {
      return data.username;
    } else {
      console.log('User not logged in:', data.message);
      return 'Guest';
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return 'Error';
  }
}

// Single DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', async function() {
  // Get and display username
  const username = await getLoggedInUsername();
  usernameDisplay.textContent = username;
  
  // Set initials in the avatar
  const initials = username.split(' ').map(n => n[0]).join('').toUpperCase();
  userInitials.textContent = initials || 'U';
  
  // Then load users
  await loadUsers();
});

// Load user list from backend
async function loadUsers() {
  try {
    const res = await fetch('backend/getUsers.php');
    const users = await res.json();

    contactsList.innerHTML = '';
    users.forEach(user => {
      const contactDiv = document.createElement('div');
      contactDiv.className = 'contact-item';
      contactDiv.textContent = user.username;

      contactDiv.addEventListener('click', () => {
        document.querySelectorAll('.contact-item').forEach(item => item.classList.remove('active'));
        contactDiv.classList.add('active');

        activeContact = user.username;
        chatHeader.textContent = activeContact;
        renderMessages(activeContact);
      });

      contactsList.appendChild(contactDiv);
    });

    if (users.length > 0) {
      activeContact = users[0].username;
      document.querySelector('.contact-item').classList.add('active');
      chatHeader.textContent = activeContact;
      renderMessages(activeContact);
    }
  } catch (err) {
    console.error('Failed to load users:', err);
  }
}

// Handle sending a message
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const msgText = messageInput.value.trim();
  if (!msgText || !activeContact) return;

  const newMsg = {
    text: msgText,
    type: 'sent',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  if (!chatData[activeContact]) chatData[activeContact] = [];
  chatData[activeContact].push(newMsg);

  renderMessages(activeContact);
  messageInput.value = '';
});

// Render messages for selected contact
function renderMessages(contact) {
  messages.innerHTML = '';
  const msgs = chatData[contact] || [];

  msgs.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${msg.type}`;
    msgDiv.innerHTML = `${msg.text}<div class="message-timestamp">${msg.timestamp}</div>`;
    messages.appendChild(msgDiv);
  });

  messages.scrollTop = messages.scrollHeight;
}

// Filter contacts based on search
userSearch.addEventListener('input', () => {
  const filter = userSearch.value.toLowerCase();
  document.querySelectorAll('.contact-item').forEach(contact => {
    const name = contact.textContent.toLowerCase();
    contact.style.display = name.includes(filter) ? '' : 'none';
  });
});