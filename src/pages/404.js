import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import PlaylistCardM from '../component/cards/playlist-card-m';

import styles from "./embed.module.css";


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
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';


import { PLAYLIST } from '../data/index'

oncontextmenu = function (e) {
    e.preventDefault();
};


function NotFound() {
    const size = useWindowSize();
    const showerr = toast.error('Wystąpił błąd', {
        transition: Slide,
        position: toast.POSITION.TOP_CENTER
    });
    return (
        <div className={lay.layout} onLoad={() => { { showerr(); } }}>
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
                <div className={styles.Bg}></div>
                <Topnav />
                
                <div className={styles.Content}>
                </div>
            </div>
            </div>
    );
}

export default NotFound;