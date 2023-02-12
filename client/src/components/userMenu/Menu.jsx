import "./menu.scss";
import { useContext } from "react";
import { makeRequest } from "../../axios.js";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Menu = ({ toggleMenu }) => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="userMenu">
      <div className="container">
        <Link
          to={"/profile/" + currentUser.id}
          style={{ textDecoration: "none" }}
          onClick={() => toggleMenu(false)}
        >
          <div className="userInfo">
            <img
              src={
                currentUser.profilePic
                  ? "/upload/" + currentUser.profilePic
                  : "/default_profile_pic.jpg"
              }
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
        </Link>
        <div className="logout">
          <button onClick={handleLogout}>
            <LogoutIcon style={{ height: "40px", width: "40px" }} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
