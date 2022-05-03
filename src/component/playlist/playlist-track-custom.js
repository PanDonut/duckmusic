import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import TextBoldL from "../text/text-bold-l";
import TextRegularM from "../text/text-regular-m";
import Playgif from '../../image/now-play.gif';
import * as Icons from '../icons';
import '../../menup.css';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { aut } from '../../dauth.js';
import SONGS from '../../data/songs.json';
import styles from "./playlist-track.module.css";
import { RgbStringColorPicker } from "react-colorful";
import { RemoveSong } from '../../playlistcreator'

function PlaylistTrack(props) {
    const [thisSong, setthisSong] = useState(false);
    const [create, setCreate] = useState(false);
    const [index, setIndex] = useState('');
    function StartPlaylistCreation(index1) {
        setIndex(index1);
        setCreate(true);
    }
    const [input, setInput] = useState('');
    /*setInterval(function(){
        setthisSong(props.data.song.link == localStorage.getItem('playedSong'));
    }, 50);*/
    const [dots, setdots] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.data.song.link === props.trackData.track && props.isPlaying === true) {
            setthisSong(true)
        } else {
            setthisSong(false)
        }
    })

    console.log(props.data.ind);

    const [PLAYLIST, setPLAYLIST] = useState(null);
    const db = getDatabase(aut);
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (PLAYLIST == null) {
                setPLAYLIST(JSON.parse(data));
            }
        }
    });

   

    let col = 'rgb(0,0,0)'
    const [color, setColor] = useState('rgb(0,0,0)');
    if (color != 'rgb(0,0,0)') {
        document.documentElement.style.setProperty('--color', color)
    }
    return (
        <div>
		<div 
            className={`${styles.trackDiv} ${thisSong ? "activeTrack" : ""}`}
            style={
                props.data.listType === "album1" 
                    ? {gridTemplateColumns: '16px 1fr 38px'} 
                    : {}
            }
        >   
            <button
                className={styles.playBtn}
                onClick={() => props.changePlay(!props.isPlaying)}
            >
                {thisSong 
                    ? <Icons.Pause /> 
                    : <Icons.Play />
                }
            </button>

            {thisSong 
                    ? <svg id={styles.eI4wjv0hVNk} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="16px" height="16px" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g id={styles.eI4wjv0hVNk2_ts} transform="translate(4.99902,14) scale(1,1)"><path id={styles.eI4wjv0hVNk2} d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0" transform="translate(-4.99902,-7)" fill="#5b88e1" stroke="none" stroke-width="1" /></g><g id={styles.eI4wjv0hVNk3_ts} transform="translate(9.116667,14) scale(1,0.16)"><path id={styles.eI4wjv0hVNk3} d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0" transform="translate(-4.99902,-7)" fill="#5b88e1" stroke="none" stroke-width="1" /></g><g id={styles.eI4wjv0hVNk4_ts} transform="translate(12,14) scale(1,2)"><path id={styles.eI4wjv0hVNk4} d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0" transform="translate(-4.9990,-7)" fill="#5b88e1" stroke="none" stroke-width="1" /></g><g id={styles.eI4wjv0hVNk5_ts} transform="translate(1,14) scale(1,0.56)"><path id={styles.eI4wjv0hVNk5} d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0" transform="translate(-4,-7)" fill="#5b88e1" stroke="none" stroke-width="1" /></g></svg>
                    : <p className={styles.SongIndex}>{props.data.sin}</p>
            }

			{props.data.listType === "album1" ? "" : <img src={props.data.song.songimg} />}

			<span>
				<TextBoldL>{props.data.song.songName}</TextBoldL>
				<TextRegularM>{props.data.song.songArtist}</TextRegularM>
			</span>
                <button className={styles.dots} onClick={() => { RemoveSong(props.data.pla, props.data.inde) } }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" stroke="#fff" class="bi bi-three-dots-vertical" viewBox="0 0 24 24">
                        <title id="binIconTitle">Usuń z playlisty</title> <path d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10" />
                </svg>
            </button>
            </div>
           </div>
	);
}


const mapStateToProps = (state) => {
	return {
		isPlaying: state.isPlaying,
        trackData: state.trackData
	};
};
  
export default connect(mapStateToProps, { changePlay })(PlaylistTrack);
