import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../useStores';

const Maze = observer(() => {
    const store = useStores().store;

    return (
        <div className='mazeBlock'>
            <div className='mazeContainer'>
                {!store.loose && store.currentLevel && !store.mazeDone &&
                    <pre className='maze'>
                        {store.maze.map((el, index) =>
                            <span className='mazeElement' key={index} onClick={() => store.rotate(el)}>
                                {el.value}
                            </span>
                        )}
                    </pre>}

                {store.loose &&
                    <div>
                        <p className='title looseTitle'>You loose!</p>
                    </div>
                }
                {!store.currentLevel &&
                    <div>
                        <p className='title selectTitle'>Select level</p>
                    </div>
                }
                {store.mazeDone &&
                    <div>
                        <p className='title doneTitle'>
                            Congradulations! <br />
                            Here is you password:<br />
                            {store.password}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
});

export default Maze;