import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TitleM from '../component/text/title-m';
import Topnav from '../component/topnav/topnav';
import PlaylistCardM from '../component/cards/playlist-card-custom'
import PLAYLIST from "../data/index.json";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./library.module.css";
import { aut } from '../dauth';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { changeTrack } from '../actions';
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
                <Topnav tabButtons={true} />
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
    const [posts, setPosts] = useState(null);
    const [loader, setLoadingState] = useState(true);
    const storage = getStorage(aut);
    if (urlaxios != '') {
        getDownloadURL(ref(storage, 'users/' + localStorage.getItem('email').split('.').join("") + '/test.json'))
            .then((url) => {
                setAUrl(url);
                console.log(urlaxios);
            }).catch(err => {
                setTimeout(function () { setLoadingState(false); }, 500);
            })
    }
    const [datamap, setDMap] = useState(``);
        axios.get(`/lyrics/test.json`).then(res => {
            if (isMounted) {
                if (posts != res.data) {
                    setPosts(res.data);
                    setTimeout(function () { setLoadingState(false); }, 1500);
                }
            }
        })
    const [isthisplay, setIsthisPlay] = useState(false)
    
    return (
        <div>
            {loader == true ?
                <div className={styles.wrapper}>
                    <div className={styles.loader} id={styles.loader} />
                </div>
                : ''
                }
            <TitleM>Twoje playlisty</TitleM>
            <div className={styles.Grid}>
                {
                    posts != null ?
                        posts.map((item) => {
                            console.log(item.playlistData[0].index)
                            isMounted = false
                            return (
                                <PlaylistCardM
                                    key={item.title}
                                    data={item}
                                    playlistData={item.playlistData}
                                />
                            );
                        }) : ''
                }
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
        isPlaying: state.isPlaying
    };
};

export default connect(mapStateToProps, { changeTrack })(Library);