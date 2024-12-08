import {React, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";

import {LoadData} from'./LoadDummyData.js';
import Header from '../components/Common/Header.component.jsx';
import Footer from '../components/Common/Footer.component.jsx';
import '../App.css';



function View() {
    

    // add program dummy data with codes
    useEffect(() => {
       
        LoadData();

    }, []);


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