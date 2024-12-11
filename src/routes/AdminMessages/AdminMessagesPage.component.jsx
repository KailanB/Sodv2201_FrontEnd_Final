import {React, useState, useEffect} from 'react';
import './MessagePage.style.css';
import MessageDiv from './MessageDiv.component.jsx';
import axios from 'axios';


const AdminMessagesPage = () => {


    // const [messages, setMessages]= useState(() => JSON.parse(localStorage.getItem('messages')) || []);

    const [messages, setMessages] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {

        
        axios.get('http://localhost:5000/api/admin/messages', {withCredentials: true})
        .then(res => {
            setMessages([...res.data]);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });

    }, []);

    if(loading)
    {
        return (
            <div>
                <p>Loading student data...</p>
            </div>
        );
    }
    if(error)
    {
        return (
            <div>
                <p>Error loading data ...{error}</p>
            </div>
        );
    }
      

    return (

        <div>
            <h2>INFOMATION REQUESTS</h2><br></br>
            {messages.map((message, index) => (
                <div key={index}>
                    <MessageDiv FullName={message.FullName} Email={message.Email} Message={message.Message}/>
                    <br />
                </div>
                
            ))}
        </div>

    );
};


export default AdminMessagesPage;