import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { BrowserRouter as Router,
  Switch,
    Route,
  Link
} from "react-router-dom";
import Lyrics from './component/Lyrics';
import { initializeApp } from "firebase/app";
import { getAnalytics, initializeAnalytics, logEvent } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import useWindowSize from './hooks/useWindowSize';
import Sidebar from './component/sidebar/sidebar';
import MobileNavigation from './component/sidebar/mobile-navigation';
import Footer from './component/footer/footer';
import FooterTop from './component/footer/footertop';
import Home from './pages/home';
import Songs from './pages/songs';
import Search from './pages/search';
import Library from './pages/library';
import PlaylistPage from './pages/playlist';
import Embed from './pages/embed';
import Info from './pages/info';
import EmbedSmall from './pages/embed-s';
import * as Icons from './component/icons/index';
import CONST from './constants/index';
import PLAYLIST from './data/index.json';
import styles from './style/App.module.css';
import Card from './component/cards/playlist-card-m';
import NotFound from './pages/404';
import LyricsCard from './component/lyrics/lyrics-main';
import { keepTheme } from './theme';
import Connection from './pages/connection';
import Settings from './pages/settings';
import ID from './pages/songid';
import TV from './tv/index';
import Profile from './pages/profile';
import Logout from './pages/logout';

import Login from './login';
import './security.js';
import './menu.css'
import HandleAuth from './authorization.js';

function App() {

    const footerRef = useRef(null);

    if (localStorage.getItem('cindex') == null) {
        localStorage.setItem('cindex', [0, 0]);
    }

    if (localStorage.getItem('cid') == null) {
        localStorage.setItem('cid', 0);
    }

    if (localStorage.getItem('curl') == null) {
        localStorage.setItem('curl', ' ');
    }

    if (localStorage.getItem('cname') == null) {
        localStorage.setItem('cname', ' ');
    }

    if (localStorage.getItem('cartist') == null) {
        localStorage.setItem('cartist', ' ');
    }
    

    if (localStorage.getItem('cimg') == null) {
        localStorage.setItem('cimg', `https://i.ibb.co/jzp9qcm/trans.png`);
    }


    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false); // hide menu

    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setShow(true);
        },
        [setAnchorPoint]
    );

    const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });

    

    useEffect(() => {
        keepTheme();
    })

    const header = useRef(null);
    const consolewindow = useRef(null);

  const size = useWindowSize();

    if (localStorage.getItem('shuffle') == 'true') {

    } else if (localStorage.getItem('shuffle') == 'false') {

    } else {
        localStorage.setItem('shuffle', 'false')
    }

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const [isMouseDown, setDown] = useState(false);

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        if (isMouseDown == true) {
            consolewindow.current.style.top = (e.pageY - 20) + "px";
            consolewindow.current.style.left = (e.pageX - 20) + "px";
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }



    return (
        <Router>
            <div className={styles.layout}>
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route exact path="/login1">
                <Login />
            </Route>
            <Route exact path="/logout">
                <Logout />
            </Route>
            <Route exact path="/auth&email=:path">
                <HandleAuth />
            </Route>
            <Route exact path="/library">
                <Library />
            </Route>
            <Route exact path="/lyrics">
                <Lyrics />
            </Route>
            <Route exact path="/songs">
                <Songs />
            </Route>
            <Route exact path="/settings">
                <Settings />
            </Route>
            <Route exact path="/connect">
                <Connection />
            </Route>
            <Route exact path="/playlist/:path">
                <PlaylistPage />
            </Route>
            <Route exact path="/songs/id/:path">
                <ID />
            </Route>
            <Route exact path="/card/:path">
                <Card />
            </Route>
            <Route exact path="/embed/:path">
               <Embed />
            </Route>
            <Route exact path="/embed-small/:path">
               <EmbedSmall />
            </Route>
            <Route exact path="/search">
               <Search />
            </Route>
            <Route exact path="/info">
               <Info />
            </Route>
            <Route>
               <NotFound />
            </Route>
                </Switch>
                {show ? (
                    <div
                        className="menu"
                        style={{
                            top: anchorPoint.y,
                            left: anchorPoint.x
                        }}
                    >
                        <div className="blur" />
                        <Link to="/settings">
                            <button className="menuitem"><Icons.Settings />Ustawienia</button>
                        </Link>
                        <Link to="/search">
                            <button className="menuitem"><Icons.Search />Szukaj</button>
                        </Link>
                        <Link to="/info">
                            <button className="menuitem"><Icons.Info />Informacje</button>
                        </Link>
                        <Link to="/profile">
                            <button className="menuitem"><Icons.Profile />Profil</button>
                        </Link>
                        <br />
                        <Link to="/logout">
                            <button className="menuitem"><Icons.LogOut />Wyloguj się</button>
                        </Link>
                        
                    </div>
                ) : ''}
                <Footer fre={footerRef} className={styles.foot}/>
            </div>
            </Router>
  );
}

export default App;
