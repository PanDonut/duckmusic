import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import TextBoldL from "../text/text-bold-l";
import TextRegularM from "../text/text-regular-m";
import Playgif from '../../image/now-play.gif';
import * as Icons from '../icons';

import styles from "./playlist-track.module.css";

function PlaylistTrack(props) {
    const [thisSong, setthisSong] = useState(false);

    /*setInterval(function(){
        setthisSong(props.data.song.link == localStorage.getItem('playedSong'));
    }, 50);*/
    
    useEffect(() => {
        if(props.data.song.link === props.trackData.track && props.isPlaying === true){
            setthisSong(true)
        }else {
            setthisSong(false)
        }
	})
    
	return (
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
                    ? <svg id={styles.eI4wjv0hVNk} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g id={styles.eI4wjv0hVNk2_ts} transform="translate(4.99902,14) scale(1,1)"><path id={styles.eI4wjv0hVNk2} d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0" transform="translate(-4.99902,-7)" fill="rgb(29,185,84)" stroke="none" stroke-width="1" /></g><g id={styles.eI4wjv0hVNk3_ts} transform="translate(9.116667,14) scale(1,0.16)"><path id={styles.eI4wjv0hVNk3} d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0" transform="translate(-4.99902,-7)" fill="rgb(29,185,84)" stroke="none" stroke-width="1" /></g><g id={styles.eI4wjv0hVNk4_ts} transform="translate(12,14) scale(1,2)"><path id={styles.eI4wjv0hVNk4} d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0" transform="translate(-4.9990yyy,-7)" fill="rgb(29,185,84)" stroke="none" stroke-width="1" /></g><g id={styles.eI4wjv0hVNk5_ts} transform="translate(1,14) scale(1,0.56)"><path id={styles.eI4wjv0hVNk5} d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0" transform="translate(-4,-7)" fill="rgb(29,185,84)" stroke="none" stroke-width="1" /></g></svg>
                    : <p className={styles.SongIndex}>{props.data.song.index}</p>
            }

			{props.data.listType === "album1" ? "" : <img src={props.data.song.songimg} />}

			<span>
				<TextBoldL>{props.data.song.songName}</TextBoldL>
				<TextRegularM>{props.data.song.songArtist}</TextRegularM>
			</span>

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