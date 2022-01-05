import React, { useRef, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { changeTrack, changePlay, customTrack } from '../../actions';
import useWindowSize from '../../hooks/useWindowSize';
import FooterLeft from './footer-left';
import createState from '../../hooks/createState';
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
import Lyrics from '../Lyrics';
import SONGLIST from '../../data/songs.json'
import PLAYLIST from "../../data/index.json";
import CONST from '../../constants/index';
import styles from "./footer.module.css";
import '../lyrics/lyrics.modular.css';
import TextTransition, { presets } from "react-text-transition";
import convertTime from '../../functions/convertTime';
import { aut } from '../../dauth';
import { getDatabase, ref, onValue, set } from "firebase/database";
import FadeIn from 'react-fade-in';


function Footer(props) {
    const size = useWindowSize();
    let isMounted = true;
    const [PLAYLISTC, setPosts] = useState(null);
    const db = getDatabase(aut);
    if (localStorage.getItem("emaildm") != null) {
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
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

    

    function Expand() {
        document.documentElement.style.setProperty('--disp-ly', 'block');
        document.documentElement.style.setProperty('--disp2', 'none');
        document.documentElement.style.setProperty('--disp3', 'flex');        
    };

    function Hide() {
        document.documentElement.style.setProperty('--disp2', 'flex');
        document.documentElement.style.setProperty('--disp3', 'none');
        setTimeout(document.documentElement.style.setProperty('--disp-ly', 'none'), 500)
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
        if (size.width < CONST.MOBILE_SIZE) {
            document.documentElement.style.setProperty('--footersize', '100%');
            document.documentElement.style.setProperty('--botf', '0px');
            document.documentElement.style.setProperty('--mobile-radius', '0px');
            document.documentElement.style.setProperty('--dispbg', 'block');
            document.documentElement.style.setProperty('--dispbt1', 'block');
            document.documentElement.style.setProperty('--dispbt2', 'none');
            document.documentElement.style.setProperty('--imgn', 'none');
            document.documentElement.style.setProperty('--musicctr', 'none');
            document.documentElement.style.setProperty('--lyrics', 'flex');
            document.documentElement.style.setProperty('--phmu', 'flex');
            document.documentElement.style.setProperty('--dipy', 'flex');
            document.documentElement.style.setProperty('--expanded', 'translateY(200vh)');
            document.documentElement.style.setProperty('--imgpos', "translateX(calc(50vw - 50%))");
            document.documentElement.style.setProperty('--footwidth', '100%');
            document.documentElement.style.setProperty('--txtdisplay', "block");
            document.documentElement.style.setProperty('--footopa', '0');
            document.documentElement.style.setProperty('--imgfull', 'inline-flex');
            document.documentElement.style.setProperty('--sus', 'blur(4px) grayscale(20%) brightness(50%)');
            document.documentElement.style.setProperty('--bg-footer1', 'url(' + props.trackData.trackImg + ')');
        }
    };

    function Hide1() {
        document.documentElement.style.setProperty('--footersize', '62px');
        document.documentElement.style.setProperty('--footwidth', 'calc(100% - 20px)');
        document.documentElement.style.setProperty('--botf', '55px');
        document.documentElement.style.setProperty('--dispbg', 'none');
        document.documentElement.style.setProperty('--dispbt1', 'none');
        document.documentElement.style.setProperty('--lyrics', 'none;');
        document.documentElement.style.setProperty('--dispbt2', 'none');
        document.documentElement.style.setProperty('--imgn', 'block');
        document.documentElement.style.setProperty('--imgfull', 'none');
        document.documentElement.style.setProperty('--musicctr', 'flex');
        document.documentElement.style.setProperty('--phmu', 'none');
        document.documentElement.style.setProperty('--mobile-radius', '20px');
        document.documentElement.style.setProperty('--dipy', 'none');
        document.documentElement.style.setProperty('--txtdisplay', "none");
        document.documentElement.style.setProperty('--sus', 'none');
        document.documentElement.style.setProperty('--footopa', '0.5');
        document.documentElement.style.setProperty('--bg-footer1', 'var(--card-background)');
    };

    const [isOpen, setIsOpen] = React.useState("false");
    const audioRef = useRef(null);





    

    
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

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


    if (localStorage.getItem('firecon') == null) {
        localStorage.setItem('firecon', false);
    }

    
    if (localStorage.getItem('loop') == 'true') {

    } else if (localStorage.getItem('loop') == 'false') {

    } else {
        localStorage.setItem('loop', 'false');
    }

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [audioRef, volume]);


    const [songsPlayed, setNewSong] = useState(0);

    const [state, setState] = createState({
        currentTime: currentTime
    })

    function EndSong() {
        if (localStorage.getItem('loop', 'true')) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            increaseIndex();
        }
    }

    return (
        <footer className={styles.footer}>
                            
            {size.width > CONST.MOBILE_SIZE ?
                <Lyrics currentTime={currentTime} song={props.trackData} songId={props.trackData.id} sly={props.trackData.lyrics} />
                : ''
            }
            
            
            
            <div className={styles.nowplayingbar}>
                <div onClick={() => { Expand1() }} className={styles.child1}>
                    {size.width < CONST.MOBILE_SIZE &&
                        <div className={styles.footerMid}>
                            <MusicProgressBarBot
                                currentTime={currentTime}
                                duration={duration}
                            />
                        </div>
                    }
                    <FooterLeft />
                </div>
                
                    {size.width > CONST.MOBILE_SIZE &&
                    <div className={styles.footerMid}>
                    <MusicControlBox/>
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
                    ctime={currentTime}
                    volume={volume}
                    setVolume={setVolume}
                    opn={Expand}
                    clo={Hide}
                ></FooterRight>
                    <Audio
                        ref={audioRef}
                        handleDuration={setDuration}
                        handleCurrentTime={setCurrentTime}
                        trackData={props.trackData}
                        isPlaying={props.isPlaying}
                        handleEnd={EndSong}
                    />
                
            </div>
            { size.width < CONST.MOBILE_SIZE ?
                <Lyrics currentTime={currentTime} song={props.trackData} songId={props.trackData.id} sly={props.trackData.lyrics} />
                : ''
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
  
export default connect(mapStateToProps, { changeTrack, changePlay, customTrack })(Footer);
