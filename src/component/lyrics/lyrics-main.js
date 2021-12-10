import './lyrics.modular.css'
import convertTime from '../../functions/convertTime';
import PLAYLIST from "../../data/index";
import { LYRICSNEW } from "../../data/lyrics";
import { connect } from "react-redux";
import MusicProgressBar from '../footer/player/music-control-box-small';
import MusicProgressBare from '../footer/player/music-progress-bar';
import React, { useEffect, useRef, useState } from 'react';
import Audio from '../footer/audio';
import * as Icons from '../icons';

    
function Lyrics(props) {

    function Expand() {
        document.documentElement.style.setProperty('--expanded', 'translateX(0px)');
        document.documentElement.style.setProperty('--disp2', 'none');
        document.documentElement.style.setProperty('--disp3', 'block');
    };

    function Hide() {
        document.documentElement.style.setProperty('--expanded', 'translateX(340px)');
        document.documentElement.style.setProperty('--disp2', 'block');
        document.documentElement.style.setProperty('--disp3', 'none');
    };   

return (
    
    <div className="lyrics-card-m">
        <button id="bt" className="ex" onClick={() => { Expand() }}>
            <Icons.Prevpage />
        </button>
        <button id="bt" className="hi" onClick={() => { Hide() }}>
            <Icons.Nextpage/>
        </button >
    <div className="lyrics-card">
        <TxtBox trackData={props.trackData} />
        {LYRICSNEW.filter((item) => item.songID == props.trackData).map((list) => {
            return (
                <div>
                    
                    <h4 id="text-card">{ }</h4>
                </div>
            );
        })}
        </div>
        </div>
            
    )
}

function TxtBox({ trackData }, props) {
    console.log(trackData.id);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    const handleTrackClick = (position) => {
        audioRef.current.currentTime = position;
    };
    return (
        <div>
            <h6 id="text-card">{trackData.trackName}</h6>
            {LYRICSNEW.filter((item) => item.songID == trackData.id).map((list) => {
                console.log(list.lyrics);
                console.log("CuTe"  + currentTime);

                            return (
                                <div>
                                    <div id="scroll-lyrics">
                                        <h4 id="text-card">{list.lyrics[currentTime].text}</h4>
                                    </div>
                                    <MusicProgressBar id="center-bar" />
                                    <MusicProgressBare
                                        currentTime={currentTime}
                                    />
                                </div>
                            );
            })}

        </div>
    );
}

const mapStateToProps = (state) => {
    console.log("Czaas " + state.currentTime);
    return {
        trackData: state.trackData
    };
};

export default connect(mapStateToProps)(Lyrics);