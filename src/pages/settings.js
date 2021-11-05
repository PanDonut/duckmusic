import './settings.css';
import Topnav from '../component/topnav/topnav';
import lay from '../style/App.module.css';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import React, { useEffect, useState } from 'react';
import { setTheme } from '../theme';
import { decode } from 'he';

function Settings() {


    const size = useWindowSize();
    const [togClass, setTogClass] = useState('dark');
    let theme = localStorage.getItem('theme');

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTogClass('light')
        }
    }, [theme])

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }


    return (
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
            <div>
            <Topnav />
            <div className="marg">
                    <h2>Ustawienia</h2>
                    <div className="ust">
                        <h3>{decode("Wygl&#261;d")}</h3>
                <section>                 
                            <h4>Jasny motyw</h4>
                <div className="container--toggle">
                    {
                        togClass === "light" ?
                                <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />                    
                            :
                                <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
                    }
                    <label htmlFor="toggle" className="toggle--label">
                        <span className="toggle--label-background"></span>
                    </label>
                </div>
                        </section>
                        </div>
                </div>
                </div>
        </div>
        )
}

export default Settings;