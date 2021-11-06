import convertTime from '../../../functions/convertTime';

import TextRegularM from '../../text/text-regular-m';
import RangeSlider from '../slider';

import styles from "./music-progress-bar-bot.module.css";

function MusicProgressBar({ currentTime, duration, handleTrackClick}){
    return (
        <div className={styles.musicProgress}>
            <RangeSlider value={currentTime} minvalue={0} maxvalue={duration} handleChange={handleTrackClick}/>
        </div>
    );
}

export default MusicProgressBar;