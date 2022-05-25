import { observer } from 'mobx-react';
import { useStores } from '../../useStores';
import { useEffect } from 'react';
import Maze from '../Maze/Maze';
import Buttons from '../Buttons/Buttons';
import { Spin } from 'antd';
import styles from './App.module.css';


const App = observer(() => {

  const store = useStores().store;

  useEffect(() => {
    store.openConnection();
    store.checkLevels();
  }, [store])

  return (
    <div className={styles.App}>
      {store.loaded ?
        <div className={styles.mainBlock}>
          <Buttons />
          <Maze />
        </div>
        :
        <Spin className={styles.spin} size='large' />
      }
    </div >
  );
});

export default App;
