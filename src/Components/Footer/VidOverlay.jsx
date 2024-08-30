import React from 'react';

import styles from './vidoverlay.module.css'; 

export default function VideoOverlay({ children, open, onClose }) {
    const _ref = React.createRef();

    function handleClose() {
        // TODO mouse boundary outside childrens
        onClose()
    }

    return (
        <div onClick={handleClose} ref={_ref} className={styles.overlay} style={{display: open ? "block" : "none"}}>
            <div className={styles.content}>
                {open && children}
            </div>
        </div>
    )
}
