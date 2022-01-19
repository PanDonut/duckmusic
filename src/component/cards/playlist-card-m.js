import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { changeTrack } from '../../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';
import FadeIn from 'react-fade-in';
import styles from "./playlist-card-m.module.css";
import PLAYLIST from '../../data/index.json'

function PlaylistCardM(props) {
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		if (props.trackData.isCustom == 'false' && props.trackData.canSkip == 'true') {
		setIsthisPlay(parseInt(props.data.index) === props.trackData.trackKey[0])
		}
	})

	return (
		<div className={styles.PlaylistCardSBox}>
			<Link to={`/playlist/${props.data.link}`}>
				<FadeIn visible="true" delay="100" className={styles.PlaylistCardS}>
					<div className={styles.ImgBox}>
						<img src={props.data.imgUrl} alt={props.data.title} />
						<div 
				onClick={() => props.changeTrack([PLAYLIST.indexOf(props.data), 0])} 
				className={`${styles.IconBox} ${isthisplay&&props.isPlaying ? styles.ActiveIconBox : ''}`}
			><PlayButton isthisplay={isthisplay} /></div>
					</div>
					<div className={styles.Title}>
						<TextBoldL>{props.data.title}</TextBoldL>
						<TextRegularM>{props.data.artist}</TextRegularM>
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
