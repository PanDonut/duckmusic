import { connect } from 'react-redux';
import { changeTrack } from '../../../actions';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-button';

import { PLAYLIST } from "../../../data/index";
import styles from "./music-control-box-small.module.css";

function MusicControlBox(props, {audioRef}) {

    console.log("re-render");

     function decreaseIndex() {
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
    }
    function increaseIndex() {
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
                props.changeTrack([props.trackData.trackKey[0], Math.floor((Math.random() * parseInt(PLAYLIST[props.trackData.trackKey[0]].playlistData.length)) + 0)])
            }
        } else {
            localStorage.setItem('shuffle', 'false')
        }
    }
    return (
        <div className={styles.musicControl}>
            <button className={styles.button} onClick={decreaseIndex}>
                <Icons.Prev />
            </button>
            <PlayButton isthisplay={true}/>
            <button className={styles.button} onClick={increaseIndex}>
                <Icons.Next />
            </button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      trackData: state.trackData
    };
};
  
export default connect(mapStateToProps, { changeTrack })(MusicControlBox);
