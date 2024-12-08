import {React, useState, useEffect} from 'react';
import './MessagePage.style.css';
import MessageDiv from './MessageDiv.component.jsx';



const AdminMessagesPage = () => {


    const [messages, setMessages]= useState(() => JSON.parse(localStorage.getItem('messages')) || []);


    return (

        <div>
            <h2>INFOMATION REQUESTS</h2><br></br>
            {messages.map((message, index) => (
                <div key={index}>
                    <MessageDiv fullName={message.fullName} email={message.email} message={message.message}/>
                    <br />
                </div>
                
            ))}
        </div>

    );
};


export default AdminMessagesPage;