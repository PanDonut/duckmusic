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

function FooterRight({ volume, setVolume, ctime }) {


    const size = useWindowSize();
    return (
        <div className={styles.footerRight}>
            {size.width > CONST.MOBILE_SIZE &&
                <SoundLevel currentTi={ctime} volume={volume} setVolume={setVolume} />
            }
            {size.width < CONST.MOBILE_SIZE &&
                <MusicControlBoxPh />
            }
            
        </div>
    );
}

function SoundLevel({ volume, setVolume, currentTi }){
    const[lastVolume, setLastVolume] = useState(1);


    console.log(currentTi);

    const soundBtn = () => {
        if(volume == 0){
            setVolume(lastVolume);
        }else{
            setLastVolume(volume);
            setVolume(0);
        }
    };

    const [conn, setConn] = useState(false);

    console.log(conn);
    console.log(localStorage.getItem('firecon'));
    return (
        <div className={styles.soundBar}>
            {conn ?
                <Connection currenttTime={currentTi} /> : ''
}
            {  conn ?
                <div role="button" className={styles.pipac} onClick={() => { localStorage.setItem('firecon', false); { setConn(false) }}}>
                    <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V13C18 14.1046 17.1046 15 16 15H4C2.89543 15 2 14.1046 2 13V6ZM4 5C3.44772 5 3 5.44772 3 6V13C3 13.5523 3.44772 14 4 14H16C16.5523 14 17 13.5523 17 13V6C17 5.44772 16.5523 5 16 5H4Z" />
                        <path d="M5 16.5C5 16.2239 5.22386 16 5.5 16H14.5C14.7761 16 15 16.2239 15 16.5C15 16.7761 14.7761 17 14.5 17H5.5C5.22386 17 5 16.7761 5 16.5Z" />
                    </svg>

                </div> :
                <div role="button" className={styles.pip} onClick={() => { localStorage.setItem('firecon', true); { setConn(true) } }}>
                    <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V13C18 14.1046 17.1046 15 16 15H4C2.89543 15 2 14.1046 2 13V6ZM4 5C3.44772 5 3 5.44772 3 6V13C3 13.5523 3.44772 14 4 14H16C16.5523 14 17 13.5523 17 13V6C17 5.44772 16.5523 5 16 5H4Z" />
                        <path d="M5 16.5C5 16.2239 5.22386 16 5.5 16H14.5C14.7761 16 15 16.2239 15 16.5C15 16.7761 14.7761 17 14.5 17H5.5C5.22386 17 5 16.7761 5 16.5Z" />
                    </svg>

                </div>
            }
            <div tabIndex="0" role="button" onClick={soundBtn}>
                <IconButton icon={<Icons.Sound />} activeicon={<Icons.SoundClose />}/>
            </div>
            <RangeSlider minvalue={0} maxvalue={1} value={volume} handleChange={setVolume}/>
            </div>

    );
}


export default FooterRight;