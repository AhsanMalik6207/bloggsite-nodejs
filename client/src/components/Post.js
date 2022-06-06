import { makeStyles, Box, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import Clamp from "react-multiline-clamp";
import parse from "html-react-parser";
const useStyle = makeStyles({
  container: {
    borderRadius: 5,
    margin: 10,
    display: "flex",
    marginTop: 16,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    backgroundColor: 'white',
    alignItems: "center",
    flexDirection: "column",
    transition: '0.2s',
    height: 380,

    "& > *": {
      padding: "0 0px 0px 0px",
    },
    "&:hover": {
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
      transition: '0.2s',
      transform: " scale(0.9)",
      textDecoration: 'none'
    },
  },
  image: {
    width: "100%",
    objectFit: "cover",
    borderRadius: "5px 5px 0 0",
    height: 255,
  },
  text: {
    color: "#878787",
    fontSize: 10,
  },
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600
  },
  detail: {
    fontSize: 16,
    wordBreak: "break-word",
    paddingBottom: 20,
  },
  clamp: {
    wordBreak: 'break-word',
    textAlign: "center",
    fontSize: 15,
    textDecoration: 'none'
  },
});

const Post = ({ post }) => {
  const classes = useStyle();
  const [username, setUsername] = useState("");
  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  }
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `/user/${post.userId}`
      );
      setUsername(response.data.name);
    };
    getData();
  }, []);
  return (
    <Box className={classes.container}>
      <img src={post.picture} alt="no blogpost-image" className={classes.image} />
      <Typography className={classes.text}>
        {" "}
        {new Date(post.createdAt).toDateString()}
      </Typography>
      <Typography className={classes.heading}>{addEllipsis(post.title, 20)}</Typography>
      <Typography className={classes.text}>
        <b>Author:</b> {username}
      </Typography>
      <Clamp withTooltip lines={4}>
        <Typography className={classes.clamp}>{parse(post.description)}</Typography>
      </Clamp>
    </Box>
  );
};
export default Post;