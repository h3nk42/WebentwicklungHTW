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



/*


Einfach ein Mal beim refresh der Daten die Farbe rendern je nachdem wie viele Sekunden vergangen sind seit dem timestamp
Dann bauste noch einen refresh button ein damit man nicht immer die ganze Seite neu laden muss

Ok da kannst du ja noch den timestamp mit.passen
Dann ne renderColor Funktion in der Taskcard und feddich


Math.floor((Date.now() - timeStamp)/1000)
das gibt dir die vergangene zeit in sekunden aus


 */