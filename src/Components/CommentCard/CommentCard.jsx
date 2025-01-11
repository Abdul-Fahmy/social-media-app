import { useContext, useEffect } from "react";
import userImage from "../../assets/user.png";
import { CommentContext } from "../Context/Comment.context";

export default function CommentCard({ commentInfo }) {
  const { commentCreator, content, createdAt, post, _id } = commentInfo;
  const { deleteComment } = useContext(CommentContext);

  function handleImagePath(path) {
    if (path.includes("undefined")) {
      return userImage;
    } else {
      return path;
    }
  }

  return (
    <>
      <div className="comment-card bg-gray-100 border-solid rounded-md px-3 py-2 my-3">
        <div className="comment-header flex justify-between  items-center px-3 py-2">
          <div className="user flex justify-center items-center gap-3 ">
            <div className="avatar overflow-hidden w-8 h-8 rounded-full">
              <img
                src={handleImagePath(commentCreator.photo)}
                alt="avatar image"
              />
            </div>
            <div className="info flex flex-col justify-center items-start">
              <h3>{commentCreator.name}</h3>
              <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="cursor-pointer">
            <i
              onClick={() => {
                deleteComment({ commentId: _id });
              }}
              className="fa-solid fa-trash hover:text-red-400"
            ></i>
          </div>
        </div>
        <p className="my-3 pl-6">{content}</p>
      </div>
    </>
  );
}
