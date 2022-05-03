import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import PlaylistCardM from '../component/cards/playlist-card-m';
import PlaylistCardMNew from '../component/cards/playlist-card-m-new';
import ExpandButton from '../component/buttons/expand-button';

import div from 'react-fade-in';

import styles from "./home.module.css";

import React, { useState } from 'react';

import Sidebar from '../component/sidebar/sidebar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import Footer from '../component/footer/footer';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { Link } from 'react-router-dom';

import { decode } from 'he';

import PLAYLIST from '../data/index.json';


import { useHistory } from "react-router-dom";

oncontextmenu = function (e) {
    e.preventDefault();
};


function Hide() {
    document.documentElement.style.setProperty('--expand', '180px');
};


function Home() {
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = (e) => {
        e.target.scrollTop > 150 ?
        setScrolled(true)
        :
        setScrolled(false)
	}


    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const size = useWindowSize();
    const history = useHistory();
    
    var today = new Date()
    var curHr = today.getHours()
    const [timetext, setTimetext] = React.useState("");
    if (timetext == "") {
        if (curHr < 13) {
            setTimetext(decode("Dzie&#324; dobry"));
        } else if (curHr < 18) {
            setTimetext(decode("Mi&#322;ego popo&#322;udnia"));
        } else {
            setTimetext(decode("Dobry wiecz&#243;r"));
        }
    }

    
    

    
    

    function Expand() {
        document.documentElement.style.setProperty('--expand', '380px');
        document.documentElement.style.setProperty('--disp', 'none');
        document.documentElement.style.setProperty('--disp1', 'block');
        document.documentElement.style.setProperty('--rot', 'rotate(180deg)');
    };

    function Hide() {
        document.documentElement.style.setProperty('--expand', '180px');
        document.documentElement.style.setProperty('--disp', 'block');
        document.documentElement.style.setProperty('--disp1', 'none');
        document.documentElement.style.setProperty('--rot', 'rotate(0deg)');
    };
    return (
        <>          
        <div className={styles.Home} onScroll={handleScroll}>
                <ToastContainer
                    transition={Slide}
                    position="top-center"
                    autoClose={50000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    draggable
                    pauseOnHover
                    limit={1}
                />
            <div className={styles.HoverBg}></div>
            <div className={styles.Bg}></div>

                <Topnav useScrolled={scrolled} normal={true}/>
            <div className={styles.Content}>
                <section>
                    <div className={styles.SectionTitle}>
                            <TitleL>{timetext}</TitleL>
                    </div>

                        <section>
                                {PLAYLIST.filter(item => item.promoted == 'prawda').map((list) => {
                                    return (
                                        <div className={styles.gradC}>
                                            <img src={list.imgUrl} />
                                            <div visible="true" delay="150" className={styles.mrag}>
                                                <h2>{list.title}</h2>
                                                <h4>{list.artist}</h4>
                                                <h3>{list.promodesc}</h3>
                                                <Link to={"/playlist/" + list.link}>
                                                <button>{decode("S&#322;uchaj")}</button>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                        </section>
                </section>

                <section>
                    <div className={styles.SectionTitle1}>
                        <TitleM>Odkrywaj</TitleM>
                    </div>
                        <div visible="true" delay="500" className={styles.SectionCardsMedium}>
                                {
                                    PLAYLIST.filter((list) => list.ex == "no" || list.ex == localStorage.getItem('explicit')).sort(() => Math.random() - 0.5).map((item) => {
                                        if (localStorage.getItem('old') == 'yes' || size.width > CONST.MOBILE_SIZE) {
                                            return (
                                                <PlaylistCardM
                                                    key={item.title}
                                                    data={item}
                                                />
                                            );
                                        }
                                    })
                                }
                                </div>
                        <div visible="true" delay="250" className={styles.SectionCardsMedium}>
                            {
                                PLAYLIST.filter((list) => list.ex == "no" || list.ex == localStorage.getItem('explicit')).sort(() => Math.random() - 0.5).map((item) => {
                                    if (localStorage.getItem('old') == 'no' && size.width < CONST.MOBILE_SIZE || localStorage.getItem('old') == null && size.width < CONST.MOBILE_SIZE) {
                                        return (
                                            <PlaylistCardMNew
                                                key={item.title}
                                                data={item}
                                            />
                                        );
                                    }
                                })
                            }
                        </div>
                </section>
                </div>
            </div>
            
        </>
    );
}

export default Home;
