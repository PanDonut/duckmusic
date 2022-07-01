import useMousePosition from '../../hooks/useMousePosition';
import {Logo, Settings} from '../icons';
import Playlist from './playlist';
import Navigation from './navigation'
import React from 'react'
import { NavLink, useLocation, Link } from "react-router-dom";
import { MENU } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import { useHistory } from 'react-router';
import styles from './sidebar.module.css';
import { useEffect, useState } from 'react';


function Sidebar() {
    const history = useHistory();
    const location = useLocation();
  const[width, SetWidth] = useState(236);
  const [isMouseDown, setisMouseDown] = useState(false);
  const { x } = useMousePosition();


    useEffect(() => {
      if (!isMouseDown) return false;
  
      const handleMove = () => {
        if(x > 157 && x < 516){
          SetWidth(x);
        }
      };
  
      const handleUp = () => {
        setisMouseDown(false);
      };
  
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };
    });

    return (
      <>    
        <nav className={styles.SideNavbar}>
          <div>
              <div className='Avatar'>
                { localStorage.getItem('emaildm') != null ?
                <img src={`https://firebasestorage.googleapis.com/v0/b/duck-auth.appspot.com/o/users%2F${localStorage.getItem('emaildm').replaceAll(
                      ".",
                      ""
                    )}%2Fprofile.png?alt=media`} />
                    :
                    ''
                }
                    {/* <h2><p>0</p></h2> */}
              </div>
              <Navigation />            
          </div>       
      </nav>
      <div className={styles.SideWide}>
        <h2 style={{color: `${window.location.pathname == "/" ? 'var(--akcent)' : 'var(--text-gray)'}`}}>ODKRYWAJ</h2>
        <h2 style={{color: `${window.location.pathname.includes("/activity") ? 'var(--akcent)' : 'var(--text-gray)'}`}}>JUŻ NIEDŁUGO</h2>
        <h2 style={{color: `${window.location.pathname.includes("/radio") ? 'var(--akcent)' : 'var(--text-gray)'}`}}>JUŻ NIEDŁUGO</h2>
        <h2 style={{color: `${window.location.pathname.includes("/library") ? 'var(--akcent)' : 'var(--text-gray)'}`}}>BIBLIOTEKA</h2>
        <div className='lib'>
          <h3 onClick={() => {history.push("/library/artists")}} style={{color: `${window.location.pathname.includes("/library/artists") ? 'var(--akcent)' : 'var(--text-gray)'}`}}><svg style={{stroke: `${window.location.pathname.includes("/library/artists") ? 'var(--akcent)' : 'var(--text-gray)'}`}} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Stroke 1" fill-rule="evenodd" clip-rule="evenodd" d="M11.8445 21.6618C8.15273 21.6618 5 21.0873 5 18.7865C5 16.4858 8.13273 14.3618 11.8445 14.3618C15.5364 14.3618 18.6891 16.4652 18.6891 18.766C18.6891 21.0658 15.5564 21.6618 11.8445 21.6618Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Stroke 3" fill-rule="evenodd" clip-rule="evenodd" d="M11.8372 11.1735C14.26 11.1735 16.2236 9.2099 16.2236 6.78718C16.2236 4.36445 14.26 2.3999 11.8372 2.3999C9.41452 2.3999 7.44998 4.36445 7.44998 6.78718C7.4418 9.20172 9.3918 11.1654 11.8063 11.1735C11.8172 11.1735 11.8272 11.1735 11.8372 11.1735Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
ARTYŚCI</h3>
          <h3 onClick={() => {history.push("/library/songs")}} style={{color: `${window.location.pathname.includes("/library/songs") ? 'var(--akcent)' : 'var(--text-gray)'}`}}><svg style={{fill: `${window.location.pathname.includes("/library/songs") ? 'var(--akcent)' : 'var(--text-gray)'}`}} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5,2.75 C11.5,2.22634895 12.0230228,1.86388952 12.5133347,2.04775015 L18.8913911,4.43943933 C20.1598961,4.91511241 21.0002742,6.1277638 21.0002742,7.48252202 L21.0002742,10.7513533 C21.0002742,11.2750044 20.4772513,11.6374638 19.9869395,11.4536032 L13,8.83332147 L13,17.5 C13,17.5545945 12.9941667,17.6078265 12.9830895,17.6591069 C12.9940859,17.7709636 13,17.884807 13,18 C13,20.2596863 10.7242052,22 8,22 C5.27579485,22 3,20.2596863 3,18 C3,15.7403137 5.27579485,14 8,14 C9.3521238,14 10.5937815,14.428727 11.5015337,15.1368931 L11.5,2.75 Z M8,15.5 C6.02978478,15.5 4.5,16.6698354 4.5,18 C4.5,19.3301646 6.02978478,20.5 8,20.5 C9.97021522,20.5 11.5,19.3301646 11.5,18 C11.5,16.6698354 9.97021522,15.5 8,15.5 Z M13,3.83223733 L13,7.23159672 L19.5002742,9.669116 L19.5002742,7.48252202 C19.5002742,6.75303682 19.0477629,6.10007069 18.3647217,5.84393903 L13,3.83223733 Z" id="🎨-Color"></path>
</svg>
UTWORY</h3>
          <h3 onClick={() => {history.push("/library/playlists")}} style={{color: `${window.location.pathname.includes("/library/playlists") ? 'var(--akcent)' : 'var(--text-gray)'}`}}><svg style={{fill: `${window.location.pathname.includes("/library/playlists") ? 'var(--akcent)' : 'var(--text-gray)'}`}} width="24px" height="24px" viewBox="0 0 487.3 487.3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M487.2,69.7c0,12.9-10.5,23.4-23.4,23.4h-322c-12.9,0-23.4-10.5-23.4-23.4s10.5-23.4,23.4-23.4h322.1
			C476.8,46.4,487.2,56.8,487.2,69.7z M463.9,162.3H141.8c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1
			c12.9,0,23.4-10.5,23.4-23.4C487.2,172.8,476.8,162.3,463.9,162.3z M463.9,278.3H141.8c-12.9,0-23.4,10.5-23.4,23.4
			s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,288.8,476.8,278.3,463.9,278.3z M463.9,394.3H141.8
			c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,404.8,476.8,394.3,463.9,394.3z
			 M38.9,30.8C17.4,30.8,0,48.2,0,69.7s17.4,39,38.9,39s38.9-17.5,38.9-39S60.4,30.8,38.9,30.8z M38.9,146.8
			C17.4,146.8,0,164.2,0,185.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,146.8,38.9,146.8z M38.9,262.8
			C17.4,262.8,0,280.2,0,301.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,262.8,38.9,262.8z M38.9,378.7
			C17.4,378.7,0,396.1,0,417.6s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9C77.8,396.2,60.4,378.7,38.9,378.7z"/>
</svg>
PLAYLISTY</h3>
        </div>
      </div> 
      </>
    );
}
  
export default Sidebar;
