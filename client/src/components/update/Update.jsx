import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios.js";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./update.scss";

const Update = ({ setOpen, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userInfo, updateUserInfo] = useState(user);
  const [txtInputs, setTxtInputs] = useState({
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation((user) => makeRequest.put("/users", user), {
    onSuccess: () => {
      updateUserInfo(user);
      queryClient.invalidateQueries(["user"]);
      setOpen(false);
      window.location.reload();
    },
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTxtInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const coverURL = cover ? await upload(cover) : user.coverPic;
      const profileURL = profile ? await upload(profile) : user.profilePic;
      mutation.mutate({
        ...txtInputs,
        profilePic: profileURL,
        coverPic: coverURL,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            value={txtInputs.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={txtInputs.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={txtInputs.website}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Update</button>
        </form>
        <button className="close" onClick={() => setOpen(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
