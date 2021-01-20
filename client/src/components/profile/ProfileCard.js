import React, {useRef, useState} from 'react';
import avatarDark from "../../logo/profile-picture-dark.png";
import avatar from "../../logo/profile-picture.png";
import {useAuth} from "../../context/auth";
import Editable from "../Editable";
import './ProfileCard.css';

function ProfileCard() {
    const {userName, darkMode} = useAuth();
    const inputRef = useRef();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    return (
        <div data-testid="profile-card" className="card p-4 col-12 col-lg-4 profile-card profile-style">
            <div className="row align-items-center justify-content-between mt-2">
                <h2 data-testid="profile-title" className="col-md-4">Profile</h2>
                <img className="mr-4 avatar"
                     src={darkMode === "dark" ? avatarDark : avatar}
                     alt={darkMode === "dark" ? "profile pic dark" : "profile pic light"}/>
            </div>
            <div className="text-left mt-3">
                <p className="label">Username :</p><p>{userName ? userName : 'testguy'}</p>
                <p className="label">Name :</p>
                <Editable text={name}
                          placeholder={name ? name : "Edit name"}
                          childRef={inputRef}
                          type="input"
                >
                    <input ref={inputRef}
                           type="text"
                           name="name"
                           placeholder={name ? name : ""}
                           value={name}
                           onChange={e => setName(e.target.value)}
                    />
                </Editable>
                <p className="label">Surname :</p>
                <Editable text={surname}
                          placeholder={surname ? surname : "Edit surname"}
                          childRef={inputRef}
                          type="input"
                >
                    <input ref={inputRef}
                           type="text"
                           name="surname"
                           placeholder={surname ? surname : ""}
                           value={surname}
                           onChange={e => setSurname(e.target.value)}
                    />
                </Editable>
                <p className="label">Date of birth :</p>
                <Editable text={dateOfBirth}
                          placeholder={dateOfBirth ? dateOfBirth : "Edit date of birth"}
                          childRef={inputRef}
                          type="input"
                >
                    <input ref={inputRef}
                           type="text"
                           name="dateOfBirth"
                           placeholder={dateOfBirth ? dateOfBirth : ""}
                           value={dateOfBirth}
                           onChange={e => setDateOfBirth(e.target.value)}
                    />
                </Editable>
                <p className="label">Plan :</p><p>Plan name</p>
            </div>
        </div>
    );
}

export default ProfileCard;
