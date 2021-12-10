import { connect } from 'react-redux';
import { changeTrack } from '../../../actions';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-button';
import React, { useEffect, useState } from 'react';
import PLAYLIST from "../../../data/index";
import styles from "./music-control-box-phone.module.css";
import Connection from '../../../pages/connection';


function MusicControlBox(props, {audioRef}) {

    console.log("re-render");

    const [looping, setLooping] = React.useState(localStorage.getItem('loop'));

    const [shuffling, setShuffling] = React.useState(localStorage.getItem('shuffle'));

     function decreaseIndex() {
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
    }
    function increaseIndex() {
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
    }

    const [conn, setConn] = useState(false);

    return (
        <div>
            {conn ?
                <Connection /> : ''
            }
        <div className={styles.musicControl}>           
                <button className={styles.pipac} onClick={() => { localStorage.setItem('firecon', false); { setConn(false) } }}>
                    <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    </svg>

                </button>
            {looping === 'false' ?
                <button className={styles.button} onClick={() => { setLooping("true"); { localStorage.setItem('loop', 'true'); } }}>
                    <Icons.Loop />
                </button> :
                <button className={styles.buttonactive} onClick={() => { setLooping("false"); { localStorage.setItem('loop', 'false'); } }}>
                    <Icons.Loop />
                </button>
            }
            <button className={styles.button} onClick={decreaseIndex}>
                <Icons.Prev />
            </button>
            <PlayButton isthisplay={true}/>
            <button className={styles.button} onClick={increaseIndex}>
                <Icons.Next />
            </button>
            {shuffling === 'false' ?
                <button className={styles.button} onClick={() => { setShuffling("true"); { localStorage.setItem('shuffle', 'true'); } }}>
                    <Icons.Mix />
                </button> :
                <button className={styles.buttonactive} onClick={() => { setShuffling("false"); { localStorage.setItem('shuffle', 'false'); } }}>
                    <Icons.Mix />
                </button>
            }
            {conn ?
                <button className={styles.pipac} onClick={() => { localStorage.setItem('firecon', false); { setConn(false) } }}>
                    <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V13C18 14.1046 17.1046 15 16 15H4C2.89543 15 2 14.1046 2 13V6ZM4 5C3.44772 5 3 5.44772 3 6V13C3 13.5523 3.44772 14 4 14H16C16.5523 14 17 13.5523 17 13V6C17 5.44772 16.5523 5 16 5H4Z" />
                        <path d="M5 16.5C5 16.2239 5.22386 16 5.5 16H14.5C14.7761 16 15 16.2239 15 16.5C15 16.7761 14.7761 17 14.5 17H5.5C5.22386 17 5 16.7761 5 16.5Z" />
                    </svg>

                </button> :
                <button className={styles.pip} onClick={() => { localStorage.setItem('firecon', true); { setConn(true) } }}>
                    <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V13C18 14.1046 17.1046 15 16 15H4C2.89543 15 2 14.1046 2 13V6ZM4 5C3.44772 5 3 5.44772 3 6V13C3 13.5523 3.44772 14 4 14H16C16.5523 14 17 13.5523 17 13V6C17 5.44772 16.5523 5 16 5H4Z" />
                        <path d="M5 16.5C5 16.2239 5.22386 16 5.5 16H14.5C14.7761 16 15 16.2239 15 16.5C15 16.7761 14.7761 17 14.5 17H5.5C5.22386 17 5 16.7761 5 16.5Z" />
                    </svg>

                </button>
            }
        </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      trackData: state.trackData
    };
};
  
export default connect(mapStateToProps, { changeTrack })(MusicControlBox);
