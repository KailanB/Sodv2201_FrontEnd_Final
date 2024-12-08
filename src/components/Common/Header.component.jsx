import { useState } from 'react';
import './Header.style.css';
import NavBars from './NavBars.component';


const Header = (props) => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleNavBar = () => {
        setIsVisible(!isVisible);
    }

    const {title} = props;



    return (
        <div className="headerBar">
            <p>WSA</p>
            <h1>{title}</h1>
            <div>
                <div className="burgerMenu" onClick={toggleNavBar}> 
                    <div className="burgerMenuBar"></div>
                    <div className="burgerMenuBar"></div>
                    <div className="burgerMenuBar"></div>
                </div>
                {isVisible && <NavBars home="home" />}
            </div>

        </div>
    );


};

export default Header;