import './settings.css';
import Topnav from '../component/topnav/topnav';
import lay from '../style/App.module.css';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import React, { useEffect, useState } from 'react';
import { setTheme, setEc, setSwi, setSwif, setOl } from '../theme';
import { decode } from 'he';

import FadeIn from 'react-fade-in';

function Settings() {

    console.log("re-render");

    const size = useWindowSize();



    return (
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
            <div className="body">
                <Topnav back={true}/>
            <FadeIn visible="true" delay="50" className="marg">
                    <h2>Profil</h2>
                    <h3>{localStorage.getItem('name')}</h3>
                    <h5 className="cu">{localStorage.getItem('email')}</h5>
                </FadeIn>
                </div>
        </div>
        )
}

export default Settings;