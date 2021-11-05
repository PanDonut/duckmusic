import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import PlaylistCardM from '../component/cards/playlist-card-m';
import ExpandButton from '../component/buttons/expand-button';

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

import { PLAYLIST } from '../data/index';


import { useHistory } from "react-router-dom";

oncontextmenu = function (e) {
    e.preventDefault();
};


function Hide() {
    document.documentElement.style.setProperty('--expand', '180px');
};




function Home({ isExpanded = false }) {

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

    

    const history = useHistory();
    const size = useWindowSize();

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

            <Topnav />
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
                                            <div className={styles.mrag}>
                                                <h2>{list.title}</h2>
                                                <h4>{list.artist}</h4>
                                                <h3>{list.promodesc}</h3>
                                                <Link to={"/playlist/" + list.link}>
                                                <button>{decode("S&#322;uchaj")}</button>
                                                </Link>
                                            </div>
                                            <button className={styles.sponsored}>Sponsorowane</button>
                                        </div>
                                    );
                                })}
                        </section>
                    <div className={styles.SectionCards}>
                        {PLAYLIST.map((item) => {
                            return (
                                <PlaylistCardS 
                                    key={item.title}
                                    data={item}
                                />
                            );
                        })}
                    </div>
                        <div className={styles.BtnDiv}>
                                <button
                                    className={styles.Btn}
                                    onClick={Expand}
                                >
                                    <ExpandButton />
                                </button>
                                <button
                                    className={styles.Btn1}
                                    onClick={Hide}
                                >
                                    <ExpandButton />
                                </button>
                        </div>
                </section>

                <section>
                    <div className={styles.SectionTitle1}>
                        <TitleM>Odkrywaj</TitleM>
                    </div>
                    
                    <div className={styles.SectionCardsMedium}>
                        {PLAYLIST.slice(0, 6).map((item) => {
                            return (
                                <PlaylistCardM 
                                    key={item.title}
                                    data={item}
                                />
                            );
                        })}
                    </div>
                </section>
                </div>
            </div>
            
        </div>
    );
}

export default Home;
