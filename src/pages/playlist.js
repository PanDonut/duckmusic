import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { changeTrack } from '../actions';
import react from 'react';
import Topnav from '../component/topnav/topnav';
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from '../component/buttons/play-button';
import LinkButton from '../component/buttons/link-button';
import EmbedButton from '../component/buttons/embed-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/playlist-details';
import PlaylistTrack from '../component/playlist/playlist-track';
import * as Icons from '../component/icons';
import { PLAYLIST } from "../data/index";

import { decode } from 'he';

import Footer from '../component/footer/footer';
import Modal from 'react-responsive-modal-scroll/lib/css';
import './react-responsive-modal.css';
import styles from './playlist.module.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from "copy-to-clipboard";

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

function PlaylistPage(props) {
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
		<div className={styles.PlaylistPage}>
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
			<div className={styles.Bg}></div>

			<Topnav />

			{PLAYLIST.map((item) => {
                if(item.link == path){
                    return (
                        <div key={item.title} onLoad={() => {
							changeBg(item.playlistBg);
							setPlaylistIndex(PLAYLIST.indexOf(item))
						}}>

							<PlaylistDetails data={item} />

							<div className={styles.GridIcons}>
							<div className={styles.PlaylistIcons}>
								<button
									onClick={() => props.changeTrack([PLAYLIST.indexOf(item), 0])} 
								>
									<PlayButton isthisplay={isthisplay}/>
								</button>
							</div>
							<div className={styles.PlaylistIcons1}>
							<button
								onClick={() => {copy(link11); {notify();}}}
							>
								<LinkButton/>
							</button>
							<button
								onClick={() => setOpen(true)}
							>
								<EmbedButton/>
							</button>
									<Modal open={open} onClose={() => setOpen(false)}>
										<div className={styles.pop}>
											<button onClick={() => { copy(embed11); { notifyembed(); { setOpen(false); }} }}>
												{decode("Zwyk&#322;y embed")}
											</button>
											<button onClick={() => { copy(embed111); { notifyembed(); { setOpen(false); }} }}>
												{decode("Ma&#322;y embed")}
											</button>
											</div>
									</Modal>
							</div>
							</div>

							<div className={styles.ListHead}>
								<TextRegularM></TextRegularM>
								<TextRegularM>UTWORY</TextRegularM>
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
  
export default connect(mapStateToProps, { changeTrack })(PlaylistPage);