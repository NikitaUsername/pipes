import '../styles/App.css';
import { observer } from 'mobx-react';
import { useStores } from '../useStores';
import { useEffect } from 'react';
import Maze from './Maze';
import Buttons from './Buttons';
import { Spin } from 'antd';

const App = observer(() => {

  const store = useStores().store;

  useEffect(() => {
    store.openConnection();
  }, [store])

  return (
    <div className="App">
      {store.loaded ?
        <div className='mainBlock'>
          <Maze />
          <Buttons />
        </div>
        :
        <Spin className='spin' size='large' />
      }
    </div >
  );
});

export default App;
