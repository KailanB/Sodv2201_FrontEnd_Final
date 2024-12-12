import {React } from 'react';
import { Outlet } from "react-router-dom";

import Header from '../components/Common/Header.component.jsx';
import Footer from '../components/Common/Footer.component.jsx';
import '../App.css';



function View() {
    

    return (

        <>
            <div className="mainContent">
                <Header />
                <div>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>

    );

}

export default View;