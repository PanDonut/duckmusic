import lay from '../style/App.module.css';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, set } from "firebase/database";
import './rewind.css';
import { useState } from 'react';

function Rewind() {

    const size = useWindowSize();
    const { path } = useParams();
    const db = getDatabase();
    var [datayear, setDataYear] = useState(null);

    const nameRef1 = ref(db, 'userdata/' + localStorage.getItem('emailduckmusic').split('.').join("") + '/rewind/' + path + '/songs');
    onValue(nameRef1, (snapshot) => {
        const data = snapshot.val();
        if (datayear == null) {
            setDataYear(JSON.parse(data));
        }
    });
    set(ref(db, 'userdata/' + localStorage.getItem('emailduckmusic').split('.').join("") + "/rewind/" + path), {
        songs: JSON.stringify([
            {
                "totaltime": 600,
                "songs": [
                    {
                        "songindex": 0,
                        "time": 100
                    },
                    {
                        "songindex": 2,
                        "time": 50
                    },
                    {
                        "songindex": 4,
                        "time": 200
                    },
                    {
                        "songindex": 6,
                        "time": 10
                    },
                    {
                        "songindex": 5,
                        "time": 20
                    }
                ]
            }
        ])
    });
    return (
        <>
            <div className='bg12'>
                { datayear != null ?
                    datayear.map(list => {
                        return (
                        <div>
                        {
                        list.songs.sort(item => function(a, b){return b - a}).map(item => {
                            return (
                                <div>
                                    <h1>{item.time}</h1>
                                </div>
                            )
                        }
                        )
                    }
                        </div>
                        )
                    }
                    )
                    : ''
                }
            </div>
            </>
    )
}

export default Rewind;