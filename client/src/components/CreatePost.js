import React, { useState, useEffect } from 'react';
import { Box, makeStyles, FormControl, Typography, InputBase, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import { AddCircle as Add } from '@material-ui/icons';
import axios from 'axios';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import '../index.css'
import { postFailure, postStart, postSuccess } from "../redux/postRedux";
const useStyle = makeStyles(theme => ({
    container: {
        marginTop: '112px',
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            marginTop: '100px',
            margin: 0,
        },
    },
    picture: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    form: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    addIcon: {
        marginLeft: 30
    }
}));
const initialPost = {
    title: '',
    description: '',
    picture: '',
}
const CreatePost = () => {
    const editorRef = useRef(null);
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user.currentUser);
    const [postdata, setPostdata] = useState(initialPost);
    const [imageurl, setImageurl] = useState('');
    const [imagesel, setImagesel] = useState("");
    const { isFetching, error } = useSelector((state) => state.post);
    const url = imageurl ? imageurl : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const userid = user.id;
    const [category, setCategory] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleMenu = (event) => {
        setCategory(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        const getImage = async () => {
            if (imagesel) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    setImageurl(reader.result)
                }
                reader.readAsDataURL(imagesel);
            }
        }
        getImage();
    }, [imagesel])
    const savePost = async () => {
        const formData = new FormData()
        formData.append("file", imagesel)
        formData.append("upload_preset", "postpictures")
        await axios.post("https://api.cloudinary.com/v1_1/dldwmaxl1/image/upload", formData).then((response) => {
            const createPost = async () => {
                if (category) {
                    dispatch(postStart());
                    const result = await axios.post(`/post/${userid}/${category}/create`,
                        { picture: response.data.url, title: postdata.title, description: editorRef.current.getContent() }, {
                        headers: {
                            Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).accesstoken
                        }
                    }
                    );
                    if (result.data) {
                        dispatch(postSuccess(result.data));
                        history.push('/')
                    }
                } else {
                    alert('Post not Created, Select a Category and Choose Image to Post!')
                    dispatch(postFailure());
                }
            }
            createPost()
        }).catch(() => {
            alert('Post not Created, Select a Category and Choose Image to Post!')
            dispatch(postFailure());
        }
        )
    }
    const handleChange = (e) => {
        setPostdata({ ...postdata, [e.target.name]: e.target.value });
    }
    return (
        <>
            <Box className={classes.container}>
                <img src={url} alt="banner" className={classes.picture} />
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={category}
                            onChange={handleMenu}
                        >
                            <MenuItem value={1}>Music</MenuItem>
                            <MenuItem value={2}>Movies</MenuItem>
                            <MenuItem value={3}>Sports</MenuItem>
                            <MenuItem value={4}>Tech</MenuItem>
                            <MenuItem value={5}>Fashion</MenuItem>
                            <MenuItem value={6}>News</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <FormControl className={classes.form}>
                    <label htmlFor="fileInput">
                        <Typography>Choose Image</Typography>
                        <Add className={classes.addIcon} fontSize="large" color="action" />
                    </label>
                    <Box>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(event) => {
                                setImagesel(event.target.files[0]);
                            }}
                        />
                    </Box>
                    <InputBase name='title' placeholder="Title" onChange={(e) => handleChange(e)} className={classes.textfield} />
                    <Button className={classes.button} onClick={() => savePost()} disabled={isFetching} variant="contained" color="primary">Publish</Button>
                </FormControl>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    className={classes.textarea}
                    name='description'
                />
                {error &&
                    <Alert severity="error">
                        <AlertTitle>Post not Created</AlertTitle>
                        Select a Category and Choose Image to Post!
                    </Alert>
                }
            </Box>

        </>
    )
}
export default CreatePost;