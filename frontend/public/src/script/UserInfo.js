import React, { useState } from 'react';
import AccountModals from './AccountModals';
import './UserInfo.css';

const UserInfo = ({ username }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (formData) => {
    // Handle the form submission here
    console.log(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="user-info">
      <div className="avatar">{username.charAt(0).toUpperCase()}</div>
      <div className="username" onClick={() => setIsModalOpen(true)}>
        {username}
      </div>
      <AccountModals
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserInfo; 