import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/User.context";
import { useContext } from "react";

export default function GuestRoute({ children }) {
  const { token } = useContext(UserContext);
  if (token) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
