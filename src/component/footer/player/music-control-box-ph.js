import { connect } from 'react-redux';
import { changeTrack } from '../../../actions';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-button';
import { useState } from 'react';
import { aut } from '../../../dauth';
import { getDatabase, ref, onValue, set } from "firebase/database";
import PLAYLIST from "../../../data/index.json";
import styles from "./music-control-box-ph.module.css";

function MusicControlBox(props, { audioRef }) {
    let isMounted = true;
    const [PLAYLISTC, setPosts] = useState(null);
    const db = getDatabase(aut);
    const nameRef = ref(db, 'users/' + localStorage.getItem('email').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (isMounted) {
                if (PLAYLISTC == null) {
                    isMounted = false;
                    setPosts(JSON.parse(data));
                }
            }
        }
    });

    function decreaseIndex() {
        if (props.trackData.canSkip == 'true') {
            if (props.trackData.isCustom == 'false') {
                if (localStorage.getItem('shuffle') == 'false') {
                    if (props.trackData.trackKey[1] === (PLAYLIST[props.trackData.trackKey[0]].playlistData.length)) {
                        props.changeTrack([props.trackData.trackKey[0], 0])
                    } else {
                        props.changeTrack([props.trackData.trackKey[0], parseInt(props.trackData.trackKey[1]) - 1])
                    }
                } else if (localStorage.getItem('shuffle') == 'true') {
                    if (props.trackData.trackKey[1] === (PLAYLIST[props.trackData.trackKey[0]].playlistData.length)) {
                        props.changeTrack([props.trackData.trackKey[0], 0])
                    } else {
                        props.changeTrack([props.trackData.trackKey[0], parseInt(props.trackData.trackKey[1]) - 1])
                    }
                } else {
                    localStorage.setItem('shuffle', 'false')
                }
            } else if (props.trackData.isCustom == 'true') {
                if (localStorage.getItem('shuffle') == 'false') {
                    if (props.trackData.trackKey[1] === (PLAYLISTC[props.trackData.trackKey[0]].playlistData.length)) {
                        props.customTrack([props.trackData.trackKey[0], 0])
                    } else {
                        props.customTrack([props.trackData.trackKey[0], parseInt(props.trackData.trackKey[1]) - 1])
                    }
                } else if (localStorage.getItem('shuffle') == 'true') {
                    if (props.trackData.trackKey[1] === (PLAYLISTC[props.trackData.trackKey[0]].playlistData.length)) {
                        props.customTrack([props.trackData.trackKey[0], 0])
                    } else {
                        props.customTrack([props.trackData.trackKey[0], parseInt(props.trackData.trackKey[1]) - 1])
                    }
                } else {
                    localStorage.setItem('shuffle', 'false')
                }
            }
        }
    }
    function increaseIndex() {
        if (props.trackData.canSkip == 'true') {
            if (props.trackData.isCustom == 'false') {
                if (localStorage.getItem('shuffle') == 'false') {
                    if (props.trackData.trackKey[1] === (PLAYLIST[props.trackData.trackKey[0]].playlistData.length)) {
                        props.changeTrack([props.trackData.trackKey[0], 0])
                    } else {
                        props.changeTrack([props.trackData.trackKey[0], parseInt(props.trackData.trackKey[1]) + 1])
                    }
                } else if (localStorage.getItem('shuffle') == 'true') {
                    if (props.trackData.trackKey[1] === (PLAYLIST[props.trackData.trackKey[0]].playlistData.length)) {
                        props.changeTrack([props.trackData.trackKey[0], 0])
                    } else {
                        props.changeTrack([props.trackData.trackKey[0], Math.floor((Math.random() * parseInt(PLAYLIST[props.trackData.trackKey[0]].playlistData.length)) + 0)])
                    }
                } else {
                    localStorage.setItem('shuffle', 'false')
                }
            } else if (props.trackData.isCustom == 'true') {
                if (localStorage.getItem('shuffle') == 'false') {
                    if (props.trackData.trackKey[1] === (PLAYLISTC[props.trackData.trackKey[0]].playlistData.length)) {
                        props.customTrack([props.trackData.trackKey[0], 0])
                    } else {
                        props.customTrack([props.trackData.trackKey[0], (parseInt(props.trackData.trackKey[1]) + 1)])
                    }
                } else if (localStorage.getItem('shuffle') == 'true') {
                    if (props.trackData.trackKey[1] === (PLAYLISTC[props.trackData.trackKey[0]].playlistData.length)) {
                        props.customTrack([props.trackData.trackKey[0], 0])
                    } else {
                        props.customTrack([props.trackData.trackKey[0], Math.floor(Math.random() * parseInt(PLAYLISTC[props.trackData.trackKey[0]].playlistData.length)) + 0])
                    }
                } else {
                    localStorage.setItem('shuffle', 'false')
                }
            }
        }
    }

    return (
        <div className={styles.musicControl}>
            <PlayButton isthisplay={true}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      trackData: state.trackData
    };
};
  
export default connect(mapStateToProps, { changeTrack })(MusicControlBox);
