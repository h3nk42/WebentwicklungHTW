import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./myPlan.css";
import {useAuth} from "../../context/auth";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from 'axios';
import TasksComponent from "./TasksComponent"
import UsersComponent from "./UsersComponent";
import ScoreComponent from "./ScoreComponent";




function MyPlan() {


    const [currentTab, setCurrentTab] = useState('tab1')
    const API_URL = process.env.REACT_APP_API_URL;
    const {user} = useAuth();
    const [owner, setOwner] = useState("")
    let [planName, setPlanName] = useState("");
    let [isLoading, setIsLoading] = useState(true);
    let [allUsersOfPlan, setAllUsersOfPlan] = useState([{}]);
    let [allUsersWithoutPlan, setAllUsersWithoutPlan] = useState([]);
    let [tasks, setTasks] = useState([{}]);




    useEffect(() => {
        fetchData();
        return function cleanup(){
            clearTimeout()
        }
    },[])

    function fetchData(){
        let tempPlanName = "";
        try{
            axios.all([
                axios.get(`${API_URL}plan/showMany`,),
                axios.get(`${API_URL}user/showMany`,),
                axios.get(`${API_URL}plan/showMany`,)
            ])
                .then(axios.spread((planNameRes, withoutPlanRes, allUserOfPlanRes) => {
                    planNameRes.data.data.forEach((obj) => {
                        if(obj.owner === user.userName){
                            setOwner(obj.owner);
                            setPlanName(obj.name);
                            tempPlanName = obj.name;
                        }else{
                            obj.users.map(users => {
                                if(users.userName === user.userName){
                                    setOwner(obj.owner);
                                    setPlanName(obj.name);
                                    tempPlanName = obj.name;
                                }
                            })
                        }
                    })
                    withoutPlanRes.data.data.map(users => {
                        if(users.plan === null){
                            setAllUsersWithoutPlan(allUsersWithoutPlan => [...allUsersWithoutPlan, users.userName])
                        }
                    })
                    allUserOfPlanRes.data.data.map((obj) => {
                        if(obj.name === tempPlanName){
                            setAllUsersOfPlan(obj.users);
                        }
                    })
                }))
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }



    useEffect(() => {
        getTasksFromDB();
        return function cleanup(){
            clearTimeout()
        }
    },[])

    function getTasksFromDB(){
        let tempPlanName = "";
        try{
            axios.all([
                axios.get(`${API_URL}plan/showMany`,),
                axios.get(`${API_URL}plan/showMany`,)
            ])
                .then(axios.spread((planNameRes, allTasks) => {
                    planNameRes.data.data.forEach((obj) => {
                        if(obj.owner === user.userName){
                            setOwner(obj.owner);
                            setPlanName(obj.name);
                            tempPlanName = obj.name;
                        }else{
                            obj.users.map(users => {
                                if(users.userName === user.userName){
                                    setOwner(obj.owner);
                                    setPlanName(obj.name);
                                    tempPlanName = obj.name;
                                }
                            })
                        }
                    })
                    allTasks.data.data.map(obj => {
                        if(obj.name === tempPlanName){
                            setTasks(obj.tasks);
                        }
                    })
                }))
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }




    const tabList = [
        {
            name: 'tab1',
            label: 'Tasks',
            content: (
                <TasksComponent setIsLoading={setIsLoading} isLoading={isLoading} planName={planName} allUsersOfPlan={allUsersOfPlan} tasks={tasks} getTasksFromDB={getTasksFromDB} fetchData={fetchData}/>
            )
        },
        {
            name: 'tab2',
            label: 'Users',
            content: (
                <UsersComponent setIsLoading={setIsLoading} isLoading={isLoading} allUsersWithoutPlan={allUsersWithoutPlan} allUsersOfPlan={allUsersOfPlan} owner={owner} fetchData={fetchData}/>
            )
        },
        {
            name: 'tab3',
            label: 'Score',
            content: (
                <ScoreComponent allUsersOfPlan={allUsersOfPlan}/>
            )
        }
    ]



    if(isLoading){
        return <LoadingSpinner/>
    }




    return (
        <div data-testid="myplancard">
            <Header/>
                <div className="myTabs">
                    <div className="tabs-style">
                        {
                            tabList.map((tab,i) => (
                                <button
                                key={i}
                                onClick={() => setCurrentTab(tab.name)}
                                className={(tab.name === currentTab) ? 'activeTab' : 'notActiveTab'}>
                                    {tab.label}
                                </button>
                            ))
                        }
                    </div>
                    {
                        tabList.map((tab,i) => {
                            if(tab.name === currentTab){
                                return <div key={i}>{tab.content}</div>;
                            }else {
                                return null;
                            }
                        })
                    }
                </div>
            <Footer/>
        </div>
    )
}

export default MyPlan;

