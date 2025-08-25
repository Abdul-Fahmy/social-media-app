import { useContext, useEffect } from "react";

import PostCard from "../../Components/PostCard/PostCard";
import PostForm from "../../Components/PostForm/PostForm";
import { PostContext } from "../../Context/Post.context";
import Loading from "../../Components/Loading/Loading";

export default function Home() {
  const { getPosts, allPosts } = useContext(PostContext);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {allPosts ? (
        <div className="grid px-6 grid-cols-12 my-6">
          <div className="left-side hidden md:block md:col-span-2 lg:col-span-3"></div>
          <div className="center-side col-span-12 md:col-span-8 lg:col-span-6">
            <PostForm />
            {allPosts.map((post) => (
              <PostCard key={post._id} postInfo={post} />
            ))}
          </div>
          <div className="right-side hidden md:block md:col-span-2 lg:col-span-3"></div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
