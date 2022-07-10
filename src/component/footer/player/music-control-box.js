import { connect } from 'react-redux';
import { changeTrack, customTrack } from '../../../actions';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-buttonz';

import React, { useEffect, useState } from 'react';

import PLAYLIST from "../../../data/index.json";
import styles from "./music-control-box.module.css";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { aut } from '../../../dauth';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { decode } from 'he';
import { GetUID } from '../../../pages/functions';

function MusicControlBox(props, {audior}) {
    let isMounted = true;
    const [PLAYLISTC, setPosts] = useState(null);
    const db = getDatabase(aut);
    if (localStorage.getItem('emailduckmusic') != null) {
    const nameRef = ref(db, 'users/' + GetUID() + '/duckmusic/playlist');
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
}

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

    const looptoast = () => toast.success(decode("Odtwarzanie w p&#281;tli"), {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const loopftoast = () => toast.success(decode("Zatrzymano odtwarzanie w p&#281;tli"), {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const shuffletoast = () => toast.success(decode("Odtwarzanie losowe"), {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const shuffleftoast = () => toast.success(decode("Odtwarzanie po kolei"), {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    return (
        <div className={styles.musicControl}>          
            <button className={styles.button} onClick={decreaseIndex}>
                <Icons.Prev />
            </button>
            <PlayButton isthisplay={true}/>
            <button className={styles.button} onClick={increaseIndex}>
                <Icons.Next />
            </button>           
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      trackData: state.trackData
    };
};
  
export default connect(mapStateToProps, { changeTrack, customTrack })(MusicControlBox);
