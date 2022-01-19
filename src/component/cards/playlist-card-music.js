import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { songTrack } from '../../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';
import FadeIn from 'react-fade-in';
import styles from "./playlist-card-m-c.module.css";
import SONGLIST from '../../data/songs.json'

function PlaylistCardM(props) {
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		if (props.trackData.isCustom == 'false' && props.trackData.canSkip == 'false') {
			setIsthisPlay(parseInt(SONGLIST.indexOf(props.data)) === props.trackData.trackKey[0])
			}
	})

	console.log(props.trackData.trackKey)

	const link = "duckmusic:" + props.data.songName.toLowerCase().split(' ').join("").split('?').join("") + props.data.songArtist.toLowerCase().split(' ').join("").split('?').join("");

	return (
		<div className={styles.PlaylistCardSBox}>
			<Link to={`/${link}`}>
				<FadeIn visible="true" delay="100" className={styles.PlaylistCardS}>
					<div className={styles.ImgBox}>
						<img src={props.data.songimg} alt={props.data.title} />
						<div 
				onClick={() => props.songTrack([parseInt(SONGLIST.indexOf(props.data))])} 
				className={`${styles.IconBox} ${isthisplay&&props.isPlaying ? styles.ActiveIconBox : ''}`}
			>
				<PlayButton isthisplay={isthisplay} />
			</div>
					</div>
					<div className={styles.Title}>
						<TextBoldL>{props.data.songName}</TextBoldL>
						<TextRegularM>{props.data.songArtist}</TextRegularM>
					</div>
				</FadeIn>
			</Link>			
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
		isPlaying: state.isPlaying
	};
};
  
export default connect(mapStateToProps, { songTrack })(PlaylistCardM);
