import { connect } from "react-redux";
import * as Icons from '../icons';
import TextRegularM from '../text/text-regular-m';
import IconButton from '../buttons/icon-button';
import React, { useRef, useState } from 'react';
import { aut } from '../../dauth';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { changeTrack, customTrack, songTrack } from '../../actions/index'
import styles from "./footer-left.module.css";
import { useHistory } from "react-router-dom";
import PLAYLIST from "../../data/index.json";
import Color from 'color-thief-react';

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
            <Color src={trackData.trackImg} format="hex" quality={1} crossOrigin='anonymous'>
								{({ data, loading, error }) => {
									document.documentElement.style.setProperty('--song-hover', data);	
									console.log(error)
							}}
							</Color>
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
    const sus = useRef(null);
    const history = useHistory();
    function checkOverflow(el)
{
   var curOverflow = el.style.overflow;

   if ( !curOverflow || curOverflow === "visible" )
      el.style.overflow = "hidden";

   var isOverflowing = el.clientWidth < el.scrollWidth 
      || el.clientHeight < el.scrollHeight;

   el.style.overflow = curOverflow;

   return isOverflowing;
}   
    var name = props.trackData.trackName;
    let isMounted = true;
    const [PLAYLISTC, setPosts] = useState(null);
    const db = getDatabase(aut);
    if (localStorage.getItem("emaildm") != null) {
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
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
}
    console.log('dddd ' + props.trackData.trackArtist.split(",").length)
    return (
        <div>
            <div className={styles.songDetails}>
                <p className={styles.tit} ref={sus} onLoad={() => {if (sus.current) {
        console.log(checkOverflow(sus.current))
    }}}>{props.trackData.trackName}</p>
    <div className={styles.aaa}>
                { props.trackData.trackArtist.split(",").map(item => {
                    console.log(item.toLowerCase())
                    return (
                <div className={styles.Artist1} onClick={() => {{ document.documentElement.style.setProperty('--img-opacity', '1'); { history.push('/artist/' + item.toLowerCase().split(" ").join("-"))}}}}>
                    <TextRegularM>{item}</TextRegularM>{props.trackData.trackArtist.split(",").indexOf(item) < props.trackData.trackArtist.split(",").length - 1 ? ',' : ''}&nbsp;
                </div>
                    );
                }
                )
                }
            </div>
        </div>
        <div className={styles.songDetailsfull}>
        { props.trackData.trackArtist.split(",").map(item => {
                    console.log(item.toLowerCase())
                    return (
                <div className={styles.Artist1} onClick={() => {{ document.documentElement.style.setProperty('--img-opacity', '1'); { history.push('/artist/' + item.toLowerCase().split(" ").join("-"))}}}}>
                    <TextRegularM>{item}&nbsp;</TextRegularM>
                </div>
                    );
                }
                )
                }
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