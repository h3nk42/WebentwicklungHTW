import React, {useState} from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import useToken from "../../hooks/useToken";
import TaskCard from './TaskCard';




function TasksComponent(props) {

    const {token} = useToken();
    const API_URL = process.env.REACT_APP_API_URL;
    let [taskName,setTaskName] = useState(" ");
    const [pointsWorth, setPointsWorth] = useState(null);


    function createTask(taskName,pointsWorth) {
        props.setIsLoading(true);
        const body = {name: taskName, pointsWorth: pointsWorth}
        const headers = {Authorization: `Bearer ${token}`};
        axios.post(`${API_URL}task/create`, body, {headers})
            .then(response => {
                console.log(response);
                props.setIsLoading(false);
                props.getTasksFromDB();
            })
            .catch(error => {
                console.log(error);
                props.setIsLoading(false);
            })
    }


    function handleDeleteTask(id){
        props.setIsLoading(true);
        axios({
            method: 'delete',
            url: `${API_URL}task/destroy`,
            data: {taskId: id},
            headers: {Authorization: `Bearer ${token}`}
        }).then(response=>{
            console.log(response);
            props.setIsLoading(false);
            props.getTasksFromDB();
        }).catch(error => {
                console.log(error);
                props.setIsLoading(false);
            })
    }


    function handleFullFillTask(taskID){
        props.setIsLoading(true);
        const body = {taskId: taskID, updatedAt: Date.now()};
        const headers = {Authorization: `Bearer ${token}`}
        axios.post(`${API_URL}task/fulfillTask`, body, {headers})
            .then(response => {
                console.log(response);
                props.setIsLoading(false);
                props.fetchData();
            })
            .catch(error => {
                console.log(error);
                props.setIsLoading(false);
            })
    }

    function handleTaskName(event){
        setTaskName(event.target.value);
    }

    function handlePointsWorth(event){
        setPointsWorth(event.target.value);
    }

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function stateModalAddTask(){
        return (
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className="modal-header">
                    <p className="modal-text">Add your Task's name</p>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <p>TasksName</p>
                    <input className="modal-input" type="text" value={taskName} onChange={handleTaskName}/>
                    <p style={{margin:10}}>Points worth</p>
                    <input className="modal-input" type="text" value={pointsWorth} onChange={handlePointsWorth}/>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button className="modal-button" onClick={() => createTask(taskName,pointsWorth)}>Add Task</button>
                    {props.loading ? <LoadingSpinner /> : <div/>}
                </Modal.Footer>
            </Modal>
        )
    }


    function renderAllTasksCards() {
        return (
            <div>
                <ul>
                    {props.tasks.map(task =>
                        <li key={task._id}>
                            <TaskCard taskID={task._id} taskName={task.name} pointsWorth={task.pointsWorth} lastTimeDone={task.lastTimeDone} handleDelete={handleDeleteTask} handleFullFill={handleFullFillTask} />
                        </li>)}
                </ul>
            </div>
        )
    }

    function handleRefresh() {
        window.location.reload();
    }


    return (
        <div className="container backdrop my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <div className="card p-4 col-12 col-lg-4 myPlan-card addPlan-style">
                    <h2 className="tab-task-title"><strong>Tasks</strong>
                        <button onClick={handleShow} className="add-user-button"> + </button>
                        <button onClick={handleRefresh}> Refresh page </button>
                        {stateModalAddTask()}
                    </h2>
                    <ul>
                        {renderAllTasksCards()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TasksComponent;