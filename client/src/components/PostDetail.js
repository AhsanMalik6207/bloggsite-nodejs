import { makeStyles, Box, Typography } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import axios from "axios";
import PushPinIcon from '@mui/icons-material/PushPin';
const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: '112px',
    margin: "50px 100px",
    [theme.breakpoints.down("md")]: {
      marginTop: '100px',
      margin: 0,
    },
  },
  image: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
  },
  icons: {
    float: "right",
  },
  icon: {
    fontSize: "35px",
    padding: "10px 10px",
    " &:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  heading: {
    fontSize: 38,
    fontWeight: 600,
    textAlign: 'center',
    margin: '50px 0 10px 0'
  },
  subheading: {
    color: "#878787",
    display: "flex",
    margin: "20px 0",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    editIcon: {
      fontSize: 40
    }
  },
}));

const PostDetail = ({ match }) => {
  const classes = useStyle();
  const [postdata, setPostdata] = useState({});
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const [imageurl, setImageurl] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/post/${match.params.id}`
      );
      setPostdata(response.data);
      setUsername(response.data.User.name);
      setImageurl(response.data.picture);
    };
    fetchData();
    if (user) {
      setFlag(true);
    }
  }, []);
  const deleteBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `/post/${match.params.id}/delete`,
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("currentUser")).accesstoken,
          },
        }
      );
      history.push("/");
    } catch (error) {
      console.log("Error while calling deletePost API ", error);
    }
  };
  var div = document.createElement("div");
  div.innerHTML = postdata.description;
  return (
    <Box className={classes.container}>
      <img src={imageurl} alt="no blogpost-image" className={classes.image} />
      {flag ? (
        user.id === postdata.userId ? (
          <Box className={classes.icons}>
            <Link to={`/updatepost/${postdata.id}`}>
              <Edit className={classes.icon} color="primary" />
            </Link>
            <Link>
              <Delete
                onClick={deleteBlog}
                className={classes.icon}
                color="error"
              />
            </Link>
          </Box>
        ) : null
      ) : null}
      <Typography className={classes.heading}>{postdata.title}</Typography>
      <Box className={classes.subheading}>
        <Typography>
          Author: <span style={{ fontWeight: 600 }}>{username}</span>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(postdata.createdAt).toDateString()}
        </Typography>
      </Box>
      <Typography><PushPinIcon color="primary" className={classes.editIcon} />{div.innerText}</Typography>
      <Comments postdata={postdata} />
    </Box>
  );
};

export default PostDetail;
