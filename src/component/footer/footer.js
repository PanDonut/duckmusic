import React, { useRef, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { changeTrack, changePlay, customTrack, songTrack } from '../../actions';
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
import axios from 'axios';
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
import AudioSpectrum from 'react-audio-spectrum';
import { useReducer } from 'react';


function Footer(props) {
    const size = useWindowSize();
    let isMounted = true;
    const [PLAYLISTC, setPosts] = useState(null);
    const db = getDatabase(aut);
    const db1 = getDatabase(aut);
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

if (localStorage.getItem("fadetime") == null) {
    localStorage.setItem("fadetime", 0)
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
                        props.changeTrack([props.trackData.trackKey[0], Math.floor((Math.random() * parseInt(PLAYLIST[props.trackData.trackKey[0]].playlistData.length)) - 1)])
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

    if (Math.round(currentTime) >= Math.round(duration - localStorage.getItem("fadetime"))) {
        if (audioRef.current && audioRef.current.volume > 0.1) {
        audioRef.current.volume = audioRef.current.volume - 0.01;
        console.log(audioRef.current.volume);
        }
    }

    if (Math.round(currentTime) <= Math.round(duration - duration + localStorage.getItem("fadetime"))) {
        if (audioRef.current && audioRef.current.volume < volume) {
        audioRef.current.volume = audioRef.current.volume + 0.01;
        console.log(audioRef.current.volume);
        }
    }

    
    if (localStorage.getItem('loop') == 'true') {

    } else if (localStorage.getItem('loop') == 'false') {

    } else {
        localStorage.setItem('loop', 'false');
    }

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [audioRef, volume]);

    localStorage.getItem('explicit');
    if (props.isPlaying && props.trackData.trackName.includes("🅴") && localStorage.getItem('explicit') == 'no' || props.isPlaying && props.trackData.trackName.includes("🅴") && localStorage.getItem('explicit') == null) {
          audioRef.current.pause();
          document.documentElement.style.setProperty('--error-ex', 'block');
          setTimeout(function() {document.documentElement.style.setProperty('--error-ex', 'none'); console.log("mogus")}, 10000)
    }

    const [songsPlayed, setNewSong] = useState(0);

    const [state, setState] = createState({
        currentTime: currentTime
    })
    function EndSong() {
        if (localStorage.getItem('loop') == 'true') {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            increaseIndex();
        }
    }
    if (props.trackData.trackName != "Brak utworu") {
    document.title = props.trackData.trackName + ' · ' + props.trackData.trackArtist + ' | Duck Music';
    document.head.children.namedItem('description').content = props.trackData.trackArtist;
    document.head.children.namedItem('author').content = props.trackData.trackArtist;
} else {
    document.title = "Duck Music";
    document.head.children.namedItem('description').content = ' ';
    document.head.children.namedItem('author').content = ' '
}

const [keyguide, setKeyGuide] = useState(false);

document.onkeyup = function(e) {
    if (e.ctrlKey && e.keyCode == 32) {
        e.preventDefault();
        props.changePlay(!props.isPlaying);
    } else if (e.ctrlKey && e.keyCode == 66) {
        e.preventDefault();
        decreaseIndex();
    } else if (e.ctrlKey && e.keyCode == 77) {
        e.preventDefault();
        increaseIndex();
    } else if (e.ctrlKey && e.keyCode == 81) {
        e.preventDefault();
        if (keyguide == true) {
            document.documentElement.style.setProperty('--keyguide', 'none')
        } else {
            document.documentElement.style.setProperty('--keyguide', 'block')
        }
        setKeyGuide(!keyguide);
    }
  };
  

  document.onkeydown = function(e) {
    if (e.ctrlKey && e.keyCode == 32) {
        e.preventDefault();
      } else if (e.ctrlKey && e.keyCode == 66) {
        e.preventDefault();
      } else if (e.ctrlKey && e.keyCode == 77) {
        e.preventDefault();
      } else if (e.ctrlKey && e.keyCode == 81) {
        e.preventDefault();
      }
  };

window.addEventListener('load', useEffect(() => {
    if (localStorage.getItem('dmsavedata') != null) {
        if (JSON.parse(localStorage.getItem('dmsavedata'))[0].type == 0) {
            props.changeTrack(JSON.parse(localStorage.getItem('dmsavedata'))[0].data);            
        } else if (JSON.parse(localStorage.getItem('dmsavedata'))[0].type == 1) {
          props.songTrack(JSON.parse(localStorage.getItem('dmsavedata'))[0].data)
      } else if (JSON.parse(localStorage.getItem('dmsavedata'))[0].type == 2) {
          props.customTrack(JSON.parse(localStorage.getItem('dmsavedata'))[0].data)
      }    
        if (audioRef.current) {
            audioRef.current.currentTime = JSON.parse(localStorage.getItem('dmsavedata'))[0].time;
        }
        console.log(audioRef.current);        
    }
    const url = `https://raw.githubusercontent.com/PanDonut/duckmusic/main/public/updates.json`
    const url1 = `/updates.json`
            axios.get(url)
                .then(res => {
					axios.get(url1)
                .then(res1 => {
					if (res1[0] < res[0]) {
                        window.location.reload(true);
                    }
                })
				.catch(err => {
					console.log(err)
				}
				)
                })
				.catch(err => {
					console.log(err)
				}
				)
}, []))

    if (props.trackData.isCustom == 'false' && props.trackData.canSkip == 'true') {
        localStorage.setItem("dmsavedata", JSON.stringify(
            [
                {
                    "type": 0,
                    "data": props.trackData.trackKey,
                    "time": currentTime
                }
            ]
        ))
    } else if (props.trackData.isCustom == 'false' && props.trackData.canSkip == 'false') {
        localStorage.setItem("dmsavedata", JSON.stringify(
            [
                {
                    "type": 1,
                    "data": props.trackData.trackKey,
                    "time": currentTime
                }
            ]
        ))
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.cantplay}>
                <h4>Duck Music nie może teraz tego odtworzyć</h4>
            </div>
            <div className={styles.cantplayex}>
                <h4>Odtwarzanie nieodpowiednich utworów jest wyłączone</h4>
            </div>
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
  
export default connect(mapStateToProps, { changeTrack, changePlay, customTrack, songTrack })(Footer);
