import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../useStores';
import styles from './Maze.module.css';

const Maze = observer(() => {
    const store = useStores().store;

    return (
        <div className={styles.mazeBlock}>
            <div className={styles.mazeContainer}>
                {!store.loose && store.currentLevel && !store.mazeDone &&
                    <pre className={styles.maze}>
                        {store.maze.map((el, index) =>
                            <span className={styles.mazeElement} key={index}
                                onClick={() => store.rotate(el)}>
                                {el.value}
                            </span>
                        )}
                    </pre>}

                {store.loose &&
                    <div>
                        <p className={`${styles.title} ${styles.looseTitle}`}>You loose!</p>
                    </div>
                }
                {!store.currentLevel &&
                    <div>
                        <p className={`${styles.title} ${styles.selectTitle}`}>Select level</p>
                    </div>
                }
                {store.mazeDone &&
                    <div>
                        <p className={`${styles.title} ${styles.doneTitle}`}>
                            Congradulations! <br />
                            Here is you password:<br />
                            {store.password}
                        </p>
                    </div>
                }
            </div>
        </div >
    );
});

export default Maze;