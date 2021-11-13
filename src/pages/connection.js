import './connection.css';
import React, { useState, useEffect, useRef, setState } from 'react';
import { connect } from 'react-redux';
import { getDatabase, ref, onValue, set } from "firebase/database";


function Connection(props) {

    const [input, setInput] = useState('');

        const db = getDatabase();
        set(ref(db, 'remote-play/' + '420' + ''), {
            trackk: props.trackData.trackKey,
            play: props.isPlaying,
        });





    return (
        <div>
            <svg id="elrPsm6iZg91" xmlns="http://www.w3.org/2000/svg" width="100vw" height="calc(100vh - 112px)" viewBox="0 0 20.766 20.766" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g id="elrPsm6iZg92_to" transform="translate(10.432001,17.856002)"><circle id="elrPsm6iZg92" r="2.426" transform="translate(-0.000001,-0.000002)" fill="rgb(255,255,255)"  stroke="none" stroke-width="1" /></g><g id="elrPsm6iZg93_to" transform="translate(10.496314,12.238651)"><path id="elrPsm6iZg93" d="M16.23,9.926C16.194,9.889,16.156,9.856,16.119,9.822L16.01,9.719C15.992,9.7,15.972,9.686,15.949,9.668C12.812,6.818,8.011,6.931,5.017,9.925L4.666,10.277L4.18,10.763C3.588,11.355,3.591,12.32,4.184,12.913C4.778,13.508,5.743,13.509,6.334,12.917L7.172,12.079C9.076,10.176,12.173,10.176,14.076,12.078L14.681,12.664C15.267,13.25,16.223,13.249,16.812,12.659C17.097,12.375,17.254,11.996,17.255,11.593C17.256,11.192,17.101,10.813,16.816,10.53L16.23,9.926Z" transform="translate(-10.496314,-10.481466)" fill="rgb(255,255,255)"  stroke="none" stroke-width="1" /></g><g id="elrPsm6iZg94_to" transform="translate(10.382935,6.078639)"><path id="elrPsm6iZg94" d="M20.363,6.927L19.859,6.423C19.857,6.421,19.856,6.418,19.852,6.417L19.454,6.017C19.384,5.948,19.308,5.888,19.228,5.836C14.115,1.347,6.338,1.485,1.388,6.247C1.364,6.269,1.337,6.284,1.313,6.308L0.403,7.219C-0.137,7.758,-0.134,8.635,0.409,9.178C0.951,9.72,1.828,9.724,2.368,9.183L3.278,8.274C3.284,8.266,3.289,8.259,3.295,8.254C7.298,4.387,13.648,4.363,17.683,8.175L18.399,8.892C18.938,9.431,19.817,9.429,20.359,8.887C20.9,8.344,20.902,7.466,20.363,6.927Z" transform="translate(-10.382935,-6.077976)" fill="rgb(255,255,255)"  stroke="none" stroke-width="1" /></g></svg>
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