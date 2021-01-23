import React from "react";
import "./myPlan.css";



function UsersCards(props) {
    return(
        <div className="col-md-4 users-sm-style">
            <p className="userCard-name">{props.userName}</p>
            <button className="users-sm-style-btn" onClick={() => props.handleDeleteUser(props.userName)}>&#128465;</button>
        </div>
    )

}

export default UsersCards;