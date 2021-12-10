import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { changeTrack } from '../actions';
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from '../component/buttons/play-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/embed-details';
import PlaylistTrack from '../component/playlist/embed-track';
import * as Icons from '../component/icons';
import PLAYLIST from "../data/index";
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import Home from './home';
import Search from './search';
import Library from './library';
import PlaylistPage from './playlist';
import Embed from './embed';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import styles from './embed.module.css';
import lay from '../style/lay.module.css';
import App from '../App.js';



function EmbedPage(props) {

	const size = useWindowSize();
	const[playlistIndex, setPlaylistIndex] = useState(undefined);
	const[isthisplay, setIsthisPlay] = useState(false);
	const { path } = useParams();

	function changeBg(color){
		document.documentElement.style.setProperty('--hover-home-bg', color);
	}

	useEffect(() => {
		setIsthisPlay(playlistIndex === props.trackData.trackKey[0])
	})

	oncontextmenu = function (e) {
		e.preventDefault();
	};

	return (
		<div className={lay.layout}>
		<div className={styles.PlaylistPage}>
			<div className={styles.gradientBg}></div>
            <div className={styles.gradientBgSoft}></div>
			<div className={styles.Bg}></div>


			{PLAYLIST.map((item) => {
                if(item.link == path){
                    return (
                        <div key={item.title} onLoad={() => {
							changeBg(item.playlistBg);
							setPlaylistIndex(PLAYLIST.indexOf(item))
						}}>

							<PlaylistDetails data={item} />

							<div className={styles.PlaylistIcons}>
								<button
									onClick={() => props.changeTrack([PLAYLIST.indexOf(item), 0])} 
								>
									<PlayButton isthisplay={isthisplay}/>
								</button>
							</div>

							<div className={styles.ListHead}>
								<TextRegularM></TextRegularM>
								<TextRegularM>SONGS</TextRegularM>
							</div>

							<div className={styles.PlaylistSongs}>
								{item.playlistData.map((song) => {
									return (
										<button 
											key={song.index} 
											onClick={() => props.changeTrack([PLAYLIST.indexOf(item), item.playlistData.indexOf(song)])} 
											className={styles.SongBtn}
										>
											<PlaylistTrack 
												data={{
													listType: item.type,
													song: song
												}}
											/>
										</button>
									);
								})}
							</div>
                        </div>
                    );
                }
			})}
			</div>
			</div>
	);
}



const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
	};
};
  
export default connect(mapStateToProps, { changeTrack })(EmbedPage);