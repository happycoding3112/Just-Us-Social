import "./navbar.scss";
import Menu from "../userMenu/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import Search from "../search/Search";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [queryData, setQueryData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await makeRequest.get(`/search?ltr=${query}`);
      setQueryData(res.data);
    };
    fetchUsers();
  }, [query]);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Just Us Social.</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <HomeOutlinedIcon style={{ color: darkMode ? "white" : "black" }} />
        </Link>
        {darkMode ? (
          <LightModeOutlinedIcon
            onClick={toggle}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <DarkModeOutlinedIcon
            onClick={toggle}
            style={{ cursor: "pointer" }}
          />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onClick={() => setSearchOpen(true)}
          />
          {searchOpen && query.length > 0 && (
            <Search data={queryData} toggleSearch={setSearchOpen} />
          )}
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="user" onClick={() => setMenuOpen(!menuOpen)}>
          <img
            src={
              currentUser.profilePic
                ? "/upload/" + currentUser.profilePic
                : "/default_profile_pic.jpg"
            }
            alt=""
          />
        </div>
      </div>
      {menuOpen && <Menu toggleMenu={setMenuOpen} />}
    </div>
  );
};

export default Navbar;
