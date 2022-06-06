import * as React from 'react';
import { Box, Typography, makeStyles, Grid, Avatar ,TextField} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    decorate: {
        display: "flex",
        fontWeight: "bolder",
        fontFamily: "roboto",
        position: "relative",
        marginTop: "20px",
        "&:before": {
            width: "40px",
            height: "40px",
            backgroundColor: "#0097a7",
            content: '""',
            borderRadius: "50%",
        },
    },
    decoratetxt: {
        lineHeight: "40px",
        position: " absolute",
        left: "20px",
    },
    divider: {
        width: "64px",
        height: "4px",
        backgroundColor: '#0097a7',
        margin: theme.spacing(2, 0),
    },
    sectionHeading: {
        color: 'black',
        margin: theme.spacing(1, 0),
    },
    sectionHeadingCont: {
        padding: theme.spacing(1),
        color: "black",
    },
    MediaText: {
        color: "black",
    },
    cssLabel: {
        color: "black",
        "&.Mui-focused": {
            color: 'black',
        },
    },
    cssOutlinedInput: {
        "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline":
        {
            borderColor:"black",
            opacity: 0.5,
        },
        "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
            opacity: 1,
            borderColor: "black",
        },
        "&$cssFocused $notchedOutline": {
            borderColor: '#0097a7', 
            color: '#0097a7',
        },
    },
    notchedOutline: {},
    cssFocused: {},
    error: {},
    disabled: {},

}));
// withIcon for test boolian condition
export const Decorator = ({ label, withIcon, Icon,styles }) => {
    const classes = useStyle();
    return (
        <Box className={classes.decorate} style={styles}>
            <Typography className={classes.decoratetxt} variant='span'>{label}</Typography>
            {
                withIcon ? <Typography className={classes.arrow} variant='span'>{Icon}</Typography> : null
            }
        </Box>
    );
};
export const Divider = ({ style }) => {
    const classes = useStyle();
    return <div className={classes.divider} style={style}></div>;
};

export const RenderSectionHeading = ({
    smallText,
    heading,
    alignCenter,
    description
}) => {
    const classes = useStyle();
    return (
        <Box className={classes.sectionHeadingCont}>
            {Decorator({
                label: smallText,
                withIcon: false,
                styles: alignCenter ? { width: "100px", margin: "10px auto" } : {},
            })}
            <Typography
                variant='h4'
                align={alignCenter ? "center" : "left"}
                className={classes.sectionHeading}>
                {heading}
            </Typography>
            {/* style attribute here for inline style */}
            {Divider({
                style: alignCenter ? { margin: "16px auto" } : { margin: "16px 0px" },
            })}
            <Typography
                variant='body1'
                component='h6'
                align={alignCenter ? "center" : "left"}
                className={classes.sectionDesc}>
                {description}
            </Typography>
        </Box>
    );
};



export const RenderInputText = ({
    type,
    name,
    label,
    state,
    onChange,
    multiline,
    rows,
}) => {
    const { data } = state;
    const classes = useStyle();
    return (
        <TextField
            InputLabelProps={{
                classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                },
            }}
            InputProps={{
                classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                },
            }}
            variant='outlined'
            label={label}
            fullWidth={true}
            name={name}
            type={type}
            value={data[name]}
            onChange={onChange}
            multiline={multiline}
            rows={rows}
            required
        />
    );
};

