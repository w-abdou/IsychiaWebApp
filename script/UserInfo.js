import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('backend/getUserInfo.php')
      .then(res => res.text())
      .then(data => setUsername(data.trim()));
  }, []);

  const initials = username
    ? username.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2)
    : 'U';

  return (
    <div className="user-info">
      <div className="user-circle">{initials}</div>
      <span className="user-name">{username}</span>
    </div>
  );
};

export default UserInfo;
