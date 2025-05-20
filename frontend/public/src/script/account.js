
    
    const chatData = {
      "Friend 1": [
        { text: "Hello! How are you?", type: "received", timestamp: "10:00 AM" },
        { text: "I'm good, thanks! You?", type: "sent", timestamp: "10:01 AM" }
      ],
      "Friend 2": [],
      "Friend 3": []
    };

    const contactsList = document.getElementById('contactsList');
    const contacts = contactsList.getElementsByClassName('contact-item');
    const chatHeader = document.getElementById('chatHeader');
    const messages = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const userSearch = document.getElementById('userSearch');

    let activeContact = 'Friend 1';

    function renderMessages(contactName) {
      messages.innerHTML = '';
      const msgs = chatData[contactName] || [];
      msgs.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.type}`;
        msgDiv.innerHTML = `${msg.text}<div class="message-timestamp">${msg.timestamp}</div>`;
        messages.appendChild(msgDiv);
      });
      messages.scrollTop = messages.scrollHeight;
    }

    renderMessages(activeContact);

    Array.from(contacts).forEach(contact => {
      contact.addEventListener('click', () => {
        Array.from(contacts).forEach(c => c.classList.remove('active'));
        contact.classList.add('active');
        activeContact = contact.textContent;
        chatHeader.textContent = activeContact;
        renderMessages(activeContact);
      });
    });

    messageForm.addEventListener('submit', e => {
      e.preventDefault();
      const msgText = messageInput.value.trim();
      if (!msgText) return;

      const newMsg = {
        text: msgText,
        type: 'sent',
        timestamp: 'Now'
      };

      if (!chatData[activeContact]) chatData[activeContact] = [];
      chatData[activeContact].push(newMsg);

      renderMessages(activeContact);
      messageInput.value = '';
    });

    userSearch.addEventListener('input', () => {
      const filter = userSearch.value.toLowerCase();
      for (let i = 0; i < contacts.length; i++) {
        const contactName = contacts[i].textContent.toLowerCase();
        contacts[i].style.display = contactName.includes(filter) ? '' : 'none';
      }
    });