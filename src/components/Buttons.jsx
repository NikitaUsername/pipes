import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../useStores';
import { Button } from 'antd';
import CustomButton from './CustomButton';


const Buttons = observer(() => {
    const store = useStores().store;

    return (
        <div className='buttonsBlock'>
            <div className='levelButtons'>
                <CustomButton level={1} />
                <CustomButton level={2} />
                <CustomButton level={3} />
                <CustomButton level={4} />
                <CustomButton locked level={5} />
                <CustomButton locked level={6} />
            </div>

            <div style={{ visibility: store.currentLevel ? 'visible' : 'hidden' }}>
                <div className='actionButtons'>
                    <Button className='actionButton' onClick={store.restart}>
                        Restart
                    </Button>
                    <Button disabled={store.loose} className='actionButton' onClick={store.verify}>
                        Verify
                    </Button>
                </div>
                <p>Attemts left: {store.attemptsLeft}</p>
            </div>
        </div>
    );
});

export default Buttons;