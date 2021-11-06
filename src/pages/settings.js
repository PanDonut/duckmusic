import './settings.css';
import Topnav from '../component/topnav/topnav';
import lay from '../style/App.module.css';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import React, { useEffect, useState } from 'react';
import { setTheme, setEc } from '../theme';
import { decode } from 'he';

function Settings() {


    const size = useWindowSize();
    const [togClass, setTogClass] = useState('dark');
    const [toggle, setToggle] = useState(localStorage.getItem('explicit'));
    let theme = localStorage.getItem('theme');
    let ec = localStorage.getItem('explicit');

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
            setTogClass('light');
        } else {
            setTheme('theme-dark');
            setTogClass('dark');
        }
    }

    const handleOnClick1 = () => {
        if (localStorage.getItem('explicit') === 'no') {
            setEc('yes');
            setToggle('true')
        } else {
            setEc('no');
            setToggle('false')
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
                    <div className="ust">
                        <h3>{decode("Kontrola tre&#347;ci")}</h3>
                        <section>
                            <h4>{decode("Wy&#347;wietlaj nieodpowiednie playlisty")}</h4>
                            <div className="container--toggle">
                                {
                                    toggle === "yes" ?
                                        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick1} checked />
                                        :
                                        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick1} />
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