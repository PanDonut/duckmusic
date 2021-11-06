import * as Icons from '../icons';
import RangeSlider from './range-slider';
import IconButton from '../buttons/icon-button';
import Footer from './footer';
import CONST from '../../constants/index';
import styles from "./footer-right.module.css";
import { useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import MusicControlBoxPh from './player/music-control-box-ph';

function FooterRight({ volume, setVolume }) {

    const size = useWindowSize();
    return (
        <div className={styles.footerRight}>
            {size.width > CONST.MOBILE_SIZE &&
                <SoundLevel volume={volume} setVolume={setVolume} />
            }
            {size.width < CONST.MOBILE_SIZE &&
                <MusicControlBoxPh />
            }
            
        </div>
    );
}

function SoundLevel({ volume, setVolume }){
    const[lastVolume, setLastVolume] = useState(1);

    const soundBtn = () => {
        if(volume == 0){
            setVolume(lastVolume);
        }else{
            setLastVolume(volume);
            setVolume(0);
        }
    };

    return (
        <div className={styles.soundBar}>
            <div tabIndex="0" role="button" onClick={soundBtn}>
                <IconButton icon={<Icons.Sound />} activeicon={<Icons.SoundClose />}/>
            </div>
            <RangeSlider minvalue={0} maxvalue={1} value={volume} handleChange={setVolume}/>
            </div>
    );
}


export default FooterRight;