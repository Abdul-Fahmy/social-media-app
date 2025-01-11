import { Link } from "react-router-dom";
import CommentCard from "../CommentCard/CommentCard";
import { useFormik } from "formik";
import { CommentContext } from "../Context/Comment.context";
import { useContext } from "react";
import { PostContext } from "../Context/Post.context";

export default function PostCard({ postInfo, showAllComments = false }) {
  const { body, comments, createdAt, image, user, _id } = postInfo;
  const { createComment } = useContext(CommentContext);
  const { getSinglePost, deletePost } = useContext(PostContext);

  let formik = useFormik({
    initialValues: {
      content: "",
      post: "",
    },
    onSubmit: (values) => {
      createComment(values);
      formik.values.content = "";
      getSinglePost({ postId: _id });
    },
  });

  formik.values.post = _id;
  return (
    <>
      <div className="card border-solid border border-gray-400 shadow-sm rounded-md  mb-4">
        <div className="card-header flex justify-between  items-center px-3 py-2">
          <div className="user flex justify-center items-center gap-3 ">
            <div className="avatar overflow-hidden w-10 h-10 rounded-full">
              <img src={user.photo} alt="avatar image" />
            </div>
            <div className="info flex flex-col justify-center items-start">
              <h3>{user.name}</h3>
              <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <i
            onClick={() => {
              deletePost({ postId: _id });
            }}
            className="fa-solid fa-trash cursor-pointer hover:text-red-400"
          ></i>
        </div>
        {image ? <img src={image} alt="post Image" /> : ""}
        <div className="caption p-4">
          <p>{body}</p>
        </div>

        <div className="icons flex items-center justify-between py-3 px-4 ">
          <i className="fa-regular fa-thumbs-up text-gray-500 text-xl"></i>
          <i className="fa-regular fa-comment text-gray-500 text-xl"></i>
          <i className="fa-solid fa-share text-gray-500 text-xl"></i>
        </div>
        <div className="relative ">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-b border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              Comments
            </span>
          </div>
        </div>
        <div className="p-2">
          {comments.length > 0 && !showAllComments && (
            <CommentCard commentInfo={comments[0]} />
          )}
          {comments.length > 0 &&
            showAllComments &&
            postInfo.comments.map((comment) => (
              <CommentCard key={comment._id} commentInfo={comment} />
            ))}
        </div>
        <div className="p-2">
          {!showAllComments && (
            <Link
              to={`/post/${_id}`}
              className=" flex justify-center items-center btn bg-blue-500 hover:bg-blue-600 w-full"
            >
              Show all comments
            </Link>
          )}
        </div>
        <div className="p-2">
          <form onSubmit={formik.handleSubmit}>
            <textarea
              className="form-control resize-none "
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              placeholder="Add your comment"
              rows={3}
              cols={4}
            ></textarea>
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 flex ml-auto mt-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
