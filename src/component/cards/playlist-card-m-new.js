import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { changeTrack } from '../../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';

import FadeIn from 'react-fade-in';

import styles from "./playlist-card-m-new.module.css";

function PlaylistCardM(props) {
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		setIsthisPlay(parseInt(props.data.index) === props.trackData.trackKey[0])
	})

	return (
		<div className={styles.PlaylistCardSBox}>
			<Link to={`/playlist/${props.data.link}`}>
				<FadeIn visible="true" delay="550" className={styles.PlaylistCardS}>
					<div className={styles.ImgBox}>
						<img src={props.data.imgUrl} alt={props.data.title} />
					</div>
					<FadeIn visible="true" delay="600" className={styles.Title}>
						<TextBoldL>{props.data.title}</TextBoldL>
						<TextRegularM>{props.data.type.toUpperCase()} <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 31.955 31.955" width="5px" height="5px">
							<circle cx="10" cy="1" r="6.117" />
						</svg>
 {props.data.artist}</TextRegularM>
					</FadeIn>
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
