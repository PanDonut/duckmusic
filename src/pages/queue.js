import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import Sidebar from '../component/sidebar/sidebar';
import { useHistory } from 'react-router-dom';
import Topnav from '../component/topnav/topnav';
import './queue-visuals.css';
import { connect } from 'react-redux';
import PLAYLIST from '../data/index.json'
import PlaylistTrack from '../component/playlist/playlist-track';
import SONGLIST from '../data/songs.json'
import { useState } from 'react';
import {getDatabase, get, set, ref, onValue} from 'firebase/database'
import { aut } from '../dauth.js'
import { GetUID } from './functions';
function QueueShow(props) {
    const size = useWindowSize();
    const history = useHistory();
    let isMounted = true;
    const [urlaxios, setAUrl] = useState('');    
    const [loader, setLoadingState] = useState(true);
    const [datamap, setDMap] = useState(``);
    const [posts, setPosts] = useState(null);
    const db = getDatabase(aut);
    const nameRef = ref(db, 'users/' + GetUID() + '/duckmusic/playlist');
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
    return (
        <>
            <div className='cont'>
            <Topnav normal={true}/>
            { 
            posts[0].map(item => {
                <PlaylistTrack
                data={{
                    sin: posts[props.trackData.trackKey[0]].indexOf(item),
                    song: SONGLIST[item.songindex]
                }}
            />
            }
            )
            }
            </div>
            </>
    )
}

const mapStateToProps = (state) => {
    return {
        trackData: state.trackData,
        isPlaying: state.isPlaying
    };
};

export default connect(mapStateToProps)(QueueShow);