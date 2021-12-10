import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { changeTrack } from '../../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';
import FadeIn from 'react-fade-in';
import styles from "./playlist-card-m.module.css";

function PlaylistCardM(props) {
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		setIsthisPlay(parseInt(props.data.index) === props.trackData.trackKey[0])
	})
	console.log(props.playlistData[0].index);

	return (
		<div className={styles.PlaylistCardSBox}>
			<Link to={`/playlist/${props.data.link}`}>
				<FadeIn visible="true" delay="100" className={styles.PlaylistCardS}>
					<div className={styles.ImgBox}>
						<img src={props.data.imgUrl} alt={props.data.title} />
					</div>
					<div className={styles.Title}>
						<TextBoldL>{props.data.title}</TextBoldL>
						<TextRegularM>{props.data.artist}</TextRegularM>
					</div>
				</FadeIn>
			</Link>
			<div 
				onClick={() => {
					props.changeTrack([props.playlistData[0].index, props.playlistData[0].n]); { setIsthisPlay(true) }
				}}
				className={`${styles.IconBox} ${isthisplay&&props.isPlaying ? styles.ActiveIconBox : ''}`}
			>
				<PlayButton isthisplay={isthisplay} />
			</div>
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
