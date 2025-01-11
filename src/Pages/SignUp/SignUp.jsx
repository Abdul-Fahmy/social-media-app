import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function SginUp() {
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  let schema = object({
    name: string()
      .required("Name is required")
      .min(3, "Must be atleast 3 character")
      .max(20, "Must be less than 20 character"),
    email: string().required("Email is required").email("Invalid Email"),

    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf(
        [ref("password")],
        "Password & Confirm password should be the same"
      ),
    dateOfBirth: string().required("required"),
    gender: string().required("required"),
  });

  async function onSubmit(values) {
    let toastId = toast.loading("Waiting ...");
    const options = {
      url: "https://linked-posts.routemisr.com/users/signup",
      method: "POST",
      data: values,
    };
    try {
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("User Created Successfully");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema: schema,
    onSubmit,
  });

  return (
    <>
      <section className="mt-10">
        <div className="container flex flex-col justify-center items-center gap-8">
          <div className="title w-1/2">
            <h2 className="font-semibold text-xl ">Sginup Now :</h2>
          </div>
          <form className="w-1/2 space-y-4" onSubmit={formik.handleSubmit}>
            {error && <p className="text-red-400 mt-1 text-sm">*{error}</p>}
            <div className="name">
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter Your Full Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />

              {formik.errors.name && formik.touched.name && (
                <p className="text-red-400 mt-1 text-sm">
                  *{formik.errors.name}
                </p>
              )}
            </div>
            <div className="email">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-400 mt-1 text-sm">
                  *{formik.errors.email}
                </p>
              )}
            </div>
            <div className="password">
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
            <div className="repassword">
              <input
                className="form-control"
                type="password"
                name="rePassword"
                placeholder="Enter Your Repassword"
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-red-400 mt-1 text-sm">
                  *{formik.errors.rePassword}
                </p>
              )}
            </div>
            <div className="dateOfBirth">
              <input
                className="form-control"
                type="date"
                name="dateOfBirth"
                placeholder="Enter Your date of birth"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                <p className="text-red-400 mt-1 text-sm">
                  *{formik.errors.dateOfBirth}
                </p>
              )}
            </div>
            <legend>Choose your gender:</legend>
            <div className="male">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <label className="mr-3" htmlFor="male">
                Male
              </label>
              {formik.errors.gender && formik.touched.gender && (
                <p className="text-red-400 mt-1 text-sm">
                  *{formik.errors.gender}
                </p>
              )}
            </div>

            <div className="female">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <label htmlFor="female">Female</label>
              {formik.errors.gender && formik.touched.gender && (
                <p className="text-red-400 mt-1 text-sm">
                  *{formik.errors.gender}
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
  );
}
