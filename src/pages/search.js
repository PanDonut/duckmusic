﻿import Topnav from '../component/topnav/topnav';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-m';
import PlaylistCardSe from '../component/cards/playlist-card-m-search';
import PlaylistCardM from '../component/cards/playlist-card-music';
import PlaylistCardMe from '../component/cards/playlist-card-music-s';
import PLAYLIST from '../data/index.json';
import SONGLIST from '../data/songs.json';
import styles from "./search.module.css";
import * as Icons from '../component/icons';
import Sidebar from '../component/sidebar/sidebar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import React, { useState, useEffect, useReducer } from 'react';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {decode} from 'he';
import { aut } from '../dauth.js';

import div from 'react-fade-in';

import SearchButton from '../component/buttons/search-button';


function Search() {



    const size = useWindowSize();
    const [input, setInput] = useState(''); // '' is the initial state value

    const [val, setVal] = useState("");

            const [q, setQ] = useState("");
            //     set search parameters
            //     we only what to search countries by capital and name
            //     this list can be longer if you want
            //     you can search countries even by their population
            // just add it to this array
            const [searchParam] = useState(["title"]);

            useEffect(() => {
                // our fetch codes
            }, []);



            const [scrolled, setScrolled] = useState(false);
    const handleScroll = (e) => {
        if (Math.round(e.target.scrollTop) > 50) {
            document.documentElement.style.setProperty('--topsearch', '0');
            document.documentElement.style.setProperty('--transearch', 'translateX(100px)');
        } else {
            document.documentElement.style.setProperty('--topsearch', '100px');
            document.documentElement.style.setProperty('--transearch', 'translateX(0px)');
        }
        e.target.scrollTop > 50 ?
        setScrolled(true)
        :
        setScrolled(false)
        console.log(scrolled)
    }

    if (localStorage.getItem("duckmusic.search_history") == null) {
        localStorage.setItem("duckmusic.search_history", JSON.stringify([]))
    }

    const [, forceUpdate] = useReducer(x => x + 1, 0);
 
    return (
        <> 
            <div className={styles.SearchPage} onScroll={handleScroll}>
                <div className='SearchBox'>
                    <input spellCheck={false} type="text" className='SearchInput' />
                </div>
            </div>
        </>
    );
}

export default Search;
