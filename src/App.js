import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics, initializeAnalytics, logEvent } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import useWindowSize from './hooks/useWindowSize';
import Sidebar from './component/sidebar/sidebar';
import MobileNavigation from './component/sidebar/mobile-navigation';
import Footer from './component/footer/footer';
import FooterTop from './component/footer/footertop';
import Home from './pages/home';
import Search from './pages/search';
import Library from './pages/library';
import PlaylistPage from './pages/playlist';
import Embed from './pages/embed';
import Info from './pages/info';
import EmbedSmall from './pages/embed-s';

import CONST from './constants/index';
import { PLAYLIST } from './data/index';
import styles from './style/App.module.css';
import Card from './component/cards/playlist-card-m';
import NotFound from './pages/404';
import LyricsCard from './component/lyrics/lyrics-main';
import { keepTheme } from './theme';
import Connection from './pages/connection';
import Settings from './pages/settings';
import TV from './tv/index';

import './security.js';


function App() {

    useEffect(() => {
        keepTheme();
    })

  const size = useWindowSize();

    if (localStorage.getItem('shuffle') == 'true') {

    } else if (localStorage.getItem('shuffle') == 'false') {

    } else {
        localStorage.setItem('shuffle', 'false')
    }
    

    return (
        <Router>
            <div className={styles.layout}>
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/tv">
                <TV />
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
                <Footer className={styles.foot}/>
            </div>
            </Router>
  );
}

export default App;