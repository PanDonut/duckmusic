import { connect } from "react-redux";
import * as Icons from '../icons';
import TextRegularM from '../text/text-regular-m';
import IconButton from '../buttons/icon-button';
import React, { useRef, useState } from 'react';
import { aut } from '../../dauth';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { changeTrack, customTrack, songTrack } from '../../actions/index'
import styles from "./footer-left.module.css";

import PLAYLIST from "../../data/index.json";

function FooterLeft(props, increaseIndex, decreaseIndex){
    return (
        <div className={styles.footerLeft}>
            <ImgBox 
                trackData={props.trackData}
            />
            <SongDetails
                trackData={props.trackData}
            />
        </div>
    );
}

function ImgBox({ trackData }) {
    const img = useRef(null);
    return (
        <div>
        <div className={styles.imgBox}>
                <img ref={img} src={trackData.trackImg} alt=" "/>
        </div>
            <div className={styles.imgBoxfull}>
                <img src={trackData.trackImg} alt=" " />
            </div>
            </div>
    );
}

function SongDetails(props, { trackData }, increaseIndex, decreaseIndex) {
    let isMounted = true;
    const [PLAYLISTC, setPosts] = useState(null);
    const db = getDatabase(aut);
    const nameRef = ref(db, 'users/' + localStorage.getItem('email').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (isMounted) {
                if (PLAYLISTC == null) {
                    isMounted = false;
                    setPosts(JSON.parse(data));
                }
            }
        }
    });
    
    return (
        <div>
            <div className={styles.songDetails} >
                <p className={styles.tit}>{props.trackData.trackName}</p>
                <TextRegularM><small>{props.trackData.trackArtist}</small></TextRegularM>
            
        </div>
        <div className={styles.songDetailsfull}>
            <TextRegularM><small>{props.trackData.trackArtist}</small></TextRegularM>
            <TextRegularM>{props.trackData.trackName}</TextRegularM>           
        </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
      trackData: state.trackData
    };
};
  
export default connect(mapStateToProps, { changeTrack, customTrack, songTrack })(FooterLeft);