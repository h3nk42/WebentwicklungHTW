import React from "react";
import "./myPlan.css";


function TaskCard(props) {

    let sec = Math.floor((Date.now() - props.lastTimeDone)/1000)


    return(
        <div className={sec < 10? " tasks-sm-style-green" : sec < 20 ? " tasks-sm-style-yellow" : " tasks-sm-style-red"} >
            <p className="taskCard-name">{props.taskName}</p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <button className="tasks-sm-style-btn-fullfill" onClick={() => props.handleFullFill(props.taskID)}>&#10003;</button>
                <button className="tasks-sm-style-btn" onClick={() => props.handleDelete(props.taskID)}>&#128465;</button>
            </div>
        </div>

    )



}

export default TaskCard;

