import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import PlaylistCardM from '../component/cards/playlist-card';
import PlaylistCardMNew from '../component/cards/playlist-card-m-new';
import ExpandButton from '../component/buttons/expand-button';

import FadeIn from 'react-fade-in';

import styles from "./home.module.css";

import React from 'react';

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

import { SONGS } from '../data/songs';


import { useHistory } from "react-router-dom";

oncontextmenu = function (e) {
    e.preventDefault();
};


function Hide() {
    document.documentElement.style.setProperty('--expand', '180px');
};


function Home({ isExpanded = false }) {

    console.log("re-render");

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const size = useWindowSize();
    const history = useHistory();
    if (size > CONST.HD && /android/i.test(userAgent) ) {
        history.push('/tv');
    }

    console.log(localStorage.getItem('explicit'));
    
    var today = new Date()
    var curHr = today.getHours()
    const [timetext, setTimetext] = React.useState("");
    if (timetext == "") {
        if (curHr < 13) {
            console.log('Dzieñ dobry')
            setTimetext(decode("Dzie&#324; dobry"));
        } else if (curHr < 18) {
            console.log('Mi³ego popo³udnia')
            setTimetext(decode("Mi&#322;ego popo&#322;udnia"));
        } else {
            console.log('Dobry wieczór')
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
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
        <div className={styles.Home}>
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

                <Topnav normal={true}/>
            <div className={styles.Content}>

                <section>
                        <FadeIn visible="true" delay="250" className={styles.SectionCardsMedium}>
                            {
                                SONGS.sort(() => Math.random() - 0.5).map((item) => {
                                    console.log(item.songName);
                                        return (
                                            <PlaylistCardM
                                                key={item.songName}
                                                data={item}
                                            />
                                        );
                                })
                            }
                        </FadeIn>
                </section>
                </div>
            </div>
            
        </div>
    );
}

export default Home;
