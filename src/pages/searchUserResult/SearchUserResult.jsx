import React, { useState } from "react";
import "./dist/searchUserResult.css"; // Import your CSS file

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: 1, username: "John Doe", profilepicture: "https://via.placeholder.com/150", followers: 12, followings: 13 },
    { id: 2, username: "Jane Smith", profilepicture: "https://via.placeholder.com/150", followers: 12, followings: 13 },
    { id: 3, username: "Alice Johnson", profilepicture: "https://via.placeholder.com/150", followers: 12, followings: 13 },
    // More users...
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="content">
      <h3>User search result/s:</h3>
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-card">
            <img src={user.profilepicture} alt={user.username} />
            <div className="user-info">
              <span>{user.username}</span>
              <div>
                <span>Followers: {user.followers}</span>
                <span>Following: {user.followings}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
