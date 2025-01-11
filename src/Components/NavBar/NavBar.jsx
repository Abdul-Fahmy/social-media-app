import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/User.context";

export default function NavBar() {
  let navigate = useNavigate();
  const { token, logOut } = useContext(UserContext);
  return (
    <>
      <section className="nav p-3 bg-slate-600">
        <div className="container flex justify-between items-center w-3/4">
          <h2 className="uppercase font-bold text-2xl text-white">Social</h2>

          <ul className="flex justify-center items-center gap-4">
            {token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` font-semibold border-solid border rounded-md p-2  mx-1 hover:bg-white hover:text-gray-500 transition-all duration-300 ${
                        isActive
                          ? "rounded-md bg-white text-gray-500"
                          : "text-white"
                      }`;
                    }}
                    to={"/"}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `border-solid border rounded-full p-2  mx-1 hover:bg-white hover:text-gray-500 transition-all duration-300 ${
                        isActive
                          ? "rounded-full bg-white text-gray-500"
                          : "text-white"
                      }`;
                    }}
                    to={"/profile"}
                  >
                    <i className="fa-regular fa-user"></i>
                  </NavLink>
                </li>
              </>
            )}
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` font-semibold border-solid border rounded-md p-2  mx-1 hover:bg-white hover:text-gray-500 transition-all duration-300 ${
                        isActive
                          ? "rounded-md bg-white text-gray-500"
                          : "text-white"
                      }`;
                    }}
                    to={"/signup"}
                  >
                    SignUp
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` font-semibold border-solid border rounded-md p-2  mx-1 hover:bg-white hover:text-gray-500 transition-all duration-300 ${
                        isActive
                          ? "rounded-md bg-white text-gray-500"
                          : "text-white"
                      }`;
                    }}
                    to={"/login"}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li
                onClick={() => {
                  logOut();
                  navigate("/login");
                }}
              >
                <NavLink>
                  <i className="text-lg text-white fa-solid fa-arrow-right-from-bracket"></i>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
