import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { changeTrack } from '../../actions';
import { Link } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';

import div from 'react-fade-in';

import styles from "./playlist-card-m-new.module.css";

function PlaylistCardM(props) {
	const [loaded, setLoad] = useState(false);
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		setIsthisPlay(parseInt(props.data.index) === props.trackData.trackKey[0])
	})

	return (
		<div className={styles.PlaylistCardSBox}>
			<Link to={`/playlist/${props.data.link}`}>
				<div visible="true" delay="550" className={styles.PlaylistCardS}>
					<div className={`${styles.ImgBox} ${loaded == true ? '' : styles.loader}`}>
						<img onLoad={() => {setLoad(true)}} src={props.data.imgUrl} alt={props.data.title} />
					</div>
					<div className={`${styles.Title} ${loaded == true ? '' : styles.loader}`}>
						<TextBoldL>{props.data.title}</TextBoldL>
					</div>
				</div>
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
