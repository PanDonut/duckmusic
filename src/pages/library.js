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
import axios from 'axios';
import SONGLIST from '../data/songs.json';
import { connect } from 'react-redux';
import { changeTrack, customTrack } from '../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../component/text/text-bold-l";
import TextRegularM from '../component/text/text-regular-m';
import PlayButton from '../component/buttons/play-button';
import FadeIn from 'react-fade-in';


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
    var likedSongs = [];
	const nameRef1 = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/liked');
    onValue(nameRef1, (snapshot) => {
        const data = snapshot.val();
            if (data != null || data != undefined) {
                likedSongs = JSON.parse(data);			
            }
    });
    return (
        <div>
            {loader == true ?
                <div className={styles.wrapper}>
                    <div className={styles.loader} id={styles.loader} />
                </div>
                : ''
            }
            <input style={{ color: 'transparent' }} type="file" id={styles.upload} accept=".json" onInput={e => readFileAsString(e.target.files[0])} />
            <div className={styles.su}>
            <TitleM>Twoje playlisty</TitleM>
            <div className={styles.Grid}>
                {
                    posts != null ?
                        posts.map((item) => {
                            isMounted = false
                            if (item.playlistData[0] == undefined) {
                                RemoveItem(posts.indexOf(item))
                            } else {
                                return (
                                    <PlaylistCardM
                                        key={item.title}
                                        data={item}
                                        playlistData={item.playlistData}
                                    />
                                );
                            }
                        }) : ''
                }
                </div>
                <TitleM>Ulubione</TitleM>
            <div className={styles.Grid}>
                { likedSongs != null || likedSongs != [] ?
                likedSongs.map(item => {
                    return (
                        <PlaylistCardMS
                                key={SONGLIST[item].songName}
                                data={SONGLIST[item]}
                            />
                    )
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