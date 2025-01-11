import { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/User.context";
import { data } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { PostContext } from "../Context/Post.context";

export default function PostForm() {
  const { token } = useContext(UserContext);
  const { getUserPosts } = useContext(PostContext);
  const [error, setError] = useState(null);
  let postContent = useRef(null);
  const postFile = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    postFile.current.click();
  };
  const onFileChange = (e) => {
    const fileUploaded = e.target.files[0];
    const objectUrl = URL.createObjectURL(fileUploaded);
    setPreview(objectUrl);
  };
  async function createPost() {
    let content = postContent.current.value;
    let file = postFile.current.files[0];
    if (content === "undefined" && file === "undefined") {
      setError("Please write something before posting or upload an image");
      return;
    } else {
      const postData = new FormData();
      if (content) {
        postData.append("body", content);
      } else {
        postData.append("body", " ");
      }
      if (file) {
        postData.append("image", file);
      }
      const options = {
        url: `https://linked-posts.routemisr.com/posts`,
        method: "POST",
        headers: {
          token,
        },
        data: postData,
      };
      let toastId = toast.loading("Posting...");
      try {
        let { data } = await axios.request(options);
        if (data.message === "success") {
          getUserPosts();
          toast.success("Post created successfully");
          postContent.current.value = "";
          postContent.current.files = null;
          setPreview(null);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        toast.dismiss(toastId);
      }
    }
  }

  return (
    <>
      <section className="post-form mb-4">
        <form>
          <textarea
            className="form-control px-4 py-2 resize-none"
            name=""
            id=""
            cols="7"
            rows="8"
            placeholder="What happened ?"
            ref={postContent}
          ></textarea>
          <div onClick={handleClick}>
            <i className="fa-solid fa-paperclip text-xl px-4 py-2 hover:cursor-pointer hover:text-blue-400"></i>
            <input
              type="file"
              className="hidden"
              ref={postFile}
              onChange={onFileChange}
            />
          </div>
          {error && <p className="text-red-500">*{error}</p>}
          {preview ? (
            <>
              <div className="w-1/2 rounded-md overflow-hidden my-2">
                <img className="w-full" src={preview} alt="" />
              </div>
            </>
          ) : (
            ""
          )}
          <button
            onClick={createPost}
            type="button"
            className="btn bg-blue-500 hover:bg-blue-600 text-xl font-semibold uppercase flex ml-auto"
          >
            post
          </button>
        </form>
      </section>
    </>
  );
}
