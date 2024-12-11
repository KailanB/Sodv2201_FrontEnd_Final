import './MessagePage.style.css';

const MessageDiv = (props) => {


    
    const {FullName, Email, Message} = props;

    return (

        <div className="messageDiv" >
            <h4>From {FullName}</h4>
            <p>Email: {Email}</p>
            <p>Message: {Message}</p>
        </div>

    );
};


export default MessageDiv