import React, {useEffect, useState} from "react";
import "./Chat.css";
import "../../../components/loginForm/spinner.css";
import {io} from "socket.io-client";
import {useAuth} from "../../../context/auth";




function ChatComponent(props) {

    const {user} = useAuth();
    const [socket, setSocket] = useState(null);

    const roomID = user.plan;
    const userName = user.userName;
    const userInfo = {message: "", username: userName, roomid: roomID};
    const [message, setMessage] = useState({ message: "", username: "", roomid: "" });
    const [chat, setChat] = useState([]); // all messages
    const [connected, setConnected] = useState(false);
    const WS_URL = process.env.REACT_APP_WS_URL;
    const API_PORT = process.env.PORT || 3001;

    // establish connection to websocket
    useEffect( () => {
        setSocket(io(`${WS_URL}`, {
            transports: ["websocket", "polling"]
        }));
    },[]);

    useEffect(() => {
        if(!socket) return;

        // as soon as component is mounted...
         socket.on("connect", () => {
             setConnected(socket.connected);
            // sending userName and romID to the server after connecting
             socket.emit("userInfo", userInfo);
        });

        // when message is coming from the server
        socket.on("message", (message) => {
            // to js object
            const msg = JSON.parse(message);
            setChat(chat => [...chat, msg]);
        });

        socket.on("disconnect", () => {
            setConnected(socket.connected);
        });


    }, [socket]);


    if (!connected){
        return (
            <div className="spin"> Connecting to Websocket, this can take some time, reload to page if it takes to long</div>
        )
    }

    const onTextChange = (e) => {
        setMessage({message: e.target.value, username: userName, roomid: roomID});
    }

    const onMessageSubmit = (e) => {
        const msg = JSON.stringify(message);
        socket.emit("message", msg);
        e.preventDefault();
        setMessage({message: "", username: "", roomid: ""});
    }


    return (
        <div className="container backdrop my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <div className="card p-4 col-12 col-lg-4 myPlan-card addPlan-style">
                    <h2 className="tab-task-title"><strong>Chat: Hello {props.userName}</strong></h2>
                    <main className="messageBoard">
                        <nav>
                            <ul className="all-messages-list">
                                {chat.map((msg, index) =>
                                    <li key={index} className="single-message">
                                        <b>[{msg.username}]</b>: <em>{msg.message}</em>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </main>
                    <form
                        action=""
                        onSubmit={onMessageSubmit}
                        className="input-and-button"
                    >
                        <input
                            className="message-input"
                            type="text"
                            placeholder={'Type a message ...'}
                            value={message.message}
                            onChange={onTextChange}
                        />
                        <input type="submit" value={'Send'} className="send-button"/>
                    </form>
                </div>
            </div>
        </div>
    )
}




export default ChatComponent;