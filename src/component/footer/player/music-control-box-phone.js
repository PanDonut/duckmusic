import { connect } from 'react-redux';
import { changeTrack } from '../../../actions';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-button';
import React, { useEffect, useState } from 'react';
import { PLAYLIST } from "../../../data/index";
import styles from "./music-control-box-phone.module.css";

function MusicControlBox(props) {

    const [looping, setLooping] = React.useState(localStorage.getItem('loop'));

    const [shuffling, setShuffling] = React.useState(localStorage.getItem('shuffle'));

    function decreaseIndex(){
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
    function increaseIndex(){
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

    return (
        <div className={styles.musicControl}>
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
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      trackData: state.trackData
    };
};
  
export default connect(mapStateToProps, { changeTrack })(MusicControlBox);
