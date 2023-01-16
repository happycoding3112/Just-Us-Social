import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register.</h1>
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Just Us Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            exercitationem facilis temporibus, culpa eum?{" "}
          </p>
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
