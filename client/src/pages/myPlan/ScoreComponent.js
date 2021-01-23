import React from "react";
import {BarChart} from "react-easy-chart";
import "./myPlan.css";

function ScoreComponent(props) {

    let scores = JSON.stringify(props.allUsersOfPlan)

    function renameKey(obj, oldKey, newKey){
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    const arr = JSON.parse(scores);
    arr.forEach(obj => renameKey(obj, "userName", "x"));
    const updatedScores = JSON.stringify(arr);
    const arr2 = JSON.parse(updatedScores)
    arr2.forEach(obj => renameKey(obj, "points","y"));




    return (
        <div className="container backdrop my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <div className="card p-4 col-12 col-lg-4 myPlan-card addPlan-style">
                    <h2 className="tab-task-title"><strong>Score</strong></h2>
                    <div className="col-md-12 chart-style">
                        <BarChart
                            axes
                            height={400}
                            width={720}
                            colorBars
                            yTickNumber={10}
                            data={arr2}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ScoreComponent