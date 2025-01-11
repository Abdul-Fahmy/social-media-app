import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../Components/Context/Post.context";
import PostCard from "../../Components/PostCard/PostCard";

export default function SinglePost() {
  let { id } = useParams();
  const { singlePost, getSinglePost } = useContext(PostContext);

  useEffect(() => {
    getSinglePost({ postId: id });
  }, []);
  return (
    <>
      {singlePost ? (
        <div className="container my-6">
          <PostCard
            key={singlePost.id}
            postInfo={singlePost}
            showAllComments={true}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
