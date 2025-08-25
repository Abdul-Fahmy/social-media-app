import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostCard from "../../Components/PostCard/PostCard";
import { PostContext } from "../../Context/Post.context";
import Loading from "../../Components/Loading/Loading";

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
       <Loading />
      )}
    </>
  );
}
