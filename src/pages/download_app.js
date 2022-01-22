import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import Sidebar from '../component/sidebar/sidebar';
import lay from '../style/App.module.css';
import Topnav from '../component/topnav/topnav';
import { useHistory } from 'react-router-dom';

function Download_app() {
    const history = useHistory();
    var isWindows = /Windows/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent) && !window.MSStream;
    if (isWindows) {
        window.location = 'https://github.com/PanDonut/duckmusic/releases/download/v1.98.2/Duck.Music.Setup.1.0.1.exe'
    } else if (isAndroid) {
        window.location = 'https://cdn.discordapp.com/attachments/866982456108253204/915283207568646164/duckmusic.apk'
    }
    history.push('/')
    const size = useWindowSize();

    return (
        <div className={lay.layout}>
			{size.width > CONST.MOBILE_SIZE
				? <Sidebar />
				: <MobileNavigation />
			}
        </div>
    )
}

export default Download_app;