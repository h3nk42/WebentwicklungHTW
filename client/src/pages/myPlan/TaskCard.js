import React from "react";
import "./myPlan.css";


function TaskCard(props) {

    let sec = Math.floor((Date.now() - props.lastTimeDone)/1000)
    console.log(props.taskName + " " + sec);



    // grün gelb rot
    if(sec<10){
        return (
            <div className="col-md-12">
                <div className="col-md-4 taskCard-green">
                    <div className="row">
                        <p>{props.taskName}</p>
                        <p>{props.pointsWorth}</p>
                        <p>{sec}</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="delete-task-btn" onClick={() => props.handleDelete(props.taskID)}>delTask
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="fullfill-task-btn"
                                    onClick={() => props.handleFullFill(props.taskID)}>fullfill
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }else if (sec<20){
        return (
            <div className="col-md-12">
                <div className="col-md-4 taskCard-yellow">
                    <div className="row">
                        <p>{props.taskName}</p>
                        <p>{props.pointsWorth}</p>
                        <p>{sec}</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="delete-task-btn" onClick={() => props.handleDelete(props.taskID)}>delTask
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="fullfill-task-btn"
                                    onClick={() => props.handleFullFill(props.taskID)}>fullfill
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }else {
        return (
            <div className="col-md-12">
                <div className="col-md-4 taskCard-red">
                    <div className="row">
                        <p>{props.taskName}</p>
                        <p>{props.pointsWorth}</p>
                        <p>{sec}</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="delete-task-btn" onClick={() => props.handleDelete(props.taskID)}>delTask
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button className="fullfill-task-btn"
                                    onClick={() => props.handleFullFill(props.taskID)}>fullfill
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }



}

export default TaskCard;

