import React, { forwardRef, useEffect, useState  } from 'react';
import PropTypes from 'prop-types';
import './style.css'
const Audio = forwardRef(({ trackData, handleDuration, handleCurrentTime, isPlaying, isLooping }, ref) => {

    const [loopy, setLoopy] = React.useState(localStorage.getItem('loop'));

    console.log("re-render");

    return (
        <div>
            <audio
                id="myaudio"
                ref={ref}
                onLoadedMetadata={(e) => handleDuration(e.target.duration)}
                onTimeUpdate={(e) => handleCurrentTime(e.target.currentTime)}
                src={trackData.track}
                autoPlay={isPlaying}
                preload='auto'
                />
            </div>
    );
  },
);

Audio.propTypes = {
    handleDuration: PropTypes.func.isRequired,
    handleCurrentTime: PropTypes.func.isRequired,
};

export default Audio;