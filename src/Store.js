import { notification } from "antd";
import { makeAutoObservable } from "mobx"

class Store {
    loaded = false;
    socket = null;
    maze = [];
    currentLevel = null;
    mazeDone = false;
    attemptsLeft = 10;
    loose = false;
    password = ''

    constructor() {
        makeAutoObservable(this);
    };

    setLoaded = (value) => {
        this.loaded = value
    }

    setMaze = (data) => {
        data = data.split('');
        data.shift();

        let colQty = data.findIndex(el => el === '\n');

        let realIndex = 0;
        let maze = [];
        for (let el of data) {
            if (el === '\n')
                realIndex--;
            maze.push({
                value: el,
                x: realIndex % colQty,
                y: Math.floor(realIndex / colQty)
            })
            realIndex++;
        }
        this.maze = maze;
        this.loaded = true;
    }

    openConnection = () => {
        this.socket = new WebSocket("wss://hometask.eg1236.com/game-pipes/");

        this.socket.onopen = () => {
            this.setLoaded(true);
        }
        this.socket.addEventListener('message', (event) => {
            let answer = event.data.split(': ');
            const answerType = answer[0];
            const answerData = answer[1];

            if (answerType === 'new' && answerData === 'OK') {
                this.socket.send('map')
                return;
            }

            if (event.data.slice(0, 3) === 'map') {
                this.setMaze(event.data.slice(4));
                return;
            }

            if (answerType === 'rotate' && answerData === 'OK') {
                this.socket.send('map');
                return;
            }

            if (answerType === 'verify') {
                if (answerData !== 'Incorrect.') {
                    this.setMazeDone(true, answerData);
                }
                else
                    if (this.attemptsLeft === 0) {
                        this.loose = true;
                    } else {
                        this.openNotification('error', 'Incorrect!', 'Try again')
                    }
            }
        })
    }

    closeConnection = () => {
        this.socket.close();
    }

    startLevel = (level) => {
        this.loaded = false;
        this.password = '';
        this.loose = false;
        this.attemptsLeft = 10;
        this.currentLevel = level;
        this.socket.send(`new ${level}`);
    }

    rotate = (element) => {
        if (element.value === '\n')
            return;
        this.socket.send(`rotate ${element.x} ${element.y}`);
    }

    setMazeDone = (value, password) => {
        this.mazeDone = value;
        if (value)
            this.password = password
    }

    verify = () => {
        this.socket.send('verify');
        this.attemptsLeft--;
    }

    restart = () => {
        this.startLevel(this.currentLevel);
    }

    openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            placement: 'bottom',
        });
    }
}

export default Store;