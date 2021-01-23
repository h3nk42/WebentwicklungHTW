import React from "react";
import "./myPlan.css";


function TaskCard(props) {

    let sec = Math.floor((Date.now() - props.lastTimeDone)/1000)
    console.log(props.taskName + " " + sec);

    if(sec<10){
        return (
            <div className="col-md-4 tasks-sm-style-green">
                <p className="taskCard-name">{props.taskName}</p>
                <button className="tasks-sm-style-btn" onClick={() => props.handleDelete(props.taskID)}>&#128465;</button>
                <button className="tasks-sm-style-btn-fullfill" onClick={() => props.handleFullFill(props.taskID)}>&#10003;</button>
            </div>
        )
    }else if (sec<20){
        return (
            <div className="col-md-4 tasks-sm-style-yellow">
                <p className="taskCard-name">{props.taskName}</p>
                <button className="tasks-sm-style-btn" onClick={() => props.handleDelete(props.taskID)}>&#128465;</button>
                <button className="tasks-sm-style-btn-fullfill" onClick={() => props.handleFullFill(props.taskID)}>&#10003;</button>
            </div>
        )
    }else {
        return (
            <div className="col-md-4 tasks-sm-style-red">
                <p className="taskCard-name">{props.taskName}</p>
                <button className="tasks-sm-style-btn" onClick={() => props.handleDelete(props.taskID)}>&#128465;</button>
                <button className="tasks-sm-style-btn-fullfill" onClick={() => props.handleFullFill(props.taskID)}>&#10003;</button>
            </div>
        )
    }



}

export default TaskCard;

