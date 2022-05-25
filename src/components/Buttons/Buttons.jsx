import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../useStores';
import { Button } from 'antd';
import CustomButton from './CustomButton';
import styles from './Buttons.module.css';


const Buttons = observer(() => {
    const store = useStores().store;

    return (
        <div className={styles.buttonsBlock}>
            <div className={styles.levelButtons}>
                {store.buttons.map((button) =>
                    <CustomButton locked={button.locked} level={button.level} />
                )}
            </div>

            <div style={{ visibility: store.currentLevel ? 'visible' : 'hidden' }}>
                <div className={styles.actionButtons}>
                    <Button className={styles.actionButton} onClick={store.restart}>
                        Restart
                    </Button>
                    <Button disabled={store.loose} className={styles.actionButton} onClick={store.verify}>
                        Verify
                    </Button>
                </div>
                <p>Attemts left: {store.attemptsLeft}</p>
            </div>
        </div>
    );
});

export default Buttons;