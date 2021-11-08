import Topnav from '../component/topnav/topnav';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import { PLAYLIST } from '../data/index';

import styles from "./search.module.css";
import * as Icons from '../component/icons';
import Sidebar from '../component/sidebar/sidebar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';

import {decode} from 'he';


import FadeIn from 'react-fade-in';

import SearchButton from '../component/buttons/search-button';


function Search(){



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

    console.log(input);

 
    return (
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
            <div className={styles.SearchPage}>
                <Topnav />
                

                    <div className={styles.SeachBox}>
                    <input className={styles.SeachInpt} id="txts" placeholder={decode("Wyszukaj tytu&#322;. Jest wra&#380;liwy na WIELKO&#346;&#262; LITER")} maxLength="80" value={input} onInput={e => setInput(e.target.value)}></input>
                        </div>
                        
                <FadeIn visible="true" delay="50" className={styles.SearchCardGrid}>
                    {PLAYLIST.filter(item => item.title.includes(input)).map((list) => {
                        var title = list.title;
                        return (
                            <PlaylistCardS
                                key={list.title}
                                data={list}
                            />
                        );
                    })}
                </FadeIn>
                    
        </div>
        </div>
    );
}

export default Search;