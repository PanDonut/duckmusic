import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { changeTrack, songTrack } from '../actions';
import react from 'react';
import Topnav from '../component/topnav/topnav';
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from '../component/buttons/play-button';
import LinkButton from '../component/buttons/link-button';
import EmbedButton from '../component/buttons/embed-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/playlist-details1';
import PlaylistTrack from '../component/playlist/playlist-track';
import AddButton from '../component/buttons/add-button';
import * as Icons from '../component/icons';
import PLAYLIST from "../data/index.json";
import { NavLink, useLocation, Link } from "react-router-dom";
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
import { AddToPlaylist } from '../playlistcreator';
import Sidebar from '../component/sidebar/sidebar';
import lay from '../style/App.module.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import NotFound from './404';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { aut } from '../dauth';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import convertTime from '../functions/convertTimeTxt';
import FadeIn from 'react-fade-in';

function PlaylistPage(props) {

	
	const [PLAYLISTC, setPLAYLIST] = useState(null);
	const db = getDatabase(aut);
	const nameRef = ref(db, 'users/' + localStorage.getItem('email').split('.').join("") + '/duckmusic/playlist');
	onValue(nameRef, (snapshot) => {
		const data = snapshot.val();
		if (PLAYLISTC == null) {
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


	const [sho, setSho] = useState(false);
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
					<Topnav playlist={true} />
					: <Topnav normal={true}/>}

				{SONGLIST.map((item) => {
					if (path == (item.songName.toLowerCase().split(' ').join("").split('?').join("") + item.songArtist.toLowerCase().split(' ').join("").split('?').join(""))) {
					
                    return (
                        <div key={item.songName} onLoad={() => {
							changeBg('rgb(100, 100, 100)');														
						}}>
							{sho == true ?
								<div className={styles.selectoverlay}>
									<div className={styles.flexselect}>
									{PLAYLISTC != null ?
										PLAYLISTC.map((list) => {
											return (
												<div className={styles.listitem} onClick={() => { AddToPlaylist(SONGLIST.indexOf(item), PLAYLISTC.indexOf(list)); { setSho(false); } }}>
													<p>{list.title}</p>
											</div>
											)
										}) : ''}
										<div className={styles.listitem} onClick={() => { { setSho(false); } }}>
											<p>Anuluj</p>
										</div>
									</div>									
								</div>
								: ''
                            }
							{size.width < CONST.MOBILE_SIZE &&
								<div className={styles.overlay}>
									<PlaylistDetails data={item} />
									<div className={styles.ovlist}>
										<button className={styles.btn} onClick={() => { setSho(true) }}>


											<AddButton />
											<h2>Dodaj do playlisty</h2>
										</button>
									</div>
								</div>
							}

							<PlaylistDetails data={item}/>
							<div className={styles.GridIcons}>

								{size.width > CONST.MOBILE_SIZE &&
									<div className={styles.PlaylistIcons}>

										<button
											onClick={() => props.songTrack([SONGLIST.indexOf(item), 0])}
										>
											<PlayButton isthisplay={isthisplay} />
										</button>


										
									</div>
								}
								{size.width < CONST.MOBILE_SIZE &&
									<button onClick={() => props.songTrack([SONGLIST.indexOf(item), 0])}>
										Słuchaj
									</button>
								}
								{size.width > CONST.MOBILE_SIZE &&
									<div className={styles.PlaylistIcons1}>
										<button
											onClick={() => { setSho(true) }}
										>
											<AddButton />
										</button>
									</div>
								}
								
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
  
export default connect(mapStateToProps, { changeTrack, songTrack })(PlaylistPage);
