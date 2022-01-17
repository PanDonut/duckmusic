import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { changeTrack, customTrack } from '../actions';
import react from 'react';
import { aut } from '../dauth';
import PlaylistCardM from '../component/cards/playlist-card-music';
import { getDatabase, ref, onValue, set } from "firebase/database";
import Topnav from '../component/topnav/topnav';
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from '../component/buttons/play-button';
import LinkButton from '../component/buttons/link-button1';
import AddButton from '../component/buttons/add-button';
import EmbedButton from '../component/buttons/embed-button';
import RemoveButton from '../component/buttons/remove-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/playlist-details-artist';
import PlaylistTrack from '../component/playlist/playlist-track-music';
import * as Icons from '../component/icons';
import { NavLink, useLocation, Link, useHistory } from "react-router-dom";
import { decode } from 'he';
import axios from 'axios';
import SONGLIST from '../data/songs.json'
import Footer from '../component/footer/footer';
import Modal from 'react-responsive-modal-scroll/lib/css';
import './react-responsive-modal.css';
import styles from './playlist.module.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from "copy-to-clipboard";
import { RemoveItem } from '../playlistcreator'
import Sidebar from '../component/sidebar/sidebar';
import lay from '../style/App.module.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import NotFound from './404';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import convertTime from '../functions/convertTimeTxt';
import FadeIn from 'react-fade-in';

function PlaylistPage(props) {

	const [loader, setLoadingState] = useState(true);
	const [PLAYLIST, setPLAYLIST] = useState(null);
	const db = getDatabase(aut);
	const url = `/artists.json`
	        if (PLAYLIST == null) {
            axios.get(url)
                .then(res => {
					document.documentElement.style.setProperty('--img-opacity', 0);
					setPLAYLIST(res.data);
					setLoadingState(false);
                })
				.catch(err => {
					setLoadingState(false);
				}
				)
			}
	

	const handleScroll = (e) => {
			document.documentElement.style.setProperty('--img-opacity', ((e.target.scrollTop / 300)));
	}

	const size = useWindowSize();
	const [playlistIndex, setPlaylistIndex] = useState(undefined);
	const [isthisplay, setIsthisPlay] = useState(false);
	const { path } = useParams();
	const history = useHistory();
	function changeBg(color) {
		document.documentElement.style.setProperty('--bg', color);
	}

	useEffect(() => {
		setIsthisPlay(playlistIndex === props.trackData.trackKey[0])
	})
	


	oncontextmenu = function (e) {
		e.preventDefault();
	};
	const notify = () => toast.info("Skopiowano link!", {
		position: toast.POSITION.TOP_RIGHT
	});
	const notifyembed = () => toast.info("Skopiowano kod do umieszczenia na stronie!", {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: 5000
	});
	const [open, setOpen] = react.useState(false);
	var link11 = "https://duckmusic.vercel.app/embed/" + path;
	var embed11 = "<div id='embed-duckmusic-eFf56ch'>" + "\n <iframe class='embed-duckmusic-eFf56ch' src='" + "https://duckmusic.vercel.app/embed/" + path + "' frameBorder='0'></iframe>" + "\n <style>" + "\n .embed-duckmusic-eFf56ch {width: 100%;height: 100%;} #embed-duckmusic-eFf56ch {width: 400px;height: 600px;}" + "\n </style>" + "\n </div>";
	var embed111 = "<div id='embed-duckmusic-eFf56ch'>" + "\n <iframe class='embed-duckmusic-eFf56ch' src='" + "https://duckmusic.vercel.app/embed-small/" + path + "' frameBorder='0'></iframe>" + "\n <style>" + "\n .embed-duckmusic-eFf56ch {width: 100%;height: 100%;} #embed-duckmusic-eFf56ch {width: 400px;height: 600px;}" + "\n </style>" + "\n </div>";
	return (
		<div className={lay.layout}>
			{loader == true ?
                <div className={styles.wrapper}>
                    <div className={styles.loader} id={styles.loader} />
                </div>
                : ''
            }
			{size.width > CONST.MOBILE_SIZE
				? <Sidebar />
				: <MobileNavigation />
			}
			<div className={styles.PlaylistPage} onScroll={handleScroll}>
				<ToastContainer
					position="bottom-center"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover				/>
			<div className={styles.gradientBg}></div>
				<div className={styles.gradientBgSoft}></div>
				<div className={styles.bbg}></div>
			<div className={styles.Bg}></div>
				{size.width < CONST.MOBILE_SIZE ?
					<Topnav playlist={true} pl={PLAYLIST} />
					: <Topnav normal={true}/>}

				{PLAYLIST != null && navigator.onLine ?
					PLAYLIST.map((item) => {
						if (item.name.toLowerCase().split(" ").join("-") == path) {
							return (
								<div key={item.title} className={styles.sus} onLoad={() => {
									changeBg(item.bg);
									setPlaylistIndex(PLAYLIST.indexOf(item));
								}}>
								

									<PlaylistDetails data={item} />
									<div className={styles.imgbg}></div>
									<div className={styles.GridIcons1}>

									</div>

									<div className={styles.ListHead}>
										<TextRegularM></TextRegularM>
										<TextRegularM>UTWORY</TextRegularM>
									</div>

									<FadeIn visible="true" delay="50" className={styles.PlaylistSongs}>
										{SONGLIST.filter(sng => sng.songArtist == item.name || sng.songArtist.includes(item.name)).map((song) => {
											const link = "/duckmusic:" + song.songName.toLowerCase().split(' ').join("").split('?').join("") + song.songArtist.toLowerCase().split(' ').join("").split('?').join("");
											return (
												<button
											key={song.songindex}
											onClick={() => history.push(link)}
											className={styles.SongBtn}
										>
													<PlaylistTrack
														data={{
															listType: item.type,
															sin: song.index,
															song: SONGLIST[SONGLIST.indexOf(song)]
														}}
													/>
										</button>
											);
										})}
									</FadeIn>
								</div>
							);
						}
					} 
					) : <div className={styles.notexist}>	
					<div>	
					<h1>Nie możemy tego znaleźć</h1>
					<h4 onClick={() => {history.goBack()}}>Wróć do poprzedniej strony</h4>
					</div>
					</div>}
					<div className={styles.notexist}>	
							<div>	
							<h1>Nie możemy tego znaleźć</h1>
							<h4 onClick={() => {history.goBack()}}>Wróć do poprzedniej strony</h4>
							</div>
							</div>
			</div>
		</div>
	);
}



const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
	};
};
  
export default connect(mapStateToProps, { changeTrack, customTrack })(PlaylistPage);
