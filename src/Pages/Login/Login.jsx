import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../Components/Context/User.context";

export default function Login() {
  const [error, setError] = useState(null);
  const { setToken } = useContext(UserContext);
  let navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  let schema = object({
    email: string().required("Email is required").email("Invalid Email"),

    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  async function onSubmit(values) {
    let toastId = toast.loading("Waiting ...");
    const options = {
      url: "https://linked-posts.routemisr.com/users/signin",
      method: "POST",
      data: values,
    };
    try {
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "success") {
        toast.success("User Looged In Successfully");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setTimeout(() => {
          navigate("/");
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
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit,
  });

  return (
    <>
      <section className="mt-10">
        <div className="container flex flex-col justify-center items-center gap-8">
          <div className="title w-1/2">
            <h2 className="font-semibold text-xl ">Login Now :</h2>
          </div>
          <form className="w-1/2 space-y-4" onSubmit={formik.handleSubmit}>
            {error && <p className="text-red-400 mt-1 text-sm">*{error}</p>}

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
