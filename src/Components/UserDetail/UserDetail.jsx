import { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/User.context";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserDetail() {
  const { userInfo, token } = useContext(UserContext);
  let postFile = useRef(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    postFile.current.click();
  };
  const onFileChange = (e) => {
    const fileUploaded = e.target.files[0];
    const objectUrl = URL.createObjectURL(fileUploaded);
    setPreview(objectUrl);
  };
  async function uploadImage() {
    let file = postFile.current.files[0];
    if (file === "undefined") {
      setError("Please upload an image");
      return;
    }

    const postData = new FormData();
    postData.append("photo", file);

    const options = {
      url: `https://linked-posts.routemisr.com/users/upload-photo`,
      method: "PUT",
      headers: {
        token,
      },
      data: postData,
    };
    let toastId = toast.loading("Uploading Image...");
    try {
      let { data } = await axios.request(options);
      if (data.message === "success") {
        window.location.reload();
        toast.success("Image Uploaded Successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <>
      <section className="mt-3 flex flex-col justify-center items-center gap-4">
        {userInfo ? (
          <>
            <div className="header-info flex flex-col justify-center items-center gap-4">
              <h3 className="font-semibold text-2xl">{userInfo.name}</h3>
              <p>{userInfo.email}</p>
              <div className="image rounded-full border-solid border border-gray-300 overflow-hidden w-full ">
                <img
                  className="w-64 h-64 object-cover"
                  src={userInfo.photo}
                  alt={`${userInfo.name} Photo`}
                />
              </div>
            </div>
            <div className="user-setting flex flex-col justify-center items-center">
              <div className="flex-col flex justify-center items-center gap-2">
                <p
                  onClick={handleClick}
                  className="text-lg px-4 py-2 hover:cursor-pointer hover:text-blue-400"
                >
                  Change your image
                </p>
                {error && <p className="text-red-500">*{error}</p>}
                <input
                  type="file"
                  className="hidden"
                  ref={postFile}
                  onChange={onFileChange}
                />
              </div>
              {preview ? (
                <>
                  <div className="w-1/2">
                    <img className="w-full" src={preview} alt="" />
                  </div>
                  <button onClick={uploadImage} className="btn bg-blue-300">
                    Set
                  </button>
                </>
              ) : (
                ""
              )}
              <Link className="btn bg-blue-400 hover:bg-blue-500">
                ChangePassword
              </Link>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
}
