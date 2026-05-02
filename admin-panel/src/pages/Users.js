import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Access Denied ❌ (Admin only)");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Users List</h2>

      {users.map((u) => (
        <div key={u._id}>
          <p>{u.name} - {u.email}</p>
        </div>
      ))}
    </div>
  );
}