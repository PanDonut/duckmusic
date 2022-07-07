import convertTime from '../../../functions/convertTime';

import TextRegularM from '../../text/text-regular-m';
import RangeSlider from '../range-slider';

import styles from "./music-progress-bar.module.css";

function MusicProgressBar({ currentTime, duration, handleTrackClick}){
    return (
        <div className={styles.musicProgress}>
            <RangeSlider value={currentTime} minvalue={0} maxvalue={duration} handleChange={handleTrackClick}/>
            <span className='TimeSpan'>
                <TextRegularM>{`${window.location.href.includes(":3") ? currentTime : ''} ${convertTime(currentTime)}/${convertTime(duration)}`}</TextRegularM>
            </span>
        </div>
    );
}

export default MusicProgressBar;