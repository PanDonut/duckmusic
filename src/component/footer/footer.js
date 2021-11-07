import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeTrack, changePlay } from '../../actions';
import useWindowSize from '../../hooks/useWindowSize';
import FooterLeft from './footer-left';
import MusicControlBox from './player/music-control-box';
import MusicControlBoxPh from './player/music-control-box-ph';
import MusicControlBoxPhone from './player/music-control-box-phone';
import MusicControlBoxs from './player/music-control-box-small';
import MusicProgressBar from './player/music-progress-bar';
import MusicProgressBarF from './player/music-progress-bar-full';
import MusicProgressBarBot from './player/music-progress-bar-bot';
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


    function decreaseIndex() {
        if (props.trackData.trackKey[1] == 0) { } else {
            props.changeTrack([props.trackData.trackKey[0], props.trackData.trackKey[1] - 1])
        }
    }
    function increaseIndex() {
        if (props.trackData.trackKey[1] == (PLAYLIST[props.trackData.trackKey[0]].playlistData.length) - 1) { } else {
            props.changeTrack([props.trackData.trackKey[0], parseInt(props.trackData.trackKey[1]) + 1])
        }
    }

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
        document.documentElement.style.setProperty('--dispbg', 'block');
        document.documentElement.style.setProperty('--expanded', 'translateX(0px)');
        document.documentElement.style.setProperty('--imgfull', 'block');
        document.documentElement.style.setProperty('--imgn', 'none');
        document.documentElement.style.setProperty('--musicctr', 'none');
        document.documentElement.style.setProperty('--phmu', 'flex');
        document.documentElement.style.setProperty('--dipy', 'flex');
    };

    function Hide1() {
        document.documentElement.style.setProperty('--footersize', '62px');
        document.documentElement.style.setProperty('--botf', '52px');
        document.documentElement.style.setProperty('--dispbg', 'none');
        document.documentElement.style.setProperty('--expanded', 'translateX(1000px)');
        document.documentElement.style.setProperty('--imgfull', 'none');
        document.documentElement.style.setProperty('--imgn', 'block');
        document.documentElement.style.setProperty('--musicctr', 'flex');
        document.documentElement.style.setProperty('--phmu', 'none');
        document.documentElement.style.setProperty('--dipy', 'none');
    };

    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);
    const [touchStartx, setTouchStartx] = React.useState(0);
    const [touchEndx, setTouchEndx] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState("false");

    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientY);
        setTouchStartx(e.targetTouches[0].clientX);
if(isOpen == "true") {
}
if(isOpen == "false") {
        
}
    }

    function handleTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientY);
        setTouchEndx(e.targetTouches[0].clientX);
if(isOpen == "true") {
}
if(isOpen == "false") {
        
        if (touchStart - touchEnd > 40 && touchStart - touchEnd < 349) {
            document.documentElement.style.setProperty('--footersize', (touchStart - touchEnd) / 3.5 + "vh");
        }
        if (touchStart - touchEnd > 200 && touchStart - touchEnd < 349) {
            document.documentElement.style.setProperty('--dispbg', '1');
            document.documentElement.style.setProperty('--botf', '0px');
            document.documentElement.style.setProperty('--imgn', 'none');
        }
}
    }

    function handleTouchEnd() {
        if (isOpen == "true") {
            if (touchStart - touchEnd < -160) {
                Hide1();
                setIsOpen("false");
            }
        }
        if (isOpen == "false") {
            if (touchStart - touchEnd > 300) {
                Expand1();
                setIsOpen("true");
            }

            if (touchStart - touchEnd < 340) {
                Hide1();
            }
        }
    }

    console.log("MEEM " + (touchStartx - touchEndx));

function handleTouchStart1(e) {
        setTouchStartx(e.targetTouches[0].clientX);
    }

    function handleTouchMove1(e) {
        setTouchEndx(e.targetTouches[0].clientX);
    }

    function handleTouchEnd1() {
        if (localStorage.getItem('swipenext') === 'yes') {
            if (touchStartx - touchEndx > 25) {
                increaseIndex();
            }
            if (touchStartx - touchEndx < 25) {
                decreaseIndex();
            }
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
            if(props.trackData.trackKey[1] === (PLAYLIST[props.trackData.trackKey[0]].playlistData.length)){
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
            <img onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)} onTouchEnd={() => handleTouchEnd()} className={styles.bgron} src={props.trackData.trackImg} />
            
            <div onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)} onTouchEnd={() => handleTouchEnd()} className={styles.nowplayingbar}>
                <div onTouchStart={touchStartEvent => handleTouchStart1(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove1(touchMoveEvent)} onTouchEnd={() => handleTouchEnd1()}>
                    <FooterLeft />
                </div>
                <div>
                
                    {size.width > CONST.MOBILE_SIZE &&
                    <div className={styles.footerMid}>
                    <MusicControlBox />
                    <MusicProgressBar
                        currentTime={currentTime}
                        duration={duration}
                        handleTrackClick={handleTrackClick}
                    />
                    </div>
                }
                {size.width < CONST.MOBILE_SIZE &&
                    <div className={styles.footerMe}>
                    <MusicProgressBarF
                        currentTime={currentTime}
                        duration={duration}
                        handleTrackClick={handleTrackClick}
                    />
                        <MusicControlBoxPhone />
                        
                    </div>
                }
                    
                    <Audio
                        ref={audioRef}
                        handleDuration={setDuration}
                        handleCurrentTime={setCurrentTime}
                        trackData={props.trackData}
                        isPlaying={props.isPlaying}
                    />
                               
                    <FooterRight 
                        volume={volume} 
                        setVolume={setVolume}
                ></FooterRight>
                
            </div>
            </div>
            {size.width < CONST.MOBILE_SIZE &&
                <div className={styles.footerMid} onTouchStart={touchStartEvent => handleTouchStart1(touchStartEvent)} onTouchMove={touchMoveEvent => handleTouchMove1(touchMoveEvent)} onTouchEnd={() => handleTouchEnd1()}>
                    <MusicProgressBarBot
                        currentTime={currentTime}
                        duration={duration}
                    />
                </div>
            }
            
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
