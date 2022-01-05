import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { changeTrack, customTrack } from '../actions';
import react from 'react';
import { aut } from '../dauth';
import { getDatabase, ref, onValue, set } from "firebase/database";
import Topnav from '../component/topnav/topnav';
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from '../component/buttons/play-button';
import LinkButton from '../component/buttons/link-button1';
import AddButton from '../component/buttons/add-button';
import EmbedButton from '../component/buttons/embed-button';
import RemoveButton from '../component/buttons/remove-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/playlist-details-c';
import PlaylistTrack from '../component/playlist/playlist-track-custom';
import * as Icons from '../component/icons';
import { NavLink, useLocation, Link, useHistory } from "react-router-dom";
import { decode } from 'he';
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

	const [PLAYLIST, setPLAYLIST] = useState(null);
	const db = getDatabase(aut);
	const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
	const nameRef1 = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/liked');
    onValue(nameRef1, (snapshot) => {
        const data = snapshot.val();
            if (data != null || data != undefined) {
                setPLAYLIST(JSON.parse(data));			
            }
    });
	

	const handleScroll = (e) => {
		if (Math.round(e.target.scrollTop) > 227) {
			document.documentElement.style.setProperty('--playbg', 'linear-gradient(180deg, rgba(11,11,11,1) 0%, rgba(11,11,11,1) 37%, rgba(11,11,11,0.8018557764902836) 78%, rgba(11,11,11,0.5553571770505077) 89%, rgba(11,11,11,0) 100%)');
		} else {
			document.documentElement.style.setProperty('--playbg', 'linear-gradient(180deg, rgba(0,0,0,0.47692580450148814) 0%, rgba(0,0,0,0.4) 37%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0.1) 89%, rgba(0,0,0,0) 100%)');
        }
	}

	const size = useWindowSize();
	const [playlistIndex, setPlaylistIndex] = useState(undefined);
	const [isthisplay, setIsthisPlay] = useState(false);
	const { path } = useParams();
	const history = useHistory();
	function changeBg(color) {
		document.documentElement.style.setProperty('--hover-home-bg', color);
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

				{PLAYLIST != null ?
					PLAYLIST.map((item) => {
							return (
								<div key={item.title}>
									{size.width < CONST.MOBILE_SIZE &&
										<div className={styles.overlay}>
											<PlaylistDetails data={item} />
											<div className={styles.ovlist}>
												<Link to="/settings" >
													<button className={styles.btn}>

														<svg width="50px" height="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 489.8 489.8">
															<path d="M343.45,71.8c-14.4-8.2-29.7-14.6-45.7-19V36.5c0-20.1-16.4-36.5-36.5-36.5h-32.5c-20.1,0-36.5,16.4-36.5,36.5v16.3
				c-16,4.4-31.3,10.7-45.7,19l-11.6-11.5c-6.9-6.9-16.1-10.7-25.8-10.7s-18.9,3.8-25.8,10.7l-23,23c-6.9,6.9-10.7,16.1-10.7,25.8
				s3.8,18.9,10.7,25.8l11.5,11.5c-8.2,14.4-14.6,29.7-19,45.7h-16.3c-20.1,0-36.5,16.4-36.5,36.5v32.5c0,20.1,16.4,36.5,36.5,36.5
				h16.3c4.4,16,10.7,31.3,19,45.7l-11.5,11.6c-14.2,14.2-14.2,37.4,0,51.6l23,23c6.9,6.9,16.1,10.7,25.8,10.7s18.9-3.8,25.8-10.7
				l11.5-11.5c14.4,8.2,29.7,14.6,45.7,19v16.3c0,20.1,16.4,36.5,36.5,36.5h32.5c20.1,0,36.5-16.4,36.5-36.5V437
				c16-4.4,31.3-10.7,45.7-19l11.5,11.5c6.9,6.9,16.1,10.7,25.8,10.7s18.9-3.8,25.8-10.7l23-23c14.2-14.2,14.2-37.4,0-51.6
				l-11.5-11.5c8.2-14.4,14.6-29.7,19-45.7h16.3c20.1,0,36.5-16.4,36.5-36.5v-32.5c0-20.1-16.4-36.5-36.5-36.5h-16.3
				c-4.4-16-10.7-31.3-19-45.7l11.5-11.5c14.2-14.2,14.2-37.4,0-51.6l-23-23c-6.9-6.9-16.1-10.7-25.8-10.7s-18.9,3.8-25.8,10.7
				L343.45,71.8z M379.25,84.5c0.9-0.9,2.2-0.9,3.1,0l23,23c0.9,0.9,0.9,2.2,0,3.1l-21.1,21.1c-5.8,5.8-6.7,14.9-2.1,21.7
				c12.1,18,20.3,38,24.5,59.2c1.6,8,8.6,13.8,16.8,13.8h29.9c1.2,0,2.2,1,2.2,2.2v32.5c0,1.2-1,2.2-2.2,2.2h-29.9
				c-8.2,0-15.2,5.8-16.8,13.8c-4.2,21.3-12.5,41.2-24.5,59.2c-4.6,6.8-3.7,15.9,2.1,21.7l21.1,21.1c0.9,0.9,0.9,2.2,0,3.1l-23,23
				c-0.8,0.9-2.2,0.8-3.1,0l-21.1-21.1c-5.8-5.8-14.9-6.7-21.7-2.1c-18.1,12.1-38,20.3-59.2,24.5c-8,1.6-13.8,8.6-13.8,16.8v29.9
				c0,1.2-1,2.2-2.2,2.2h-32.5c-1.2,0-2.2-1-2.2-2.2v-29.9c0-8.2-5.8-15.2-13.8-16.8c-21.2-4.2-41.2-12.5-59.2-24.5
				c-2.9-1.9-6.2-2.9-9.5-2.9c-4.4,0-8.8,1.7-12.1,5l-21.1,21.1c-0.9,0.9-2.2,0.9-3.1,0l-23-23c-0.9-0.9-0.9-2.2,0-3.1l21.1-21.1
				c5.8-5.8,6.7-14.9,2.1-21.7c-12.1-18.1-20.3-38-24.5-59.2c-1.6-8-8.6-13.8-16.8-13.8h-30.1c-1.2,0-2.2-1-2.2-2.2v-32.5
				c0-1.2,1-2.2,2.2-2.2h29.9c8.2,0,15.2-5.8,16.8-13.8c4.2-21.2,12.5-41.2,24.5-59.2c4.5-6.8,3.7-15.9-2.1-21.7l-21.1-21.1
				c-0.4-0.4-0.6-0.9-0.6-1.6c0-0.6,0.2-1.1,0.6-1.5l23-23c0.9-0.9,2.2-0.9,3.1,0l21.1,21.1c5.8,5.8,14.9,6.7,21.7,2.1
				c18.1-12.1,38-20.3,59.2-24.5c8-1.6,13.8-8.6,13.8-16.8V36.5c0-1.2,1-2.2,2.2-2.2h32.5c1.2,0,2.2,1,2.2,2.2v29.9
				c0,8.2,5.8,15.2,13.8,16.8c21.2,4.2,41.2,12.5,59.2,24.5c6.8,4.5,15.9,3.7,21.7-2.1L379.25,84.5z"/>
															<path d="M244.95,145.3c-54.9,0-99.6,44.7-99.6,99.6s44.7,99.6,99.6,99.6s99.6-44.7,99.6-99.6S299.85,145.3,244.95,145.3z
				 M244.95,310.2c-36,0-65.3-29.3-65.3-65.3s29.3-65.3,65.3-65.3s65.3,29.3,65.3,65.3S280.95,310.2,244.95,310.2z"/>
														</svg>
														<h2>Ustawienia</h2>
													</button>
												</Link>
											<button className={styles.btn} onClick={() => {
												var json_string = JSON.stringify(item, undefined, 2);
												var link = document.createElement('a');
												link.download = 'dm_mobilegen_' + item.index.substring(0,6) + '.json';
												var blob = new Blob([json_string], { type: 'text/plain' });
												link.href = window.URL.createObjectURL(blob);
												link.click();
											}
											}>

													
													<LinkButton/>
													<h2>Pobierz</h2>
											</button>
											<button className={styles.btn} onClick={() => { RemoveItem(PLAYLIST.indexOf(item)); {history.push('/library')}}}>


												<RemoveButton />
												<h2>Usuń playlistę</h2>
											</button>
											</div>
										</div>
									}

									<PlaylistDetails data={item} />
									<div className={styles.GridIcons}>
										{size.width > CONST.MOBILE_SIZE &&
											<div className={styles.PlaylistIcons}>

												<button
													onClick={() => props.customTrack([PLAYLIST.indexOf(item), 0])}
												>
													<PlayButton isthisplay={isthisplay} />
												</button>



											</div>
										}
										{size.width < CONST.MOBILE_SIZE &&
											<button onClick={() => props.customTrack([PLAYLIST.indexOf(item), 0])}>
												Słuchaj
											</button>
										}
										{size.width > CONST.MOBILE_SIZE &&
											<div className={styles.PlaylistIcons1}>
													<button
														onClick={() => {
															var json_string = JSON.stringify(item, undefined, 2);
															var link = document.createElement('a');
															link.download = 'dm_generated_' + item.index + '.json';
															var blob = new Blob([json_string], { type: 'text/plain' });
															link.href = window.URL.createObjectURL(blob);
															link.click();
														}
														}
													>
														<LinkButton />
													</button>
											<button
												onClick={() => { RemoveItem(PLAYLIST.indexOf(item)); { history.push('/library') } }}
											>
												<RemoveButton />
											</button>
											</div>
										}
									</div>

									<div className={styles.ListHead}>
										<TextRegularM></TextRegularM>
										<TextRegularM>UTWORY</TextRegularM>
									</div>

									<FadeIn visible="true" delay="50" className={styles.PlaylistSongs}>
										{item.playlistData.map((song) => {
											return (
												<button
													key={song.songindex}
													onClick={() => props.customTrack([PLAYLIST.indexOf(item), item.playlistData.indexOf(song)])}
													className={styles.SongBtn}
												>
													<PlaylistTrack
														data={{
															listType: item.type,
															sin: song.index,
															song: SONGLIST[song.songindex],
															sing: item,
															ind: song
														}}
													/>
												</button>
											);
										})}
									</FadeIn>
								</div>
							);
						}					 
					) : ''}
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
