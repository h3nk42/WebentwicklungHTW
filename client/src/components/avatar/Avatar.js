import React from "react";
import "./avatar.css";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { IconButton } from "@material-ui/core";
import { useAuth } from "../../context/auth";
import avatarDark from "../../logo/profile-picture-dark.png";
import avatar from "../../logo/profile-picture.png";
import {useTranslation} from "react-i18next";
import RenderCropper from "../cropper/Cropper";
import { deleteFile } from 'react-s3';
import { API_URL } from '../profile/ProfileCard';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  paper: {
    marginRight: theme.spacing(2),
  },

  createicon: {
    height: "2rem",
    width: "2rem",
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#695d47",

    "&:hover": {
      backgroundColor: "#695d47",
    },
  },

  createicondark: {
    height: "2rem",
    width: "2rem",
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",

    "&:hover": {
      backgroundColor: "white",
    },
  },
}));

export const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_BUCKET_REGION,
  accessKeyId: process.env.REACT_APP_S3_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET,
}

export default function RenderAvatar({ data, setData }) {
  const { user, darkMode } = useAuth();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const {t} = useTranslation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const [showCropper, setShowCropper] = React.useState(false);
  const handleCropper = () => setShowCropper((prevValue) => !prevValue);

  const handleRemove = async () => {
    await axios({
      method: "post",
      url: `${API_URL}user/removePicture`,
      headers: { Authorization: `Bearer ${user?.token}` },
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
        deleteFile(`${user.userName}.jpeg`, config)
                .then(data => console.log(data))
                .catch(err => console.error(err))
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <div className="avatar-container">
        <div className="avatar">
          <img
            src={data.profilePicture ? `https://${process.env.REACT_APP_BUCKET_NAME}.s3.${process.env.REACT_APP_BUCKET_REGION}.amazonaws.com/${data.profilePicture}` :
                (darkMode === 'dark' ? avatarDark : avatar)}
            alt="avatar"
            className="avatar-img"
          />
        </div>
        <IconButton
          className={
            darkMode === "dark" ? classes.createicondark : classes.createicon
          }
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <CreateIcon
            fontSize="small"
            style={
              darkMode === "dark" ? { color: "#06090f" } : { color: "#ccba92" }
            }
          />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleCropper();
                        handleClose(e);
                      }}
                    >{t("change")}</MenuItem>
                    <MenuItem onClick={(e) => {
                      handleRemove();
                      handleClose(e);
                    }}>{t("remove")}</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {showCropper && <RenderCropper handleCropper={handleCropper} setData={setData} />}
    </>
  );
}
