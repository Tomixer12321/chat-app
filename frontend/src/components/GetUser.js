// GetUser.js
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import httpRequest from "../httpRequest";
import "./GetUser.css";

const GetUser = ({ onStartChat }) => {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const respMe = await httpRequest.get("http://localhost:5000/@me");
        setLoggedInUserId(respMe.data.id);

        const respUsers = await httpRequest.get("http://localhost:5000/users");
        const filteredUsers = respUsers.data.filter(
          (user) => user.id !== loggedInUserId
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Chyba pri načítaní používateľov:", error);
      }
    })();
  }, [loggedInUserId]);

  const handleStartChat = (userId) => {
    onStartChat(userId);
    console.log(userId) // Zavoláme funkciu pre začatie chatu s ID vybraného užívateľa
  };

  return (
    <div className="user-list">
      <ul>
        {users.map((user) => (
          <ListItemButton
            key={user.id}
            className="user-item"
            onClick={() => handleStartChat(user.id)} // Zavoláme funkciu pre začatie chatu pri kliknutí na užívateľa
            sx={{
              "&.MuiButtonBase-root:hover": {
                backgroundColor: "#494949",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <span className="username">{user.name}</span>
          </ListItemButton>
        ))}
      </ul>
    </div>
  );
};

export default GetUser;
