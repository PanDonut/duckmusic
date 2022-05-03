import Topnav from '../component/topnav/topnav';
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import PlaylistCardM from '../component/cards/playlist-card-m';


import Sidebar from '../component/sidebar/sidebar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

import styles from './playlist.module.css';
import PLAYLIST from '../data/index.json'

oncontextmenu = function (e) {
    e.preventDefault();
};



function NotFound() {
    const size = useWindowSize();
    const history = useHistory();

    const errr = toast.error('Wystąpił błąd', {
        transition: Slide,
        position: toast.POSITION.TOP_CENTER
    });

    return (
        <>
           <div className={styles.PlaylistPage}>
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
                <div></div>
                
                <div className={styles.Content}>
                    <div className={styles.notexist}>	
							<div>	
							<h1>Nie możemy tego znaleźć</h1>
							<h4 onClick={() => {history.goBack()}}>Wróć do poprzedniej strony</h4>
							</div>
							</div>
                </div>
            </div>
            </>
    );
}

export default NotFound;