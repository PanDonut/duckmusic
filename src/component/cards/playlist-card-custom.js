import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { changeTrack, customTrack } from '../../actions';
import { Link, useHistory } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';
import FadeIn from 'react-fade-in';
import styles from "./playlist-card-m.module.css";
import SONGS from '../../data/songs.json';

function PlaylistCardM(props) {
	const history = useHistory();
	const[isthisplay, setIsthisPlay] = useState(false)


	console.log(props.trackData.isCustom)

	return (
		<div className={styles.PlaylistCardSBox}>
			<Link to={`/myplaylist/${props.data.link}`}>
				<FadeIn visible="true" delay="100" className={styles.PlaylistCardS}>
					<div className={styles.ImgBox}>
						<img src={SONGS[props.data.playlistData[0].songindex].songimg} alt={props.data.title} />
						<div 
				onClick={() => history.push(`/myplaylist/${props.data.link}`)} 
				className={`${styles.IconBox} ${isthisplay&&props.isPlaying ? styles.ActiveIconBox : ''}`}
			><PlayButton isthisplay={isthisplay} /></div>
					</div>
					<div className={styles.Title}>
						<TextBoldL>{props.data.title}</TextBoldL>
						<TextRegularM> </TextRegularM>
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
  
export default connect(mapStateToProps, { changeTrack })(PlaylistCardM);
