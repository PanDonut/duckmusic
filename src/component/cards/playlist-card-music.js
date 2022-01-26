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
import { useCallback } from "react";
import * as Icons from '../icons/index';
import { changePlay } from "../../actions";

function PlaylistCardM(props) {
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		if (props.trackData.isCustom == 'false' && props.trackData.canSkip == 'false') {
			setIsthisPlay(parseInt(SONGLIST.indexOf(props.data)) === props.trackData.trackKey[0])
			}
	})
	const [sus, setSus] = useState(false);
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setSus(true);
        },
        [setAnchorPoint]
    );

	const handleClick = useCallback(() => (sus ? setSus(false) : null), [sus]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleClick);
        };
    });


	

	console.log(props.trackData.trackKey)

	const link = "duckmusic:" + props.data.songName.toLowerCase().split(' ').join("").split('?').join("") + props.data.songArtist.toLowerCase().split(' ').join("").split('?').join("");

	return (
		<div className={styles.PlaylistCardSBox} onContextMenu={() => {setSus(true)}}>
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
			{sus ?
                    <div
                        className="menu"
                        style={{
                            top: anchorPoint.y,
                            left: anchorPoint.x
                        }}
                    >
                        <div className="blur" />
                        <div>
                            <button className="menuitem" onClick={() => {props.songTrack([parseInt(SONGLIST.indexOf(props.data))]); props.changePlay(true)}}><Icons.Play />Odtwórz</button>
                        </div>   
						<br/>
						<div>
                            <button className="menuitem" onClick={() => {navigator.clipboard.writeText(SONGLIST.indexOf(props.data));}}><Icons.Copy />Kopiuj ID</button>
                        </div>         
                    </div>
                 : ''}		
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
		isPlaying: state.isPlaying
	};
};
  
export default connect(mapStateToProps, { songTrack, changePlay })(PlaylistCardM);
