import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../Context/User.context";

export default function ChangePassword() {

    const [error, setError] = useState(null);
    const { logOut,token } = useContext(UserContext);
   
    const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    let schema = object({
        password: string()
        .required("Password is required")
        .matches(
          passwordRegex,
          "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
        ),
    
        newPassword: string()
          .required("Password is required")
          .matches(
            passwordRegex,
            "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
          ),
      });

    async function onSubmit(values) {
        let toastId = toast.loading("Waiting ...");
        const options = {
          url: "https://linked-posts.routemisr.com/users/change-password",
          method: "PATCH",
          headers: {token,},
          data: values,
        };
        try {
          let { data } = await axios.request(options);
          console.log(data);
    
          if (data.message === "success") {
            toast.success("Password changed Successfully, please sign in again");
            
            
            setTimeout(() => {
                logOut();
            }, 2000);
          }
        } catch (error) {
          setError(error.response.data.error);
        } finally {
          toast.dismiss(toastId);
        }
      }






    const formik = useFormik({
        initialValues: {
            password:"",
            newPassword:""
        },
        validationSchema: schema,
        onSubmit,
      });



  return <>
  <section className="mt-10">
        <div className="container flex flex-col justify-center items-center gap-8">
          <div className="title w-1/2">
            <h2 className="font-semibold text-xl ">Change Password :</h2>
          </div>
          <form className="w-1/2 space-y-4" onSubmit={formik.handleSubmit}>
            {error && <p className="text-red-400 mt-1 text-sm">*{error}</p>}

            <div className="oldPassword">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-400 mt-1 text-sm">
                  *{formik.errors.password}
                </p>
              )}
            </div>
            <div className="newPassword">
              <input
                className="form-control"
                type="password"
                name="newPassword"
                placeholder="Enter Your New Password"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <p className="text-red-400 mt-1 text-sm">
                  *{formik.errors.newPassword}
                </p>
              )}
            </div>
          
            <button
              type="submit"
              className="btn w-full bg-blue-500 hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
  </>
}
