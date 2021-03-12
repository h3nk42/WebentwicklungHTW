
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
        headers: {Authorization: `Bearer ${user?.token}`},
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

    async function handleSubmit(e) {
        e.preventDefault();
        let body = {
            firstName: firstName,
            surName: surName,
            dateOfBirth: dateOfBirth
        }
        await axios({
            method: 'post',
            url: `${API_URL}user/updateData`,
            data: body,
            headers: {Authorization: `Bearer ${user?.token}`}
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
                    <img data-testid={darkMode === "dark" ? "edit-dark" : "edit-light"}
                         className="edit-profile"
                         src={darkMode === "dark" ? settingsDark : settings}
                         alt="edit profile"
                         onClick={() => setEditing(true)}
                    />)}
                <img data-testid={darkMode === "dark" ? "profile-pic-dark" : "profile-pic-light"}
                     className="mr-4 ml-auto avatar"
                     src={darkMode === "dark" ? avatarDark : avatar}
                     alt="profile picture"
                />
            </div>
            <div className="text-left mt-3">
                <label className="label">Username :</label>
                <p>{user?.userName ? user.userName : 'testguy'}</p>
                <label className="label">Plan ID :</label>
                <p>{user?.plan ? user.plan : '-'}</p>
                {!isEditing ? (
                    <>
                        <label className="label">First name :</label>
                        <p data-testid="firstName">{data?.firstName ? data?.firstName : '-'}</p>
                        <label className="label">Surname :</label>
                        <p data-testid="surName">{data?.surName ? data?.surName : '-'}</p>
                        <label className="label">Date of birth :</label>
                        <p>{data?.dateOfBirth ? data?.dateOfBirth : '-'}</p>
                    </>
                ) : (
                    <form data-testid="profile-form">
                        <label className="label" htmlFor="firstName">First name :</label>
                        <input id="firstName" type="text"
                               className="my-2"
                               name="firstName"
                               placeholder="First name"
                               value={firstName}
                               onChange={e => setFirstName(e.target.value)}
                        />
                        <label className="label" htmlFor="surName">Surname :</label>
                        <input id="surName" type="text"
                               className="my-2"
                               name="surName"
                               placeholder="Surname"
                               value={surName}
                               onChange={e => setSurName(e.target.value)}
                        />
                        <label className="label">Date of birth :</label>
                        <DayPickerInput onDayChange={handleDayChange}
                                        className="my-2"
                                        dayPickerProps={{
                                            month: new Date(1998, 0)
                                        }}
                        />
                        <div className="mt-3">
                            <button data-testid="cancel-btn"
                                    className="btn btn-outline-primary btn-sm mr-2"
                                    onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button data-testid="save-btn"
                                    type="submit"
                                    className="btn btn-primary btn-sm m-2 px-3"
                                    onClick={handleSubmit}
                                    disabled={firstName === "" && surName === "" && dateOfBirth === ""}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ProfileCard;
