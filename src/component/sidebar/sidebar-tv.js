import useMousePosition from '../../hooks/useMousePosition';
import {Logo} from '../icons';
import Playlist from './playlist';
import Navigation from './navigation'
import React from 'react'
import { NavLink, useLocation, Link } from "react-router-dom";
import { MENU } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import { useHistory } from 'react-router';
import styles from './sidebar-tv.module.css';
import { useEffect, useState } from 'react';


function Sidebar() {
    const history = useHistory();
    const location = useLocation();
  const[width, SetWidth] = useState(236);
  const [isMouseDown, setisMouseDown] = useState(false);
  const { x } = useMousePosition();




    return (
        <nav className={styles.SideNavbar}>
        <div className={styles.Fixed}>
          
          <div>
              <Logo/>
          </div>
          <div>
              <Navigation />
          </div>              
        </div>
      </nav>
    );
}
  
export default Sidebar;