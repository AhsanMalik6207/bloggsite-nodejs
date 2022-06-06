import React, { useState, useEffect } from 'react';
import { Grid, Button, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { AddCircle as Add } from '@material-ui/icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { userprofileFailure, userprofileStart, userprofileSuccess } from "../redux/userprofileRedux";
const useStyle = makeStyles(theme => ({
    text1: {
        borderBottom: "2px solid #DBD7D7",
        width: '30%',
    },
    paddingadd: {
        padding: '14px 0px',
        borderBottom: "1px solid gray",
        border: "none",
        backgroundColor: "#F0F0F0",
        width: 'auto'
    },
    picture: {
        textAlign: 'center',
        margin: "auto",
        display: 'block',
        width: '90%',
        borderRadius: "50px",
        boxShadow: 'rgb(0 0 1 / 30%) 0px 5px 10px',
        border: '4px solid #E6C8C5',
    },
    btnstyle: { width: '108%' },
    spanstyle: { color: "red", marginTop: "10px" },
    addIcon: { width: "100%" },
    paperStyle: { marginTop: 140, padding: 20, height: '70vh', width: 320, margin: "20px auto" },
}));
const initialUserprofile = {
    gender: '',
    phonenumber: '',
    bio: '',
    picture: '',
}
const CreateUserprofile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const [imagesel, setImagesel] = useState("");
    const [userprofiledata, setUserprofiledata] = useState(initialUserprofile);
    const [imageurl, setImageurl] = useState('');
    const { isFetching, error } = useSelector((state) => state.userprofile);
    const userid = user.id;
    const name = user.name;
    const email = user.email;
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
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/userprofile/${userid}`)
            setUserprofiledata({ gender: response.data.userprofile.gender, phonenumber: response.data.userprofile.phonenumber, bio: response.data.userprofile.bio, picture: response.data.userprofile.picture })
        }
        fetchData()
    }, [])
    const saveUserprofile = async () => {
        const formData = new FormData()
        formData.append("file", imagesel)
        formData.append("upload_preset", "userprofilepictures")
        await axios.post("https://api.cloudinary.com/v1_1/dldwmaxl1/image/upload", formData).then((response) => {
            const createUserprofile = async () => {
                dispatch(userprofileStart());
                const result = await axios.post(`/userprofile/${userid}`,
                    { picture: response.data.url, gender: userprofiledata.gender, phonenumber: userprofiledata.phonenumber, bio: userprofiledata.bio }, {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).accesstoken
                    }
                }
                );
                if (result.data) {
                    dispatch(userprofileSuccess(result.data));
                    alert('User Profile Saved Successfully!');
                } else {
                    alert('Profile not Saved, Something went Wrong!')
                    dispatch(userprofileFailure());
                }
            }
            createUserprofile()
        }).catch(() => {
            const createUserprofile = async () => {
                dispatch(userprofileStart());
                const result = await axios.post(`/userprofile/${userid}`,
                    { picture: userprofiledata.picture? userprofiledata.picture:'', gender: userprofiledata.gender, phonenumber: userprofiledata.phonenumber, bio: userprofiledata.bio }, {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).accesstoken
                    }
                }
                );
                if (result.data) {
                    dispatch(userprofileSuccess(result.data));
                    alert('User Profile Saved Successfully!');
                } else {
                    alert('Profile not Saved, Something went Wrong!')
                    dispatch(userprofileFailure());
                }
            }
            createUserprofile()
        }
        )
    }
    const handleChange = (e) => {
        setUserprofiledata({ ...userprofiledata, [e.target.name]: e.target.value });
    }
    return (
        <Grid className={classes.paperStyle}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h6" className={classes.text1}>
                        User Profile
                    </Typography>
                    <Grid container spacing={1} justifyContent="center" alignItems="auto">
                        <Grid xs={7} item >
                            <img src={imageurl ? imageurl : userprofiledata.picture} alt="No Profile Picture" className={classes.picture} />
                            <label htmlFor="fileInput">
                                <Add className={classes.addIcon} fontSize="large" color="action" />
                            </label>
                        </Grid>
                        <Grid xs={7} item >
                            <input
                                name='picture'
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(event) => {
                                    setImagesel(event.target.files[0]);
                                }}
                            />
                        </Grid>
                        <Grid xs={7} item >
                            <input value={name} variant="outlined" disabled fullWidth className={classes.paddingadd} />
                        </Grid>
                        <Grid xs={7} item>
                            <input value={email} type='email' variant="outlined" disabled fullWidth className={classes.paddingadd} />
                        </Grid>
                        <Grid item xs={7}>
                            <input defaultValue={userprofiledata.gender} name='gender' placeholder="Enter gender" onChange={(e) => handleChange(e)} variant="outlined" fullWidth className={classes.paddingadd} />
                        </Grid>
                        <Grid item xs={7}>
                            <input defaultValue={userprofiledata.phonenumber} name='phonenumber' type="number" onChange={(e) => handleChange(e)} placeholder="Enter phone number" variant="outlined" fullWidth className={classes.paddingadd} />
                        </Grid>
                        <Grid item xs={7} >
                            <input defaultValue={userprofiledata.bio} name='bio' multiline rows={4} onChange={(e) => handleChange(e)} placeholder="Type your bio here" variant="outlined" fullWidth className={classes.paddingadd} />
                        </Grid>
                        <Grid item xs={7}>
                            <Button onClick={saveUserprofile} disabled={isFetching} variant="contained" color="primary" className={classes.btnstyle}>Save Changes</Button>
                        </Grid>
                    </Grid>
                    {error && <Alert severity="error">
                        <AlertTitle>Profile not Saved</AlertTitle>
                        Something went Wrong!
                    </Alert>
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}
export default CreateUserprofile;