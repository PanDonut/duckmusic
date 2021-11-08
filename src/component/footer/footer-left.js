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
                <div className={styles.ne}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 330.001 330.001" width="25%" height="25%">
                        <path fill="#fff" d="M315.001,0.001c-8.284,0-15,6.716-15,15v113.788L175.607,4.394c-4.29-4.29-10.743-5.574-16.347-3.252
	c-5.605,2.322-9.26,7.792-9.26,13.858v113.788L25.607,4.394C21.317,0.104,14.864-1.18,9.26,1.142
	c-5.605,2.322-9.26,7.792-9.26,13.858v300c0,6.067,3.654,11.537,9.26,13.858c1.855,0.769,3.805,1.143,5.736,1.143
	c3.904,0,7.741-1.524,10.61-4.394l124.394-124.392v113.786c0,6.067,3.654,11.537,9.26,13.858c1.855,0.769,3.805,1.143,5.736,1.143
	c3.904,0,7.741-1.524,10.61-4.394l124.394-124.392v113.786c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-300
	C330.001,6.716,323.285,0.001,315.001,0.001z"/>
                    </svg>

                </div>
                <img src={trackData.trackImg} alt=" " />
                <div className={styles.re}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 330.001 330.001" width="25%" height="25%">
                        <path fill="#fff" d="M315.001,0.001c-8.284,0-15,6.716-15,15v113.788L175.607,4.394c-4.29-4.29-10.743-5.574-16.347-3.252
	c-5.605,2.322-9.26,7.792-9.26,13.858v113.788L25.607,4.394C21.317,0.104,14.864-1.18,9.26,1.142
	c-5.605,2.322-9.26,7.792-9.26,13.858v300c0,6.067,3.654,11.537,9.26,13.858c1.855,0.769,3.805,1.143,5.736,1.143
	c3.904,0,7.741-1.524,10.61-4.394l124.394-124.392v113.786c0,6.067,3.654,11.537,9.26,13.858c1.855,0.769,3.805,1.143,5.736,1.143
	c3.904,0,7.741-1.524,10.61-4.394l124.394-124.392v113.786c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-300
	C330.001,6.716,323.285,0.001,315.001,0.001z"/>
                    </svg>

                </div>
            </div>
            </div>
    );
}

function SongDetails({ trackData }){
    return (
        <div>
        <div className={styles.songDetails}>
                <p className={styles.tit}>{trackData.trackName}</p>
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