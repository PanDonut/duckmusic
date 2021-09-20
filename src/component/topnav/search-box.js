import * as Icons from '../icons';
import styles from './search-box.module.css';
import Search from '../../pages/search.js'

function SearchBox() {
    return (
        <div className={styles.SeachBox}>
            <Icons.Search />
            <input placeholder="Wyszukaj tytuł piosenki, autora lub playlistę" maxLength="80"/>
        </div>
    );
}
  
export default SearchBox;