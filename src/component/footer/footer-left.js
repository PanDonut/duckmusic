import { connect } from "react-redux";
import * as Icons from '../icons';
import TextRegularM from '../text/text-regular-m';
import IconButton from '../buttons/icon-button';

import styles from "./footer-left.module.css";

function FooterLeft(props){
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

function ImgBox({ trackData }){
    return (
        <div>
        <div className={styles.imgBox}>
            <img src={trackData.trackImg} alt=" "/>
        </div>
        <div className={styles.imgBoxfull}>
            <img src={trackData.trackImg} alt=" "/>
            </div>
            </div>
    );
}

function SongDetails({ trackData }){
    return (
        <div>
        <div className={styles.songDetails}>
                <TextRegularM>{trackData.trackName}</TextRegularM>
                <TextRegularM><small>{trackData.trackArtist}</small></TextRegularM>
            
        </div>
        <div className={styles.songDetailsfull}>
            <TextRegularM><small>{trackData.trackArtist}</small></TextRegularM>
            <TextRegularM>{trackData.trackName}</TextRegularM>           
        </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
      trackData: state.trackData
    };
};
  
export default connect(mapStateToProps)(FooterLeft);