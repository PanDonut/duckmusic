import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import PlaylistCardM from '../component/cards/playlist-card-m';
import ExpandButton from '../component/buttons/expand-button';

import "./info.module.css";

import FadeIn from 'react-fade-in';

import styl from "./info.module.css";

import React from 'react';
import GitInfo from 'react-git-info/macro';

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



import { PLAYLIST } from '../data/index';


import { useHistory } from "react-router-dom";

oncontextmenu = function (e) {
    e.preventDefault();
};


function Hide() {
    document.documentElement.style.setProperty('--expand', '180px');
};




function Home({ isExpanded = false }) {
    const gitInfo = GitInfo();
    const history = useHistory();
    const size = useWindowSize();

    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);

    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientX);
        document.documentElement.style.setProperty('--hop', '0');
    }

    function handleTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 150) {
            // do your stuff here for left swipe
            history.push('/search');
        }

        if (touchStart - touchEnd < -150) {
            // do your stuff here for right swipe
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
    console.log(gitInfo.branch);
    console.log(gitInfo.tags);
    console.log(gitInfo.commit.date);
    console.log(gitInfo.commit.hash);
    console.log(gitInfo.commit.message);
    console.log(gitInfo.commit.shortHash);
    return (
        <div className={lay.layout} onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)} onTouchEnd={() => handleTouchEnd()}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
            <div className={styl.Home}>
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

                <Topnav />
                    <div className={styl.left}>
                    <h4>{gitInfo.tags}</h4>
                </div>
                <FadeIn visible="true" delay="350" className={styl.right}>
                    <img alt="MEEM" src="https://github.com/PanDonut/pandonut.github.io/raw/main/logomusic.png"></img>
                    <h4>{gitInfo.branch + "-" + gitInfo.commit.hash + "-" + gitInfo.commit.message}</h4>
                    <h2>Hash:</h2>
                    <h4>{gitInfo.commit.shortHash}</h4>
                    <h2>Data aktualizacji:</h2>
                    <h4>{gitInfo.commit.date}</h4>
                    </FadeIn>
                    </div>
            </div>
    );
}

export default Home;