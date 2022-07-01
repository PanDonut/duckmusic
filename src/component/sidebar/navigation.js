import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { MENU } from '../../constants'
import { MENUOFF, DWN, DWNM } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import styles from './navigation.module.css';
import { useHistory } from 'react-router';
import * as Icons from '../icons'
import useWindowSize from '../../hooks/useWindowSize';
import CONST from '../../constants/index';
import logo from '../../logomusic.png';

var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

function Navigation() {
  const size = useWindowSize();
  const router = useLocation();
  var userAgent = window.navigator.userAgent.toLowerCase();
  if (navigator.onLine == true) {
    return (
      <div className={styles.navBtns}>
        {
        MENU.map((menu) => {
            const selected = router.pathname.includes(menu.path);         
  
          return (
              <NavLink className={styles.sus} to={menu.path} exact activeClassName="activeLink" key={menu.title}>
                  <button className={styles.button} tabIndex="-1">
                      {selected ? menu.iconSelected : menu.icon}
                  </button>
              </NavLink>
              );
        })
      }
      {
        size.width > CONST.MOBILE_SIZE ?
        <button className={`${styles.button} ${styles.logoimg}`}>
          <img src={logo} />
                  </button>
        :
        ''
      }
      { window !== window.parent || userAgent.includes('wv') ?
        ''
        : 
        size.width > 640 && isIOS == false ?
        DWN.map((menu) => {
          const selected = router.pathname === menu.path;         

        return (
            <NavLink to={menu.path} exact activeClassName="activeLink" key={menu.title}>
                <button className={styles.button}>
                    {selected ? menu.iconSelected : menu.icon}
                    <TextBoldM>{menu.title}</TextBoldM>
                </button>
            </NavLink>
            );
      })
      : 
      isIOS == false ?
      DWNM.map((menu) => {
        const selected = router.pathname === menu.path;         

      return (
          <NavLink to={menu.path} exact activeClassName="activeLink" key={menu.title}>
              <button className={styles.button}>
                  {selected ? menu.iconSelected : menu.icon}
                  <TextBoldM>{menu.title}</TextBoldM>
              </button>
          </NavLink>
          );
    })
    : ''
      }
      </div>
    )
  } else {
    return (
      <div className={styles.navBtns}>
        {
        MENUOFF.map((menu) => {
            const selected = router.pathname === menu.path;         
  
          return (
              <NavLink to={menu.path} exact activeClassName="activeLink" key={menu.title}>
                  <button className={styles.button}>
                      {selected ? menu.iconSelected : menu.icon}
                      <TextBoldM>{menu.title}</TextBoldM>
                  </button>
              </NavLink>
              );
        })
      }
      </div>
    )
  }
}

export default Navigation