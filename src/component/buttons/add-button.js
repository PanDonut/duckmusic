import React from 'react';
import { connect } from 'react-redux';
import { changePlay } from '../../actions';
import * as Icons from '../icons';
import IconButton from '../buttons/icon-button';

import styles from './link-button.module.css'

function EmbedButton() {
        return (
            <div className={styles.playBtn} tabIndex="0" role="button">
                        <IconButton icon={<Icons.Add />} activeicon={<Icons.Add />}/>
            </div>
        );
}


export default EmbedButton;