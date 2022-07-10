import * as Icons from '../icons';
import RangeSlider from './range-slider';
import IconButton from '../buttons/icon-button';
import Footer from './footer';
import CONST from '../../constants/index';
import styles from "./footer-right.module.css";
import { useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import MusicControlBoxPh from './player/music-control-box-ph';
import Connection from '../../pages/connection';
import { useHistory } from 'react-router-dom';
import { GetUID } from "../../pages/functions";
import { connect } from 'react-redux';
import { setQueueVis } from '../../actions';

function FooterRight(props, { volume, setVolume, ctime, opn, clo }) {


    const size = useWindowSize();
    return (
        <div className={styles.footerRight}>
            {size.width > CONST.MOBILE_SIZE &&
                <SoundLevel props={props} currentTi={ctime} opn={opn} clo={clo} volume={volume} setVolume={setVolume} />
            }
            {size.width < CONST.MOBILE_SIZE &&
                <>
                    <MusicControlBoxPh />
                    <div className={styles.gradient}></div>
                </>
            }
            
        </div>
    );
}

function SoundLevel({ volume, setVolume, currentTi, opn, clo, props }){
    const [looping, setLooping] = useState(localStorage.getItem('loop'));
    const [shuffling, setShuffling] = useState(localStorage.getItem('shuffle'));
    const[lastVolume, setLastVolume] = useState(1);

    const history = useHistory();

    const soundBtn = () => {
        if(volume == 0){
            setVolume(lastVolume);
        }else{
            setLastVolume(volume);
            setVolume(0);
        }
    };

    const [conn, setConn] = useState(false);

    return (
        <div className={styles.soundBar}>
            <button style={{fill: props.queueview == false ? 'var(--svg-fo)' : 'var(--akcent)'}} className="ix" onClick={() => { console.log(`_ShowQueue()`); props.setQueueVis(true) }}>
                    <Icons.Queue />
            </button>
            {shuffling === 'false' ?
                <button style={{fill: 'var(--svg-fo)'}} className="ix" onClick={() => { setShuffling("true"); { localStorage.setItem('shuffle', 'true'); } }}>
                    <Icons.Mix />
                </button> :
                <button style={{fill: 'var(--akcent)'}} className="ix" onClick={() => { setShuffling("false"); { localStorage.setItem('shuffle', 'false'); } }}>
                    <Icons.Mix />
                </button>
            }
            { looping === 'false' ?
                <button className="ix" style={{fill: 'var(--svg-fo)'}} onClick={() => { setLooping("true"); { localStorage.setItem('loop', 'true');}} }>
                    <Icons.Loop />
            </button>   :        
                <button className="ix" style={{fill: 'var(--akcent)'}} onClick={() => { setLooping("false"); { localStorage.setItem('loop', 'false'); } }}>
                    <Icons.Loop />
            </button>
        }
            <div className="ex" onClick={() => { props.opn() }}>
                <svg width="20px" height="20px" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M337.134,219.555c-8.401,0-16.736-1.199-24.774-3.564c-13.95-4.093-26.797-11.727-37.145-22.073    c-10.333-10.331-17.966-23.169-22.074-37.123c-9.061-30.797-0.603-64.013,22.073-86.688    c16.535-16.535,38.521-25.642,61.904-25.642c23.385,0,45.371,9.106,61.907,25.642c34.133,34.135,34.133,89.676,0.001,123.811    C382.492,210.449,360.512,219.555,337.134,219.555z M337.118,64.465c-18.042,0-35.004,7.026-47.762,19.784    c-17.497,17.496-24.022,43.13-17.028,66.898c3.165,10.754,9.054,20.653,17.027,28.627c7.986,7.984,17.89,13.872,28.642,17.026    c6.212,1.828,12.647,2.754,19.137,2.754c18.036,0,34.994-7.025,47.751-19.78c26.334-26.336,26.334-69.189-0.001-95.525    C372.125,71.491,355.161,64.465,337.118,64.465z"/><path d="M164.012,360.902c-6.967,0-13.518-2.713-18.443-7.639l-29.691-29.691c-4.927-4.928-7.64-11.479-7.638-18.45    c0.002-6.967,2.715-13.515,7.64-18.438l139.784-139.786c2.497-2.495,6.123-3.488,9.541-2.619c3.42,0.872,6.127,3.481,7.123,6.866    c3.166,10.756,9.055,20.655,17.028,28.629c7.986,7.984,17.89,13.872,28.642,17.026c3.388,0.994,6,3.701,6.874,7.121    c0.873,3.421-0.122,7.049-2.618,9.546L182.456,353.264C177.532,358.188,170.981,360.902,164.012,360.902z M259.102,171.744    L130.02,300.828c-1.148,1.147-1.78,2.674-1.781,4.3s0.632,3.153,1.78,4.302l29.691,29.691c1.148,1.148,2.675,1.781,4.301,1.781    c1.626,0,3.154-0.633,4.301-1.78L297.4,210.035c-8.155-4.158-15.667-9.6-22.186-16.118    C268.702,187.405,263.263,179.899,259.102,171.744z"/><path d="M176.964,302.168c-2.559,0-5.118-0.976-7.071-2.929c-3.905-3.904-3.906-10.236-0.001-14.142l13.898-13.9    c3.905-3.906,10.236-3.907,14.143-0.001c3.905,3.904,3.906,10.236,0.001,14.142l-13.898,13.9    C182.083,301.191,179.523,302.168,176.964,302.168z"/><path d="M137.795,475.691c-2.559,0-5.118-0.977-7.071-2.929c-19.847-19.846-30.776-46.213-30.776-74.243    s10.93-54.397,30.776-74.243c3.905-3.904,10.237-3.903,14.142,0c3.905,3.905,3.905,10.237,0,14.143    c-16.068,16.068-24.918,37.412-24.918,60.101s8.85,44.032,24.918,60.101c3.905,3.905,3.906,10.237,0,14.143    C142.914,474.715,140.354,475.691,137.795,475.691z"/>
                </svg>
            </div>
            <div id="bt" className="hi" onClick={() => { props.clo() }}>
                <svg width="30px" height="30px" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M337.134,219.555c-8.401,0-16.736-1.199-24.774-3.564c-13.95-4.093-26.797-11.727-37.145-22.073    c-10.333-10.331-17.966-23.169-22.074-37.123c-9.061-30.797-0.603-64.013,22.073-86.688    c16.535-16.535,38.521-25.642,61.904-25.642c23.385,0,45.371,9.106,61.907,25.642c34.133,34.135,34.133,89.676,0.001,123.811    C382.492,210.449,360.512,219.555,337.134,219.555z M337.118,64.465c-18.042,0-35.004,7.026-47.762,19.784    c-17.497,17.496-24.022,43.13-17.028,66.898c3.165,10.754,9.054,20.653,17.027,28.627c7.986,7.984,17.89,13.872,28.642,17.026    c6.212,1.828,12.647,2.754,19.137,2.754c18.036,0,34.994-7.025,47.751-19.78c26.334-26.336,26.334-69.189-0.001-95.525    C372.125,71.491,355.161,64.465,337.118,64.465z"/><path d="M164.012,360.902c-6.967,0-13.518-2.713-18.443-7.639l-29.691-29.691c-4.927-4.928-7.64-11.479-7.638-18.45    c0.002-6.967,2.715-13.515,7.64-18.438l139.784-139.786c2.497-2.495,6.123-3.488,9.541-2.619c3.42,0.872,6.127,3.481,7.123,6.866    c3.166,10.756,9.055,20.655,17.028,28.629c7.986,7.984,17.89,13.872,28.642,17.026c3.388,0.994,6,3.701,6.874,7.121    c0.873,3.421-0.122,7.049-2.618,9.546L182.456,353.264C177.532,358.188,170.981,360.902,164.012,360.902z M259.102,171.744    L130.02,300.828c-1.148,1.147-1.78,2.674-1.781,4.3s0.632,3.153,1.78,4.302l29.691,29.691c1.148,1.148,2.675,1.781,4.301,1.781    c1.626,0,3.154-0.633,4.301-1.78L297.4,210.035c-8.155-4.158-15.667-9.6-22.186-16.118    C268.702,187.405,263.263,179.899,259.102,171.744z"/><path d="M176.964,302.168c-2.559,0-5.118-0.976-7.071-2.929c-3.905-3.904-3.906-10.236-0.001-14.142l13.898-13.9    c3.905-3.906,10.236-3.907,14.143-0.001c3.905,3.904,3.906,10.236,0.001,14.142l-13.898,13.9    C182.083,301.191,179.523,302.168,176.964,302.168z"/><path d="M137.795,475.691c-2.559,0-5.118-0.977-7.071-2.929c-19.847-19.846-30.776-46.213-30.776-74.243    s10.93-54.397,30.776-74.243c3.905-3.904,10.237-3.903,14.142,0c3.905,3.905,3.905,10.237,0,14.143    c-16.068,16.068-24.918,37.412-24.918,60.101s8.85,44.032,24.918,60.101c3.905,3.905,3.906,10.237,0,14.143    C142.914,474.715,140.354,475.691,137.795,475.691z"/>
                </svg>
            </div>
            <div tabIndex="0" role="button" onClick={soundBtn}>
                <IconButton icon={<Icons.Sound />} activeicon={<Icons.SoundClose />}/>
            </div>
            <RangeSlider minvalue={0} maxvalue={1} value={localStorage.getItem("dmvol")} handleChange={(e) => {localStorage.setItem("dmvol", e)}}/>
            </div>

    );
}

const mapStateToProps = (state) => {
    return {
      trackData: state.trackData,
      custplay: state.custplay,
      isPlaying: state.isPlaying,
      konsola: state.konsola,
      rewindyear: state.rewindyear,
      rewind: state.rewind,
      queue: state.queue,
      queueview: state.queueview,
    };
  };


export default connect(mapStateToProps, {
    setQueueVis
  })(FooterRight);
