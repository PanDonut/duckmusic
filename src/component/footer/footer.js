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

import FadeIn from 'react-fade-in';

const code = "420";

function Footer(props) {
        console.log("re-render");

    

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

    function Expand2() {
        document.documentElement.style.setProperty('--expanded', 'translateY(0px)');
        document.documentElement.style.setProperty('--dispbt1', 'none');
        document.documentElement.style.setProperty('--dispbt2', 'block');
    };

    function Hide2() {
        document.documentElement.style.setProperty('--expanded', 'translateY(340px)');
        document.documentElement.style.setProperty('--dispbt1', 'block');
        document.documentElement.style.setProperty('--dispbt2', 'none');
    };

    function Expand1() {
        document.documentElement.style.setProperty('--footersize', '100%');
        document.documentElement.style.setProperty('--botf', '0px');
        document.documentElement.style.setProperty('--dispbg', 'block');
        document.documentElement.style.setProperty('--dispbt1', 'block');
        document.documentElement.style.setProperty('--dispbt2', 'none');
        document.documentElement.style.setProperty('--imgfull', 'inline-flex');
        document.documentElement.style.setProperty('--imgn', 'none');
        document.documentElement.style.setProperty('--musicctr', 'none');
        document.documentElement.style.setProperty('--phmu', 'flex');
        document.documentElement.style.setProperty('--dipy', 'flex');
        document.documentElement.style.setProperty('--expanded', 'translateY(340px)');
        document.documentElement.style.setProperty('--imgpos', "translateX(calc(50vw - 50%))");
    };

    function Hide1() {
        document.documentElement.style.setProperty('--footersize', '62px');
        document.documentElement.style.setProperty('--botf', '52px');
        document.documentElement.style.setProperty('--dispbg', 'none');
        document.documentElement.style.setProperty('--dispbt1', 'none');
        document.documentElement.style.setProperty('--dispbt2', 'none');
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


function handleTouchStart1(e) {
        setTouchStartx(e.targetTouches[0].clientX);
    }

    function handleTouchMove1(e) {
        setTouchEndx(e.targetTouches[0].clientX);
        if (localStorage.getItem('swipenext') === 'yes') {
            if (isOpen == "false") {
                document.documentElement.style.setProperty('--ne', '0');
                document.documentElement.style.setProperty('--re', '0');
if (touchStart - touchEnd < 25){
                if(touchStartx - touchEndx > 20 || touchStartx - touchEndx < -20) {
                document.documentElement.style.setProperty('--txtpos', "translateX(" + (touchStartx - touchEndx) + "px)");
} else {
document.documentElement.style.setProperty('--txtpos', "translateX(0px)");
}
}
            }
        }
        if (localStorage.getItem('swipenextfull') === 'yes') {
            if (isOpen == "true") {
                document.documentElement.style.setProperty('--imgpos', "translateX(" + (touchStartx - touchEndx) + "px)");

                if (touchStartx - touchEndx > 20) {
                    document.documentElement.style.setProperty('--ne', '0');
                    document.documentElement.style.setProperty('--re', '1');
                }
                if (touchStartx - touchEndx < -20) {
                    document.documentElement.style.setProperty('--ne', '1');
                    document.documentElement.style.setProperty('--re', '0');
                }
            }
        }
    }

    function handleTouchEnd1() {
        document.documentElement.style.setProperty('--txtpos', "translateX(0px)");
        document.documentElement.style.setProperty('--imgpos', "translateX(calc(50vw - 50%))");
        document.documentElement.style.setProperty('--ne', '0');
        document.documentElement.style.setProperty('--re', '0');
        if (isOpen == "false") {
            if (localStorage.getItem('swipenext') === 'yes') {
                if (touchStartx - touchEndx > 50) {
                    increaseIndex();
                }
                if (touchStartx - touchEndx < -50) {
                    decreaseIndex();
                }
            }
        }
        if (isOpen == "true") {
            if (localStorage.getItem('swipenextfull') === 'yes') {
                if (touchStartx - touchEndx > 50) {
                    increaseIndex();
                }
                if (touchStartx - touchEndx < -50) {
                    decreaseIndex();
                }
            }
        }
    }

    const size = useWindowSize();


    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef();

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
    
    
    if (localStorage.getItem('loop') == 'true') {

    } else if (localStorage.getItem('loop') == 'false') {

    } else {
        localStorage.setItem('loop', 'false');
    }

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [audioRef, volume]);

    console.log(localStorage.getItem('loop') + " loop");

    console.log(localStorage.getItem('shuffle') + " shuffle");


        useEffect(() => {
        audioRef.current.addEventListener('ended', () => {
            console.log("KONIEC!");
            setCurrentTime(0);
            if (localStorage.getItem('loop') == 'false') {
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
            } else if (localStorage.getItem('loop') == 'true') {
                setCurrentTime(0);
                audioRef.current.play();
            }
        })
    });


    const [remo, setRemo] = useState("false");

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
                                    {size.width > CONST.MOBILE_SIZE &&
                                        <MusicControlBoxs id="center-bar" />
                                    }
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
                    <FadeIn visible="true" delay="500" className={styles.footerMe}>
                    <MusicProgressBarF
                        currentTime={currentTime}
                        duration={duration}
                        handleTrackClick={handleTrackClick}
                    />
                        <MusicControlBoxPhone />
                        
                    </FadeIn>
                }
                    
                   
                               
                    <FooterRight 
                        volume={volume} 
                        setVolume={setVolume}
                ></FooterRight>
                    <Audio
                    ref={audioRef}
                    handleDuration={setDuration}
                    handleCurrentTime={setCurrentTime}
                    trackData={props.trackData}
                    isPlaying={props.isPlaying}
                    />
                
            </div>
            {size.width < CONST.MOBILE_SIZE &&
                <div className={styles.footerMid}>
                    <MusicProgressBarBot
                        currentTime={currentTime}
                        duration={duration}
                    />
                </div>
            }
            <button id="bt1" className="exp" onClick={() => { Expand2() }}>
                <Icons.Prevpage />
            </button>
            <button id="bt1" className="hid" onClick={() => { Hide2() }}>
                <Icons.Nextpage />
            </button >
            
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
