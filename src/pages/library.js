import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TitleM from '../component/text/title-m';
import Topnav from '../component/topnav/topnav';
import PlaylistCardM from '../component/cards/playlist-card-custom'
import PLAYLIST from "../data/index.json";
import PlaylistCardMS from '../component/cards/playlist-card-music';
import styles from "./library.module.css";
import { aut } from '../dauth';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { ImportPlaylist, RemoveItem } from '../playlistcreator';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import { useState, useEffect } from "react";
import { RgbStringColorPicker } from "react-colorful";
import axios from 'axios';
import SONGLIST from '../data/songs.json';
import { connect } from 'react-redux';
import { changeTrack, customTrack } from '../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../component/text/text-bold-l";
import TextRegularM from '../component/text/text-regular-m';
import PlayButton from '../component/buttons/play-button';
import FadeIn from 'react-fade-in';
import { CreateEmptyPlaylist } from '../playlistcreator';


function Library(props) {
    const size = useWindowSize();
    return (
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
            <div className={styles.LibPage}>
                <Topnav normal={true} />
                <div className={styles.Library}>
                    <Route exact path="/library"><PlaylistTab /></Route>
                    <Route path="/library/podcasts"><PodcastTab /></Route>
                    <Route path="/library/artists"><ArtistTab /></Route>
                    <Route path="/library/albums"><AlbumTab /></Route>
                </div>
            </div>
        </div>
    );
}


function PlaylistTab(props) {  
    let col = 'rgb(0,0,0)'
    const [color, setColor] = useState('rgb(0,0,0)');
    if (color != 'rgb(0,0,0)') {
        document.documentElement.style.setProperty('--color', color)
    }
    const [index, setIndex] = useState('');
    const [create, setCreate] = useState(false);
    function StartPlaylistCreation() {
        setCreate(true);
    }  
    const [input, setInput] = useState('');
    let isMounted = true;   
    const [urlaxios, setAUrl] = useState('');    
    const [loader, setLoadingState] = useState(true);
    const [datamap, setDMap] = useState(``);
    const [posts, setPosts] = useState(null);
    const db = getDatabase(aut);
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (isMounted) {
                if (posts == null) {
                    isMounted = false;
                    setPosts(JSON.parse(data));
                    setLoadingState(false);
                }
            }
        } else {
            if (loader == true) {
                setLoadingState(false);
            }
        }
    });
    const [isthisplay, setIsthisPlay] = useState(false)   

    function readFileAsString(files) {
        if (files.length === 0) {
            console.log('No file is selected');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (event) {
            ImportPlaylist(event.target.result);
        };
        reader.readAsText(files);
    }
    const [show, setShow] = useState(false);
    var likedSongs = [];
	const nameRef1 = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/dmusic/liked');
    onValue(nameRef1, (snapshot) => {
        const data = snapshot.val();
            if (data != null || data != undefined) {
                likedSongs = JSON.parse(data);			
            }
    });
    return (
        <div>
            {create ? (
                <div className="foverlay">
                    <div className="ff">
                        <input className="inputtrack" autocomplete="off" placeholder="Nazwa playlisty" maxLength="40" value={input} onInput={e => setInput(e.target.value)}></input>
                        <RgbStringColorPicker
                            onChange={setColor}
                    />
                        <button className="lumina_button" onClick={() => { CreateEmptyPlaylist(color, input); { setCreate(false); } }}>
                            Utwórz playlistę
                        </button>
                    </div>
                </div>
            ) : ''}
            {loader == true ?
                <div className={styles.wrapper}>
                    <div className={styles.loader} id={styles.loader} />
                </div>
                : ''
            }
            <input style={{ color: 'transparent' }} type="file" id={styles.upload} accept=".dmusic" onInput={e => readFileAsString(e.target.files[0])} />
            <div className={styles.su}>
            <TitleM>Twoje playlisty</TitleM>
            <button className="lumina_button" onClick={() => { StartPlaylistCreation()}}>Nowa playlista</button>
            <div className={styles.Grid}>
                {
                    posts != null ?
                        posts.map((item) => {
                            isMounted = false
                                return (
                                    <PlaylistCardM
                                        key={item.title}
                                        data={item}
                                        playlistData={item.playlistData}
                                        inx={posts.indexOf(item)}
                                    />
                                );
                            }
                        ) : ''
                }
                </div>
                <TitleM>Ulubione</TitleM>
            <div className={styles.Grid}>
                { likedSongs != null || likedSongs != [] ?
                likedSongs.sort((a, b) => 0.5 - Math.random()).map(item => {
                    if (likedSongs != null && likedSongs != []) {
                    return (
                        <PlaylistCardMS
                                key={SONGLIST[item].songName}
                                data={SONGLIST[item]}
                            />
                    )
                }
            }
                )
                : ''
                }
                </div>
                </div>
        </div>
        )
}

function PodcastTab() {
    return (
        <div>
            <TitleM>Podcast'ler</TitleM>
            <div className={styles.Grid}>
                {PLAYLIST.filter(item => item.type == 'podcast').map((item) => {
                    return (
                        <PlaylistCardM
                            key={item.title}
                            data={item}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function ArtistTab() {
    return (
        <div>
            <TitleM>Sanatçılar</TitleM>
        </div>
    );
}

function AlbumTab() {
    return (
        <div>
            <TitleM>Albümler</TitleM>
            <div className={styles.Grid}>
                {PLAYLIST.filter(item => item.type == 'album').map((item) => {
                    return (
                        <PlaylistCardM
                            key={item.title}
                            data={item}
                        />
                    );
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        trackData: state.trackData,
        isPlaying: state.isPlaying,
        custplay: state.custplay
    };
};

export default connect(mapStateToProps, { changeTrack })(Library);