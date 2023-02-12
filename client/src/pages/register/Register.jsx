import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { useFormik } from "formik";
import { registrationSchema } from "../../schemas";

const Register = () => {
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  const { errors, touched, values, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: registrationSchema,
      onSubmit: (values) => {
        console.log("Values", values);
        handleClick(values);
      },
    });

  const handleClick = async (user) => {
    try {
      const { data: res } = await axios.post(
        "http://localhost:8800/api/auth/register",
        user
      );
      setMsg(res);
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setErr(err.response.data);
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register.</h1>
          <form>
            <div className="formInputs">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.name && touched.name ? (
                <span className="errorMsg">{errors.name}</span>
              ) : null}
            </div>
            <div className="formInputs">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.username && touched.username ? (
                <span className="errorMsg">{errors.username}</span>
              ) : null}
            </div>
            <div className="formInputs">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.email && touched.email ? (
                <span className="errorMsg">{errors.email}</span>
              ) : null}
            </div>
            <div className="formInputs">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              {errors.password && touched.password ? (
                <span className="errorMsg">{errors.password}</span>
              ) : null}
            </div>
            <span style={{ color: "black" }}>{err ? err : msg}</span>
            <button type="submit" onClick={handleSubmit}>
              Register
            </button>
          </form>
        </div>
        <div className="right">
          <h1>Just Us Social.</h1>
          <span>Already Have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
