import { useEffect, useState } from "react";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("https://chatapp-nnoo.onrender.com/user/allusers", {
          withCredentials: true, // ✅ Send cookies with request
        });
        setAllUsers(res.data.filteredUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
