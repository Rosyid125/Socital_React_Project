import React, { useState, useEffect, useContext } from "react";
import "./dist/notifications.css"; // Import CSS file for styling
import api from "../../pages/services/api";
import { AuthContext } from "../../context/authContext";

const Notifications = () => {
  // State to store notifications
  const [notifications, setNotifications] = useState([]);

  const { currentUser } = useContext(AuthContext);

  // Function to fetch notifications (example)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userid = currentUser.userid;

        const response = await api.get(`/notifications/${userid}`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [currentUser.userid]);

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h3>Notifications</h3>
      </div>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.notificationid}>{notification.notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
