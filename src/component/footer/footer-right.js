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

function FooterRight({ volume, setVolume, ctime, opn, clo }) {


    const size = useWindowSize();
    return (
        <div className={styles.footerRight}>
            {size.width > CONST.MOBILE_SIZE &&
                <SoundLevel currentTi={ctime} opn={opn} clo={clo} volume={volume} setVolume={setVolume} />
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

function SoundLevel({ volume, setVolume, currentTi, opn, clo }){
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
            <div className="ex" onClick={() => { opn() }}>
                <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z" />
                </svg>
            </div>
            <div id="bt" className="hi" onClick={() => { clo() }}>
                <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z" />
                </svg>
            </div>
            <div tabIndex="0" role="button" onClick={soundBtn}>
                <IconButton icon={<Icons.Sound />} activeicon={<Icons.SoundClose />}/>
            </div>
            <RangeSlider minvalue={0} maxvalue={1} value={volume} handleChange={setVolume}/>
            </div>

    );
}


export default FooterRight;
