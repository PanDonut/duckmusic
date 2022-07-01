import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { changeTrack, customTrack } from '../../actions';
import { Link, useHistory } from "react-router-dom";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';
import div from 'react-fade-in';
import styles from "./playlist-card-m.module.css";
import SONGS from '../../data/songs.json';

function PlaylistCardM(props) {
	const [loaded, setLoad] = useState(false);
	const history = useHistory();
	const[isthisplay, setIsthisPlay] = useState(false)


	return (
		<div className={styles.PlaylistCardSBox}>
			<Link to={`/library/myplaylist/${props.data.link}`}>
				<div visible="true" delay="100" className={styles.PlaylistCardS}>
					<div className={`${styles.ImgBox} ${props.data.playlistData.length >= 4 ? styles.gridImg : ''} ${loaded == true ? '' : styles.loader}`}>
						{ props.data.playlistData.length < 4 ?
						<img onLoad={() => {setLoad(true)}} src={props.data.playlistData[0] != undefined ? SONGS[props.data.playlistData[0].songindex].songimg : "https://firebasestorage.googleapis.com/v0/b/duck-auth.appspot.com/o/no.png?alt=media&token=b23a34e3-5ea9-4c32-bc04-19c0c05c99cd"} alt={props.data.title} />
						:
						<img src={SONGS[props.data.playlistData[0].songindex].songimg} alt={props.data.title} />
						}
						{ props.data.playlistData.length >= 4 ?
						<img src={SONGS[props.data.playlistData[1].songindex].songimg} alt={props.data.title} />
						:
						''
						}
						{ props.data.playlistData.length >= 4 ?
						<img src={SONGS[props.data.playlistData[2].songindex].songimg} alt={props.data.title} />
						:
						''
						}
						{ props.data.playlistData.length >= 4 ?
						<img onLoad={() => {setLoad(true)}} src={SONGS[props.data.playlistData[3].songindex].songimg} alt={props.data.title} />
						:
						''
						}
					</div>
					<div className={`${styles.Title} ${loaded == true ? '' : styles.loader}`}>
						<TextBoldL>{props.data.title}</TextBoldL>
						<TextRegularM>{localStorage.getItem('name')}</TextRegularM>
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
