
document.getElementById('profileForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  fetch('http://localhost/IsychiaWebApp/update_profile.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Profile updated successfully!');
    } else {
      alert('Failed to update profile.');
    }
  })
  .catch(err => {
    console.error('Error:', err);
    alert('An error occurred while updating profile.');
  });
});


document.getElementById('passwordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    alert('New passwords do not match!');
    return;
  }

  fetch('http://localhost/IsychiaWebApp/change_password.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `currentPassword=${encodeURIComponent(currentPassword)}&newPassword=${encodeURIComponent(newPassword)}`
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Password changed successfully!');
    } else {
      alert('Error changing password.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred.');
  });
});


// === Logout Handler ===
document.getElementById('logoutBtn').addEventListener('click', function() {
  fetch('http://localhost/IsychiaWebApp/logout.php')
    .then(() => {
      window.location.href = 'login.html'; // or your login page
    })
    .catch(err => {
      console.error('Logout error:', err);
      alert('Logout failed.');
    });
});


// === Delete Account Modal Logic ===
const deleteModal = document.getElementById('deleteModal');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const cancelDelete = document.getElementById('cancelDelete');

deleteAccountBtn.addEventListener('click', function () {
  deleteModal.style.display = 'flex';
});

cancelDelete.addEventListener('click', function () {
  deleteModal.style.display = 'none';
});

window.addEventListener('click', function (e) {
  if (e.target === deleteModal) {
    deleteModal.style.display = 'none';
  }
});



document.getElementById('deleteAccountForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const password = document.getElementById('deletePassword').value;

  fetch('http://localhost/IsychiaWebApp/delete_account.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `password=${encodeURIComponent(password)}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Account deleted successfully.');
        window.location.href = 'register.html'; 
      } else {
        alert('Failed to delete account.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('An error occurred.');
    });
});


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