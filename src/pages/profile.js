import './profile.css';
import Topnav from '../component/topnav/topnav';
import lay from '../style/App.module.css';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import React, { useEffect, useState } from 'react';
import { setTheme, setEc, setSwi, setSwif, setOl } from '../theme';
import { decode } from 'he';

import div from 'react-fade-in';

function Settings() {


    const size = useWindowSize();



    return (
        <>
            <div className="body2">
                <Topnav back={true} />
                <div className="body1">
                
                <img src={`https://firebasestorage.googleapis.com/v0/b/duck-auth.appspot.com/o/users%2F${localStorage.getItem('emailduckmusic').replaceAll(
                      ".",
                      ""
                    )}%2Fprofile.png?alt=media`} />
            <div visible="true" delay="50" className="marg">
                    <h5>Profil</h5>
                    <h1>{localStorage.getItem('name')}</h1>
                    <h5 className="cu">{localStorage.getItem('emailduckmusic')}</h5>
                    </div>
                    </div>
                </div>
        </>
        )
}

export default Settings;