import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../useStores';
import { Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const CustomButton = observer((props) => {
    const store = useStores().store;

    return (
        <Button
            type={store.currentLevel === props.level ? 'primary' : 'default'}
            className='levelButton'
            onClick={() => store.startLevel(props.level)}
            disabled={props.locked}
        >
            {props.locked ? <LockOutlined /> : props.level}
        </Button>
    );
});

export default CustomButton;