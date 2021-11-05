import './connection.css';
import React, { useState, useEffect, useRef, setState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { connect } from 'react-redux';


function Connection(props) {

    const [input, setInput] = useState('');

    const db = getDatabase();
    const trac = ref(db, 'remote-play/' + "420" + '/trackk/0');
    onValue(trac, (snapshot) => {
        const tracdata = snapshot.val();
    });


    console.log(trac);

    return (
        <div>
            <input id="txts" placeholder="Wpisz kod" maxLength="80" value={input} onInput={e => setInput(e.target.value)}></input>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        trackData: state.trackData,
        trackC: state.trackData.trackKey,
        isPlaying: state.isPlaying
    };
};

export default connect(mapStateToProps)(Connection);