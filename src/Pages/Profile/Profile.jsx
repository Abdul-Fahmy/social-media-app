import { useContext, useEffect } from "react";
import PostForm from "../../Components/PostForm/PostForm";

import PostCard from "../../Components/PostCard/PostCard";
import UserDetail from "../../Components/UserDetail/UserDetail";
import { UserContext } from "../../Context/User.context";
import { PostContext } from "../../Context/Post.context";

export default function Profile() {
  const { getUserInfo } = useContext(UserContext);
  const { getUserPosts, userPosts } = useContext(PostContext);

  useEffect(() => {
    getUserInfo();
    getUserPosts();
  }, []);
  return (
    <>
      <div className="grid grid-cols-12 my-6">
        <div className="left-side col-span-4"></div>
        <div className="center-side col-span-4">
          <PostForm />
          {userPosts === null ? (
            <p>Loading...</p>
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
        <div className="right-side col-span-4">
          <UserDetail />
        </div>
      </div>
    </>
  );
}
