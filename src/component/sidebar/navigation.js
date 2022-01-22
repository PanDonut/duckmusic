import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { MENU } from '../../constants'
import { MENUOFF, DWN } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import styles from './navigation.module.css';
import { useHistory } from 'react-router';
import * as Icons from '../icons'

function Navigation() {
  const router = useLocation();
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