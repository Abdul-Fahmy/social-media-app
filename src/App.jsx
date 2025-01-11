import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import GuestRoute from "./Components/GuestRoute/GuestRoute";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";

import SinglePost from "./Pages/SinglePost/SinglePost";

import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile/Profile";
import UserProvider from "./Context/User.context";
import PostProvider from "./Context/Post.context";
import CommentProvider from "./Context/Comment.context";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/post/:id",
          element: <SinglePost />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        {
          path: "/logIn",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <PostProvider>
          <CommentProvider>
            <RouterProvider router={routes}></RouterProvider>
          </CommentProvider>
        </PostProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}

export default App;
