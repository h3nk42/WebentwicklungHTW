import React, { useState, useEffect } from "react";
import settingsDark from "../../logo/settings-dark.png";
import settings from "../../logo/settings-light.png";
import { useAuth } from "../../context/auth";
import DayPickerInput from "react-day-picker/DayPickerInput";
import axios from "axios";
import "./ProfileCard.css";
import "react-day-picker/lib/style.css";
import RenderAvatar from "../avatar/Avatar";
import {useTranslation} from "react-i18next";

function ProfileCard() {
  const { user, darkMode } = useAuth();
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;
  const {t} = useTranslation();

  let config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    axios
      .get(`${API_URL}auth/whoAmI`, config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDayChange = (day) => {
    setDateOfBirth(day?.toLocaleDateString());
  };

  function handleCancel() {
    setFirstName("");
    setSurName("");
    setDateOfBirth("");
    setEditing(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let body = {
      firstName: firstName,
      surName: surName,
      dateOfBirth: dateOfBirth,
    };
    await axios({
      method: "post",
      url: `${API_URL}user/updateData`,
      data: body,
      headers: { Authorization: `Bearer ${user?.token}` },
    })
      .then((res) => {
        console.log(res);
        setEditing(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div
      data-testid="profile-card"
      className="card p-4 col-12 col-lg-4 profile-card profile-style"
    >
      <div className="heading">
        <div className="profile-title">
          <h2 data-testid="profile-title">{t("profile")}</h2>
          {!isEditing && (
            <img
              data-testid={darkMode === "dark" ? "edit-dark" : "edit-light"}
              className="edit-profile"
              src={darkMode === "dark" ? settingsDark : settings}
              alt="edit profile"
              onClick={() => setEditing(true)}
            />
          )}
        </div>
        <RenderAvatar />
      </div>
      <div className="text-left mt-3">
        <label className="label">{t("username")} :</label>
        <p>{user?.userName ? user.userName : "testguy"}</p>
        <label className="label">Plan ID :</label>
        <p>{user?.plan ? user.plan : "-"}</p>
        {!isEditing ? (
          <>
            <label className="label">{t("firstName")} :</label>
            <p data-testid="firstName">
              {data?.firstName ? data?.firstName : "-"}
            </p>
            <label className="label">{t("lastName")} :</label>
            <p data-testid="surName">{data?.surName ? data?.surName : "-"}</p>
            <label className="label">{t("dateOfBirth")} :</label>
            <p>{data?.dateOfBirth ? data?.dateOfBirth : "-"}</p>
          </>
        ) : (
          <form data-testid="profile-form">
            <label className="label" htmlFor="firstName">
              {t("firstName")} :
            </label>
            <input
              id="firstName"
              type="text"
              className="my-2"
              name="firstName"
              placeholder={t("firstName")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label" htmlFor="surName">
              {t("lastName")} :
            </label>
            <input
              id="surName"
              type="text"
              className="my-2"
              name="surName"
              placeholder={t("lastName")}
              value={surName}
              onChange={(e) => setSurName(e.target.value)}
            />
            <label className="label">{t("dateOfBirth")} :</label>
            <DayPickerInput
              onDayChange={handleDayChange}
              className="my-2"
              dayPickerProps={{
                month: new Date(1998, 0),
              }}
            />
            <div className="mt-3">
              <button
                data-testid="cancel-btn"
                className="btn btn-outline-primary btn-sm mr-2"
                onClick={handleCancel}
              >
                {t("cancel")}
              </button>
              <button
                data-testid="save-btn"
                type="submit"
                className="btn btn-primary btn-sm m-2 px-3"
                onClick={handleSubmit}
                disabled={
                  firstName === "" && surName === "" && dateOfBirth === ""
                }
              >
                {t("save")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
