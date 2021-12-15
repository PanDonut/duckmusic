import Topnav from '../component/topnav/topnav';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-m';
import PlaylistCardM from '../component/cards/playlist-card-music';
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
import React, { useState, useEffect } from 'react';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {decode} from 'he';
import { aut } from '../dauth.js';

import FadeIn from 'react-fade-in';

import SearchButton from '../component/buttons/search-button';


function Search() {


	const db = getDatabase(aut);

	const pl = [
		{
			"index": "24876e",
			"type": "playlista",
			"title": "Duck Mix",
			"link": "1",
			"suggestion": "true",
			"promoted": "nieprawda",
			"promodesc": "Posłuchaj teraz!",
			"ex": "no",
			"imgUrl": "https://i.ibb.co/gTcL5Hx/thenight.png",
			"hoverColor": "rgb(161, 0, 0)",
			"artist": "Carly Rae Jepsen, Taylor Swift, Vance Joy, Dawid Podsiadło, Toto, Bruno Mars, Ed Helms, Camila Cabello, Shawn Mendes, Rick Astley, Pitbull, Rachel Platten, OneRepublic, Fools Garden i inni",
			"playlistBg": "rgb(161, 0, 0)",
			"playlistData": [
				{
					"index": "1",
					"songindex": 10

				}
			]
		}
	];

        set(ref(db, 'users/' + localStorage.getItem('email').split('.').join("") + "/duckmusic"), {
            playlist: JSON.stringify(pl)
        });


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



    const handleScroll = (e) => {
        if (Math.round(e.target.scrollTop) > 110) {
            document.documentElement.style.setProperty('--topsearch', '0');
            document.documentElement.style.setProperty('--transearch', 'translateX(15%)');
        } else {
            document.documentElement.style.setProperty('--topsearch', '100px');
            document.documentElement.style.setProperty('--transearch', 'translateX(0%)');
        }
    }
 
    return (
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
            <div className={styles.SearchPage} onScroll={handleScroll}>
                <Topnav normal={true}/>
                
                    <div className={styles.SeachBox}>
                    <input className={styles.SeachInpt} autocomplete="off" id="txts" placeholder="Wyszukaj tytuł lub wykonawcę" maxLength="80" value={input} onInput={e => setInput(e.target.value)}></input>
                </div>
                <div className={styles.new} onScroll={handleScroll}>
                <h1>Playlisty</h1>
                <FadeIn visible="true" delay="50" className={styles.SearchCardGrid}>
                    {PLAYLIST.filter(item => item.title.toLowerCase().includes(input.toLowerCase()) || item.artist.toLowerCase().includes(input.toLowerCase())).map((list) => {
                        var title = list.title;
                        return (
                            <PlaylistCardS
                                key={list.title}
                                data={list}
                            />
                        );
                    })}
                </FadeIn>
                <h1>Utwory</h1>
                <FadeIn visible="true" delay="50" className={styles.SearchCardGrid}>
                    {SONGLIST.filter(item => item.songName.toLowerCase().includes(input.toLowerCase()) || item.songArtist.toLowerCase().includes(input.toLowerCase())).map((list) => {
                        return (
                            <PlaylistCardM
                                key={list.title}
                                data={list}
                            />
                        );
                    })}
                </FadeIn>
                    </div>
        </div>
        </div>
    );
}

export default Search;
