import PrevPageBtn from '../buttons/prev-page-button';
import NextPageBtn from '../buttons/next-page-button';
import SearchBox from './search-box';
import { useParams } from 'react-router';
import LibraryTabBtn from './library-tab-btn';
import { NavLink, useLocation, Link } from "react-router-dom";
import styles from './topnav.module.css';
import CONST from '../../constants/index';
import useWindowSize from '../../hooks/useWindowSize';
import { useHistory } from "react-router-dom";
import PLAYLIST from '../../data/index.json';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import * as Icons from '../icons';


function Topnav({ search = false, tabButtons = false, normal = false, playlist = false, back = false, pl }, props) {
	const size = useWindowSize();
	let history = useHistory();
	const { path } = useParams();

	function open() {
		document.documentElement.style.setProperty('--dispopen', 'block');
    }
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

    return (
		<nav className={styles.Topnav}>
			{sus ?
                    <div
                        className="menu fx"
                    >
                        <div className="blur" />
                        <div>
                            <button className="menuitem" onClick={() => {history.push("/logout")}}><Icons.LogOut />Wyloguj się</button>
                        </div>           
                    </div>
                 : ''}	
			{normal ?
				<div className={styles.btn12}>
					{size.width > CONST.MOBILE_SIZE &&
						<span>
								<span>
                    <PrevPageBtn />
							<NextPageBtn />
							{tabButtons ? <LibraryTabBtn /> : ''}
						</span>
						<span>
							{ navigator.onLine == false ?
						<svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>Nie masz połączenia z internetem. Duck Music działa lepiej kiedy jesteś online</title><path fill='#fff' d="M448,464a15.92,15.92,0,0,1-11.31-4.69l-384-384A16,16,0,0,1,75.31,52.69l384,384A16,16,0,0,1,448,464Z"/><path fill='#5b88e1' d="M38.72,196.78C13.39,219.88,0,251.42,0,288c0,36,14.38,68.88,40.49,92.59C65.64,403.43,99.56,416,136,416H328.8a8,8,0,0,0,5.66-13.66L100.88,168.76a8,8,0,0,0-8-2C72,173.15,53.4,183.38,38.72,196.78Z"/><path fill='#5b88e1' d="M476.59,391.23C499.76,372.78,512,345.39,512,312c0-57.57-42-90.58-87.56-100.75a16,16,0,0,1-12.12-12.39c-7.68-36.68-24.45-68.15-49.18-92A153.57,153.57,0,0,0,256,64c-31.12,0-60.12,9-84.62,26.1a8,8,0,0,0-1.14,12.26L461.68,393.8a8,8,0,0,0,10.2.93Q474.31,393.05,476.59,391.23Z"/></svg>
						: ''		
					}
							<button onContextMenu={(e) => {handleContextMenu(e)}} onClick={() => { history.push("/profile") }} className={styles.ProfileBtn}>
								{localStorage.getItem('name')}
							</button>						
						</span>
						</span>

							}
                    {size.width < CONST.MOBILE_SIZE &&
                        <Link to="/settings" >
                            <button className={styles.btn}>

                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
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
                            </button>
                        </Link>

                            } </div> : ''}
					{size.width < CONST.MOBILE_SIZE &&
				playlist ?
				<div className={styles.playl}>
							<button className={styles.btn} onClick={() => {
								history.goBack();
							}}>
								<svg width="50px" height="40px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" /></svg>
						</button>
						{PLAYLIST.map((item) => {
							if (item.link == path) {
								return (
									<h3>{item.title}</h3>
								);
							}
						})}
					<button className={styles.btn} onClick={() => { open() }}>

							<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff" class="bi bi-three-dots-vertical">
								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
							</svg>

						</button>
					</div>
			: '' 

			}
			{size.width < CONST.MOBILE_SIZE &&
				back ?
				<div>
					<button className={styles.btn} onClick={() => {
						history.goBack();
					}}>
						<svg width="50px" height="40px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" /></svg>
					</button>
				</div>
				: ''

			}
                    {search ? <SearchBox /> : ''}
                    {tabButtons ? <LibraryTabBtn /> : ''}                   
      </nav>
    );
}


const mapStateToProps = (state) => {
	return {
		trackData: state.trackData,
		isPlaying: state.isPlaying
	};
};
  
export default Topnav;