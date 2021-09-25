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


import SearchButton from '../component/buttons/search-button';

function Search() {

    class MyComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                inputValue: ''
            };
        }
        updateInputValue(evt) {
            this.setState({
                inputValue: evt.target.value
            });
        }
    }


    const size = useWindowSize();


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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

    var substring = document.getElementsByClassName('{styles.SeachInpt}').inputValue;
    var area = document.getElementsByClassName('{styles.SeachInpt}');
 
    return (
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
                <meta charset="UTF-8" />
            <div className={styles.SearchPage}>
                <Topnav />
                

            <div className={styles.Search}>
                    <div className={styles.SeachBox}>
                            <input className={styles.SeachInpt} placeholder="Wyszukaj tytu³ piosenki, autora lub playlistê" maxLength="80" ></input>
                        <button className={styles.Btnn}>
                            <SearchButton />
                        </button>
                        </div>
                        
                <div className={styles.SearchCardGrid}>
                    {PLAYLIST.filter(item => item.title == area.input).map((item) => {
                        var title = item.title;
                        return (
                            <PlaylistCardS
                                key={item.title}
                                data={item}
                            />
                        );
                    })}
                </div>
            </div>
                    
        </div>
        </div>
    );
}

export default Search;