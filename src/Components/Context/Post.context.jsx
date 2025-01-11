import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";

export const PostContext = createContext(null);

export default function PostProvider({ children }) {
  const { token, userId } = useContext(UserContext);
  const [allPosts, setAllPosts] = useState(null);
  const [singlePost, setSinglePost] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  async function getPosts() {
    const options = {
      url: "https://linked-posts.routemisr.com/posts?limit=50",
      method: "GET",
      headers: {
        token,
      },
    };
    try {
      let { data } = await axios.request(options);
      setAllPosts(data.posts.reverse());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getSinglePost({ postId }) {
    const options = {
      url: `https://linked-posts.routemisr.com/posts/${postId}`,
      method: "GET",
      headers: {
        token,
      },
    };
    try {
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setSinglePost(data.post);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserPosts() {
    const options = {
      url: `https://linked-posts.routemisr.com/users/${userId}/posts`,
      method: "GET",
      headers: {
        token,
      },
    };

    try {
      let { data } = await axios.request(options);
      if (data.message === "success") {
        console.log(data);

        setUserPosts(data.posts.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost({ postId }) {
    const options = {
      url: `https://linked-posts.routemisr.com/posts/${postId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    let toastId = toast.loading("Deleting Post...");
    try {
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Post Deleted Successfully");
        getUserPosts();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
  return (
    <PostContext.Provider
      value={{
        getPosts,
        allPosts,
        getSinglePost,
        singlePost,
        getUserPosts,
        userPosts,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
