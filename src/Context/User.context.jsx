import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  async function getUserInfo() {
    const options = {
      url: `https://linked-posts.routemisr.com/users/profile-data`,
      method: "GET",
      headers: {
        token,
      },
    };
    try {
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setUserInfo(data.user);
        localStorage.setItem("userId", data.user._id);
        setUserId(data.user._id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId(null);
    setToken(null);
    toast.success("Logged Out Successfully");
  }

  return (
    <UserContext.Provider
      value={{ token, setToken, logOut, getUserInfo, userInfo, userId }}
    >
      {children}
    </UserContext.Provider>
  );
}
