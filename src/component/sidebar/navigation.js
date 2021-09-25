import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { MENU } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import styles from './navigation.module.css';
import { useHistory } from 'react-router';

function Navigation() {
  const router = useLocation();
    const history = useHistory()
  return (
    <div className={styles.navBtns}>
      {MENU.map((menu) => {
          const selected = router.pathname === menu.path;
          history.go(0);

        return (
            <NavLink to={menu.path} exact activeClassName="activeLink" key={menu.title}>
                <button className={styles.button}>
                    {selected ? menu.iconSelected : menu.icon}
                    <TextBoldM>{menu.title}</TextBoldM>
                </button>
            </NavLink>
            );
      })}
    </div>
  )
}

export default Navigation