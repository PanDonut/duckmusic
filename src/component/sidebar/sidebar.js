import useMousePosition from '../../hooks/useMousePosition';
import {Logo} from '../icons';
import Playlist from './playlist';
import Navigation from './navigation'
import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { MENU } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import { useHistory } from 'react-router';
import styles from './sidebar.module.css';
import { useEffect, useState } from 'react';

function Sidebar() {
  const[width, SetWidth] = useState(236);
  const [isMouseDown, setisMouseDown] = useState(false);
  const { x } = useMousePosition();

    useEffect(() => {
      if (!isMouseDown) return false;
  
      const handleMove = () => {
        if(x > 200 && x < 316){
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
        <nav className={styles.SideNavbar} style={{ width: `${width}px` }}>
        <div className={styles.Fixed}>
          <div>
              <Logo/>
          </div>
          <div>
              <Navigation />
          </div>
          <div>
              <Playlist />
          </div>                
        </div>
        <div 
            className={`${styles.changeWidth} ${isMouseDown ? styles.ActiveChange : ''}`}
            onMouseDown={() => {
              setisMouseDown(true);
            }}
            ></div>
            <div className={styles.bot}>
            <NavLink to='/info' exact activeClassName="activeLink" className={styles.activeLink}>
                <button className={styles.button}>
                    <svg version="1.1" id="Layer_1"
                        viewBox="0 0 460 460">
                        <g id="XMLID_1055_">
                            <g>
                                <path d="M230,0C102.975,0,0,102.975,0,230s102.975,230,230,230s230-102.974,230-230S357.025,0,230,0z M268.333,377.36
			c0,8.676-7.034,15.71-15.71,15.71h-43.101c-8.676,0-15.71-7.034-15.71-15.71V202.477c0-8.676,7.033-15.71,15.71-15.71h43.101
			c8.676,0,15.71,7.033,15.71,15.71V377.36z M230,157c-21.539,0-39-17.461-39-39s17.461-39,39-39s39,17.461,39,39
			S251.539,157,230,157z"/>
                            </g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                    </svg>

                    <TextBoldM>Informacje</TextBoldM>
                </button>
                </NavLink>
                </div>
      </nav>
    );
}
  
export default Sidebar;