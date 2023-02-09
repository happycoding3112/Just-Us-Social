import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./search.scss";

const Search = ({ data, toggleSearch }) => {
  return (
    <div className="searchContainer">
      <div className="container">
        <div className="closeMenu" onClick={() => toggleSearch(false)}>
          <button>
            <KeyboardBackspaceIcon />{" "}
          </button>
          <span>Close Search</span>
        </div>
        {data.map((user) => (
          <li key={user.id} className="users">
            <Link
              className="usrLinks"
              style={{ textDecoration: "none" }}
              to={"/profile/" + user.id}
              onClick={() => toggleSearch(false)}
            >
              <div className="userInfo">
                <img src={"/upload/" + user.profilePic} alt="" />
                <span>{user.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Search;
