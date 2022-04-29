import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Audio = forwardRef(({ trackData, handleDuration, handleCurrentTime, isPlaying, handleEnd, Chng, load }, ref) => {
    return (
      <audio
        ref={ref}
        onLoadedMetadata={(e) => handleDuration(e.target.duration)}
        onTimeUpdate={(e) => handleCurrentTime(e.target.currentTime)}
        onError={(e) => {console.log(e); console.log(ref.current.src)
          if (ref.current.src != window.location) {
          console.log('Wystąpił błąd odtwarzania. Jeżeli ten problem często się pojawia zgłoś to na Discordzie');
          document.documentElement.style.setProperty('--error-play', 'block');
          setTimeout(function() {document.documentElement.style.setProperty('--error-play', 'none'); console.log("mogus")}, 7000)
        }}}
        onEnded={(e) => handleEnd()}
        preload='none'
        onLoadedData={() => load()}
        src={trackData.track}
        autoPlay={isPlaying}
      />
    );
  },
);

Audio.propTypes = {
    handleDuration: PropTypes.func.isRequired,
    handleCurrentTime: PropTypes.func.isRequired,
};

export default Audio;
