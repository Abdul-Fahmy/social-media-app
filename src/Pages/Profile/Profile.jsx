import { useContext, useEffect } from "react";
import PostForm from "../../Components/PostForm/PostForm";

import PostCard from "../../Components/PostCard/PostCard";
import UserDetail from "../../Components/UserDetail/UserDetail";
import { UserContext } from "../../Context/User.context";
import { PostContext } from "../../Context/Post.context";
import Loading from "../../Components/Loading/Loading";

export default function Profile() {
  const { getUserInfo } = useContext(UserContext);
  const { getUserPosts, userPosts } = useContext(PostContext);

  useEffect(() => {
    getUserInfo();
    getUserPosts();
  }, []);
  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-12 my-6 gap-6 px-4">
      <div className="  right-side md:col-span-4">
          <UserDetail />
        </div>
        <div className="center-side md:col-span-6">
          <PostForm />
          {userPosts === null ? (
            <Loading />
          ) : (
            <div className="">
              {userPosts.length === 0 ? (
                <p className="text-2xl mt-6">
                  No Posts Yet, Create your First post now
                </p>
              ) : (
                <div className="">
                  {userPosts.lenght === 0 ? (
                    <p>No Posts Yet</p>
                  ) : (
                    <>
                      {userPosts.map((post) => (
                        <PostCard key={post._id} postInfo={post} />
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>
    </>
  );
}
