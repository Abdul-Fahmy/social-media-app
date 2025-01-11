import { useContext, useEffect } from "react";

import PostCard from "../../Components/PostCard/PostCard";
import PostForm from "../../Components/PostForm/PostForm";
import { PostContext } from "../../Context/Post.context";

export default function Home() {
  const { getPosts, allPosts } = useContext(PostContext);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {allPosts ? (
        <div className="grid grid-cols-12 my-6">
          <div className="left-side col-span-4"></div>
          <div className="center-side col-span-4">
            <PostForm />
            {allPosts.map((post) => (
              <PostCard key={post._id} postInfo={post} />
            ))}
          </div>
          <div className="right-side col-span-4"></div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
