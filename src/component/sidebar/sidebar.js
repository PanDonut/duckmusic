import useMousePosition from '../../hooks/useMousePosition';
import {Logo} from '../icons';
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
        <nav className={styles.SideNavbar}>
          
          <div>
              <Navigation />            
          </div>             
      </nav>
    );
}
  
export default Sidebar;
