import React from 'react';
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import * as Icons from '../icons';
import IconButton from '../buttons/icon-button';

import styles from './embed-button.module.css'

function EmbedButton() {
        return (
            <div className={styles.playBtn} tabIndex="0" role="button">
                        <IconButton icon={<Icons.Embed />} activeicon={<Icons.Embed />}/>
            </div>
        );
}


export default EmbedButton;