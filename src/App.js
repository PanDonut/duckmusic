import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
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
import EmbedSmall from './pages/embed-s';

import CONST from './constants/index';
import { PLAYLIST } from './data/index';
import styles from './style/App.module.css';
import Card from './component/cards/playlist-card-m';
import NotFound from './pages/404';

function App() {
  const size = useWindowSize();

    return (
        <Router>
        <div className={styles.layout}>
          <Switch>
            <Route exact path="/">
                <Home />
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