import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";
import { LockClosedIcon } from "@heroicons/react/20/solid";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "*Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "*Required";
      }
      else if (
        values.password &&
        (values.password.length < 8 || values.password.length > 15)
      ) {
        errors.password = "Password must be 8 to 15 characters";
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          values.password
        )
      ) {
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setisLoading(true);
        const user = await axios.post(`${config.api}/user/login`, values);
        localStorage.setItem("myreact", user.data.token);
        if (user.data.message === "Success") {
          navigate("/product");
        }
        setisLoading(false);
      } catch (error) {
        console.log("Aa");
        setisLoading(false);
        alert(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={loginForm.handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="TEXT"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  value={loginForm.values.email}
                  autoComplete="email"
                  className={`relative block w-full appearance-none rounded-none border-2 rounded-t-md px-3 py-2 text-gray-900 ${loginForm.errors.email ? "border-2 border-red-500" : ""}${
                    loginForm.touched.email && !loginForm.errors.email
                    ? "border-2 border-green-500"
                    : ""
                  } placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm `}
                  placeholder="Email address"
                  />
                  {console.log(loginForm.errors.email)}
                {loginForm.touched.email || loginForm.errors.email ? (
                  <span style={{ color: "red" }}>{loginForm.errors.email}</span>
                ) : null}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.password}
                  onBlur={loginForm.handleBlur}
                  autoComplete="current-password"
                  required
                  className={`relative block w-full appearance-none rounded-none border-2 rounded-b-md px-3 py-2 text-gray-900 ${loginForm.errors.password ? "border-2 border-red-500" : ""}${
                    loginForm.touched.password && !loginForm.errors.password
                    ? "border-2 border-green-500"
                    : ""
                  } placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm `}
                  placeholder="Password"
                />
                {loginForm.touched.password &&loginForm.errors.password ? (
                  <span style={{ color: "red" }}>
                    {loginForm.errors.password}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              {isLoading ? (
                <>
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </>
              ) : (
                <button
                  type={"submit"}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              )}
            </div>
          </form>
          <Link
            to={"/user/register"}
            className=" flex w-full justify-center  text-dark  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Do not have an account? Click here to Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
