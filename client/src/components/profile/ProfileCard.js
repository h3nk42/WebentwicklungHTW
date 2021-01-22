import React, {useState, useEffect} from 'react';
import avatarDark from "../../logo/profile-picture-dark.png";
import avatar from "../../logo/profile-picture.png";
import settingsDark from "../../logo/settings-dark.png";
import settings from "../../logo/settings-light.png";
import {useAuth} from "../../context/auth";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import axios from "axios";
import './ProfileCard.css';
import 'react-day-picker/lib/style.css';

function ProfileCard() {
    const {user, darkMode} = useAuth();
    const [isEditing, setEditing] = useState(false);
    const [data, setData] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surName, setSurName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const API_URL = process.env.REACT_APP_API_URL;

    let config = {
        headers: {Authorization: `Bearer ${user.token}`},
    }

    useEffect(() => {
        axios.get(`${API_URL}auth/whoAmI`, config)
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    const handleDayChange = (day) => {
        setDateOfBirth(day?.toLocaleDateString());
    }

    function handleCancel() {
        setFirstName("");
        setSurName("");
        setDateOfBirth("");
        setEditing(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let body = {
            firstName: firstName,
            surName: surName,
            dateOfBirth: dateOfBirth
        }
        axios({
            method: 'post',
            url: `${API_URL}user/updateData`,
            data: body,
            headers: {Authorization: `Bearer ${user.token}`}
        }).then((res) => {
            console.log(res);
            setEditing(false);
            setData(res.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }


    return (
        <div data-testid="profile-card" className="card p-4 col-12 col-lg-4 profile-card profile-style">
            <div className="row align-items-center justify-content-between mt-2">
                <h2 data-testid="profile-title"
                    className="col-md-4"
                >
                    Profile
                </h2>
                {isEditing ? (
                    <></>
                ) : (
                    <img className="edit-profile"
                         src={darkMode === "dark" ? settingsDark : settings}
                         alt="edit profile"
                         onClick={() => setEditing(true)}
                    />)}
                <img className="mr-4 ml-auto avatar"
                     src={darkMode === "dark" ? avatarDark : avatar}
                     alt="profile picture"
                />
            </div>
            <div className="text-left mt-3">
                <label className="label">Username :</label>
                <p>{user.userName ? user.userName : 'testguy'}</p>
                <label className="label">Plan :</label>
                <p>{user.plan ? user.plan : '-'}</p>
                {!isEditing ? (
                    <>
                        <label className="label">Name :</label>
                        <p>{data.firstName ? data.firstName : '-'}</p>
                        <label className="label">Surname :</label>
                        <p>{data.surName ? data.surName : '-'}</p>
                        <label className="label">Date of birth :</label>
                        <p>{data.dateOfBirth ? data.dateOfBirth : '-'}</p>
                    </>
                ) : (
                    <>
                        <label className="label">Name :</label>
                        <input type="text"
                               className="my-2"
                               name="firstName"
                               placeholder="Name"
                               value={firstName}
                               onChange={e => setFirstName(e.target.value)}
                        />
                        <label className="label">Surname :</label>
                        <input type="text"
                               className="my-2"
                               name="surName"
                               placeholder="Surname"
                               value={surName}
                               onChange={e => setSurName(e.target.value)}
                        />
                        <label className="label">Date of birth :</label>
                        <DayPickerInput onDayChange={handleDayChange}
                                        className="my-2"
                        />
                        <div className="mt-3">
                            <button className="btn btn-outline-primary btn-sm"
                                    onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button type="submit"
                                    className="btn btn-primary btn-sm"
                                    onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileCard;
