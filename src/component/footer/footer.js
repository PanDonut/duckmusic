import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeTrack, changePlay } from '../../actions';
import useWindowSize from '../../hooks/useWindowSize';
import FooterLeft from './footer-left';
import MusicControlBox from './player/music-control-box';
import MusicControlBoxs from './player/music-control-box-small';
import MusicProgressBar from './player/music-progress-bar';
import FooterRight from './footer-right';
import Audio from './audio';
import * as Icons from '../icons';
import { LYRICSNEW } from "../../data/lyrics";
import database from 'firebase/database';
import firebase from '../../firebase.js'
import { getDatabase, ref, set } from "firebase/database";

import { PLAYLIST } from "../../data/index";
import CONST from '../../constants/index';
import styles from "./footer.module.css";
import '../lyrics/lyrics.modular.css';

import TextTransition, { presets } from "react-text-transition";

import convertTime from '../../functions/convertTime';

const code = "420";

function Footer(props) {

    function Expand() {
        document.documentElement.style.setProperty('--expanded', 'translateX(0px)');
        document.documentElement.style.setProperty('--disp2', 'none');
        document.documentElement.style.setProperty('--disp3', 'block');
    };

    function Hide() {
        document.documentElement.style.setProperty('--expanded', 'translateX(340px)');
        document.documentElement.style.setProperty('--disp2', 'block');
        document.documentElement.style.setProperty('--disp3', 'none');
    };

    function Expand1() {
        document.documentElement.style.setProperty('--footersize', '100%');
        document.documentElement.style.setProperty('--botf', '0px');
        document.documentElement.style.setProperty('--dispbg', '1');
        document.documentElement.style.setProperty('--expanded', 'translateX(0px)');
    };

    function Hide1() {
        document.documentElement.style.setProperty('--footersize', '150px');
        document.documentElement.style.setProperty('--botf', '60px');
        document.documentElement.style.setProperty('--dispbg', '0');
        document.documentElement.style.setProperty('--expanded', 'translateX(1000px)');
    };

    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);

    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientY);
    }

    function handleTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientY);
        if (touchStart - touchEnd > 10 && touchStart - touchEnd < 349) {
            document.documentElement.style.setProperty('--footersize', touchStart - touchEnd / 2 + "px");
        }
        if (touchStart - touchEnd > 100 && touchStart - touchEnd < 349) {
            document.documentElement.style.setProperty('--dispbg', '1');
        }
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 300) {
            Expand1();
        }

        if (touchStart - touchEnd < -150) {
            Hide1();
        }
        if (touchStart - touchEnd < 349) {
            Hide1();
        }
    }

    const size = useWindowSize();


    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    const handleTrackClick = (position) => {
        audioRef.current.currentTime = position;
    };

    useEffect(() => {
        if (props.isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
    }, [audioRef, props.isPlaying]);

    /*useEffect(() => {
        if (props.isPlaying) {
          localStorage.setItem('playedSong', audioRef.current.currentSrc);
        } else {
          localStorage.setItem('playedSong', 'stop');
        }
    });*/

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [audioRef, volume]);

    
    useEffect(() => {
        audioRef.current.addEventListener('ended', () => {
            if(props.trackData.trackKey[1] === (PLAYLIST[props.trackData.trackKey[0]].playlistData.length)-1){
                props.changeTrack([props.trackData.trackKey[0], 0])
            }else{
                props.changeTrack([props.trackData.trackKey[0], parseInt(props.trackData.trackKey[1])+1])
            }
        })
    });

    

    const [remo, setRemo] = useState("false");
    console.log(remo);
    console.log('ts ' + touchStart);
    console.log('te ' + touchEnd);
    console.log(touchStart - touchEnd / 2);

        const db = getDatabase();
    if (remo == "true") {
        document.documentElement.style.setProperty('--col', '#4287f5');
        set(ref(db, "remote-play/" + code), {
            time: currentTime,
            trackk: props.trackData.trackKey
        })
            .then(() => {
                console.log("Gotowe");
            })
            .catch((error) => {
                console.log("Problem");
            });
    } else {
        document.documentElement.style.setProperty('--col', '#fff');
    }
    return (
        <footer className={styles.footer}>
            
            <div className="lyrics-card-m">
                <button id="bt" className="ex" onClick={() => { Expand() }}>
                    <Icons.Prevpage />
                </button>
                <button id="bt" className="hi" onClick={() => { Hide() }}>
                    <Icons.Nextpage />
                </button >
                <div className="lyrics-card">
                    <div id="flexowy">
                    <h6 id="text-card">{props.trackData.trackName}</h6>
                        <h6 id="czas">{"-" + convertTime(duration - currentTime)}</h6>
                    </div>

                    {LYRICSNEW.filter((item1) => item1.songID == props.trackData.id).map((list) => {
                        document.documentElement.style.setProperty('--opbtn1', list.lyrics[Math.round(currentTime)].op);
                        return (
                            <div>
                                
                            <div>
                                <div id="scroll-lyrics">
                                        <h4 id="text-card">{list.lyrics[Math.round(currentTime)].text}</h4><button id="buttonMusiq">Musiq</button>
                                </div>
                                <MusicControlBoxs id="center-bar" />
                                </div>
                                </div>
                        );
                    })}

                    
                </div>
            </div>
            <img onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)} onTouchEnd={() => handleTouchEnd()} className={styles.bgron} src={props.trackData.trackImg}/>
            <div onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)} onTouchEnd={() => handleTouchEnd()} className={styles.nowplayingbar}>
                <FooterLeft />
                <div className={styles.footerMid}>
                    <MusicControlBox />
                    <MusicProgressBar 
                        currentTime={currentTime} 
                        duration={duration} 
                        handleTrackClick={handleTrackClick}
                    />
                    <Audio
                        ref={audioRef}
                        handleDuration={setDuration}
                        handleCurrentTime={setCurrentTime}
                        trackData={props.trackData}
                        isPlaying={props.isPlaying}
                    />
                </div>                
                {size.width > CONST.MOBILE_SIZE && 
                    <FooterRight 
                        volume={volume} 
                        setVolume={setVolume}
                ></FooterRight>
                    
                }
            </div>
            
        </footer>
    );
}


const mapStateToProps = (state) => {
    return {
        trackData: state.trackData,
        isPlaying: state.isPlaying
    };
};
  
export default connect(mapStateToProps, { changeTrack, changePlay })(Footer);