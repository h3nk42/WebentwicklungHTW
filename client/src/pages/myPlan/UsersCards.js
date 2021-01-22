import React from "react";
import "./myPlan.css";



function UsersCards(props) {
    return(
        <div className="col-md-4 users-sm-style">
            <p>{props.userName}</p>
            <button onClick={() => props.handleDeleteUser(props.userName)}>delete User</button>
        </div>
    )

}

export default UsersCards;