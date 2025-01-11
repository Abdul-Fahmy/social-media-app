import { createContext, useContext } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CommentContext = createContext(null);

export default function CommentProvider({ children }) {
  const { token } = useContext(UserContext);

  async function createComment(values) {
    const options = {
      url: "https://linked-posts.routemisr.com/comments",
      method: "POST",
      headers: {
        token,
      },
      data: values,
    };
    try {
      let { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllcomments({ postId }) {
    const options = {
      url: `https://linked-posts.routemisr.com/posts/${postId}/comments`,
      method: "GET",
      headers: {
        token,
      },
    };
    try {
      let { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteComment({ commentId }) {
    const options = {
      url: `https://linked-posts.routemisr.com/comments/${commentId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    let toastId = toast.loading("Deleting Comment...");
    try {
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Comment Deleted Successfully");
        console.log(data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
  return (
    <CommentContext.Provider
      value={{ createComment, getAllcomments, deleteComment }}
    >
      {children}
    </CommentContext.Provider>
  );
}
