import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { BrowserRouter as Router,
  Switch,
    Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { firebaseg } from './actions/index';
import Lyrics from './component/Lyrics';
import QueueShow  from './pages/queue';
import { initializeApp } from "firebase/app";
import { getAnalytics, initializeAnalytics, logEvent } from "firebase/analytics";
import { getDatabase, ref, onValue, set } from "firebase/database";
import useWindowSize from './hooks/useWindowSize';
import Sidebar from './component/sidebar/sidebar';
import MobileNavigation from './component/sidebar/mobile-navigation';
import Footer from './component/footer/footer';
import FooterTop from './component/footer/footertop';
import Home from './pages/home';
import Sylwester2021 from './pages/event_sylwester202122';
import Search from './pages/search';
import Library from './pages/library';
import Artist from './pages/artist';
import PlaylistPage from './pages/playlist';
import PlaylistPageC from './pages/playlistc';
import SongPage from './pages/songlist';
import Embed from './pages/embed';
import Info from './pages/info';
import EmbedSmall from './pages/embed-s';
import * as Icons from './component/icons/index';
import CONST from './constants/index';
import PLAYLIST from './data/index.json';
import styles from './style/App.module.css';
import Card from './component/cards/playlist-card-m';
import NotFound from './pages/404';
import Rewind from './pages/rewind';
import LyricsCard from './component/lyrics/lyrics-main';
import { keepTheme } from './theme';
import Connection from './pages/connection';
import Settings from './pages/settings';
import Profile from './pages/profile';
import Logout from './pages/logout';
import { aut } from './dauth';
import Login from './login';
import './security.js';
import './menu.css'
import HandleAuth from './authorization.js';
let indexn = null;


function App(props) {

    const footerRef = useRef(null);
    const db = getDatabase(aut);

    
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

    const [tourStep, setTourStep] = useState(0);

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    return (
        <Router>
            <div className={styles.layout}>               
                {
                    localStorage.getItem('promowindowsdm') == 'susamogus' ? 
                    <div className={styles.windowspromote}>
                        <div id={styles.promo1step}>
                            <h1>Hej, hej, hej</h1>
                            <h2>Korzystasz z systemu Windows 10 lub Windows 11?</h2>
                            <div id={styles.selectbtns}><button className={styles.btnyes} onClick={() => {document.documentElement.style.setProperty('--promo', '-100vw')}}>Tak</button><button className={styles.btnno} onClick={() => {document.documentElement.style.setProperty('--promo', '-300vw'); { localStorage.setItem('promowindowsdm', 'showed') }}}>Nie</button></div>
                        </div>
                        <div id={styles.promo2step}>
                            <h1>Świetnie!</h1>
                            <h2>Możesz więc zainstalować nową aplikację Duck Music!</h2>
                            <h3>Zalety to:</h3>
                            <h4>Szybsze ładowanie</h4>
                            <h4>Automatyczne aktualizacje</h4>
                            <h4>Natywność</h4>
                            <h2>Chcesz ją zainstalować?</h2>
                            <div id={styles.selectbtns}><button className={styles.btnyes} onClick={() => {document.documentElement.style.setProperty('--promo', '300vw'); { localStorage.setItem('promowindowsdm', 'showed') }}}>Tak</button><button className={styles.btnno} onClick={() => {document.documentElement.style.setProperty('--promo', '-200vw')}}>Nie</button></div>
                        </div>
                        <div id={styles.promo2step}>
                            <h1>OK</h1>
                            <h2>Szanujemy Twoją decyzję</h2>
                            <h3>Jeżeli zmienisz zdanie kliknij 'Zainstaluj nową wersję' w Ustawieniach Duck Music</h3>
                            <div id={styles.selectbtns}><button className={styles.btnyes} onClick={() => {document.documentElement.style.setProperty('--promo', '-100vw')}}>Wróć</button><button className={styles.btnno} onClick={() => {document.documentElement.style.setProperty('--promo', '-300vw'); { localStorage.setItem('promowindowsdm', 'showed') }}}>OK</button></div>
                        </div>
                    </div>
                    : ''
                }
                { localStorage.getItem("emaildm") != null && localStorage.getItem("dmtour") == "mogus" ?
                <div className={styles.tour}>
                    <h1>{"Cześć " + localStorage.getItem("name") + ", witaj na Duck Music!"}</h1>
                    <h3>Czy chcesz nauczyć się jak korzystać z Duck Music?</h3>
                    <div id={styles.selectbtns}><button className={styles.btnyes} onClick={() => {localStorage.setItem('dmtour', 'showed');{ setTourStep(1) }}}>Tak</button><button className={styles.btnno} onClick={() => { localStorage.setItem('dmtour', 'showed'); { window.location.reload(true) }}}>Nie, dziękuję</button></div>
                </div>
                : ''
                }

                { tourStep == 1 ?
                <div className={styles.tour}>
                <h1>{"Świetnie!"}</h1>
                <h3>Czy chcesz nauczyć się jak korzystać z Duck Music?</h3>
                <div id={styles.selectbtns}><button className={styles.btnno} onClick={() => { localStorage.setItem('dmtour', 'showed'); { window.location.reload(true) }}}>Zamknij</button></div>
            </div>
            : ''
                }
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/duckmusic::path">
                <SongPage />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route exact path="/login1">
                <Login />
            </Route>
            <Route exact path="/rewind/:token/:path">
                <Rewind />
            </Route>
            <Route exact path="/logout">
                <Logout />
            </Route>
            <Route exact path="/myplaylist/:path">
                <PlaylistPageC />
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
            <Route exact path="/artist/:path">
                <Artist />
            </Route>
            <Route exact path="/settings">
                <Settings />
            </Route>
            <Route exact path="/connect">
                <Connection />
            </Route>
            <Route exact path="/profile/user/currentuser/playlistdata/visual/queue">
                <QueueShow />
            </Route>
            <Route exact path="/playlist/:path">
                <PlaylistPage />
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
            <Route exact path="/liveevent/sylwester202122">
               <Sylwester2021 />
            </Route>
            <Route exact path="/info">
               <Info />
            </Route>
            <Route>
               <NotFound />
            </Route>
                </Switch>
                {show ?
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
                 : ''}
                <Footer fre={footerRef} className={styles.foot}/>
                <div className='keyguide'>
                    <div className='keys'>
                        <div className='key'><h3>Otwórz / zamknij to menu</h3><div className='kes'><span>ctrl</span><span>q</span></div></div>
                        <div className='key'><h3>Odtwarzaj / zatrzymaj utwór</h3><div className='kes'><span>ctrl</span><span>spacja</span></div></div>
                        <div className='key'><h3>Następny utwór</h3><div className='kes'><span>ctrl</span><span>m</span></div></div>
                        <div className='key'><h3>Poprzedni utwór</h3><div className='kes'><span>ctrl</span><span>b</span></div></div>
                    </div>
                </div>
            </div>
            </Router>
  );
}


const mapStateToProps = (state) => {
    return {
        trackData: state.trackData,
        custplay: state.custplay
    };
};



export default connect(mapStateToProps, { firebaseg })(App);
