import { NavLink, Link } from "react-router-dom";
import TextBoldM from '../text/text-bold-m';
import styles from './playlist-button.module.css';

function PlaylistButton({ImgName, children, href}){
    return (
        <Link to={href}>
            <button className={styles.button}>
                <TextBoldM>{children}</TextBoldM>
            </button>
        </Link>
    );
}

export default PlaylistButton;