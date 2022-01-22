import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { MENU } from '../../constants'
import { MENUOFF, DWN, DWNM } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import styles from './navigation.module.css';
import { useHistory } from 'react-router';
import * as Icons from '../icons'
import useWindowSize from '../../hooks/useWindowSize';

var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

function Navigation() {
  const size = useWindowSize();
  const router = useLocation();
  console.log(isIOS)
  
  if (navigator.onLine == true) {
    return (
      <div className={styles.navBtns}>
        {
        MENU.map((menu) => {
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
      { window !== window.parent ?
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