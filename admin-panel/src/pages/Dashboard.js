import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
        alert("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;