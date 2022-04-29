import { useState } from "react";
import { useParams } from "react-router-dom";
import './show.css';


function ShowOff() {
    const [hearted, setHeart] = useState(false);
    const { data } = useParams();
    switch (data) {
        case 'heart':
        return (
            <div className="full">
                <div onClick={() => {setHeart(!hearted)}} className={`${'love'} ${hearted == true ? 'isactive' : ''}`}><title>Lubię to!</title></div>
            </div>
        );
    }
}

export default ShowOff;