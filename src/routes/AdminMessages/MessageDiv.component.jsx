import './MessagePage.style.css';

const MessageDiv = (props) => {


    
    const {fullName, email, message} = props;

    return (

        <div className="messageDiv" >
            <h4>From {fullName}</h4>
            <p>Email: {email}</p>
            <p>Message: {message}</p>
        </div>

    );
};


export default MessageDiv