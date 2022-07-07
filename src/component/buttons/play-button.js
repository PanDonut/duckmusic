import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import * as Icons from '../icons';
import IconButton from '../buttons/icon-button';

import styles from './play-button.module.css'
import { useState } from 'react';

function PlayButton(props) {
  const d = new Date();
  const [hea, shea] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  var [hearts, setH] = useState([0]);
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}
  const hcols = [
    "#db1414", "#db144c", "#ff5c8a", "#b52a84", "#fc2b2b"
]
        return (
            <div className={styles.playBtn} tabIndex="0" role="button" onClick={() => {props.changePlay(!props.isPlaying); }}>
                {props.isPlaying && props.isthisplay
                        ? <Icons.Pause />
                        : <Icons.Play />
                }
            </div>
        );
}

const mapStateToProps = (state) => {
  return {
    trackData: state.trackData,
    isPlaying: state.isPlaying
  };
};

export default connect(mapStateToProps, { changePlay })(PlayButton);
