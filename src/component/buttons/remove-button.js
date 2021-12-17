import React from 'react';
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import * as Icons from '../icons';
import IconButton from '../buttons/icon-button';

import styles from './link-button.module.css'

function ShareButton() {
    return (
        <div className={styles.playBtn} tabIndex="0" role="button">
            <IconButton icon={<Icons.Remove />} activeicon={<Icons.Remove />} />
        </div>
    );
}


export default ShareButton;