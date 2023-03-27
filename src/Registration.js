import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";
import { useFormik } from "formik";

function Registration() {
  const navigate = useNavigate();
  const registrationForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.name) {
        error.name = "*Required";
      }
      if (values.name && (values.name.length < 3 || values.name.length > 15)) {
        error.name = "name must be 3 to 15 characters";
      }

      if (!values.email) {
        error.email = "*Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        error.email = "Invalid email address";
      }
      if (!values.password) {
        error.password = "*Required";
      } else if (
        values.password &&
        (values.password.length < 8 || values.password.length > 15)
      ) {
        error.password = "Password must be 8 to 15 characters";
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
          values.password
        )
      ) {
        error.password =
          "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        const user = await axios.post(`${config.api}/user/register`, values);

        navigate("/");
      } catch (error) {
        console.log("Aa");
        alert(error.response.data.message);
      }
    },
  });
  return (
    <section
      class="vh-100 bg-image"
      style={{
        "background-image":
          " url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style={{ "border-radius": "15px" }}>
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={registrationForm.handleSubmit}>
                    <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example1cg">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="form3Example1cg"
                        placeholder="Your Name"
                        onChange={registrationForm.handleChange}
                        value={registrationForm.values.name}
                        className={`form-control form-control-lg ${registrationForm.errors.name ? "alert alert-danger" : ""} ${
                            registrationForm.touched.name && !registrationForm.errors.name
                              ? "alert alert-success"
                              : ""
                          }`}
                      />
                      {registrationForm.touched.name && registrationForm.errors.name ? (
                        <span style={{ color: "red" }}>
                          {registrationForm.errors.name}
                        </span>
                      ) : null}
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example3cg">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="form3Example3cg"
                        onChange={registrationForm.handleChange}
                        value={registrationForm.values.email}
                        className={`form-control form-control-lg ${registrationForm.errors.email ? "alert alert-danger" : ""} ${
                            registrationForm.touched.email && !registrationForm.errors.email
                              ? "alert alert-success"
                              : ""
                          }`}placeholder="sample@gmail.com"
                      />
                       {registrationForm.touched.email && registrationForm.errors.email ? (
                        <span style={{ color: "red" }}>
                          {registrationForm.errors.email}
                        </span>
                      ) : null}
                    </div>

                    <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="form3Example4cg"
                        onChange={registrationForm.handleChange}
                        value={registrationForm.values.password}
                        className={`form-control form-control-lg ${registrationForm.errors.password ? "alert alert-danger" : ""} ${
                            registrationForm.touched.password && !registrationForm.errors.password
                              ? "alert alert-success"
                              : ""
                          }`}
                          placeholder="Enter password"
                      />
                       {registrationForm.touched.password && registrationForm.errors.password ? (
                        <span style={{ color: "red" }}>
                          {registrationForm.errors.password}
                        </span>
                      ) : null}
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        type="Submit"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>{" "}
                    </div>
                    <div class="d-flex justify-content-center">
                      <Link to={"/"} class="text-center text-muted mt-5 mb-0">
                        Have already an account? Login here
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
