import React, {useState} from 'react';
import Login from "./components/Login";
import MainWindow from "./components/MainWindow";

function App() {
    // Current logging consumer
    const stateItems = useState([
        {id: 1, userName: "Ilya Gorbachev", isHand: true, status: false},
        {id: 2, userName: "Tomas Andersan", isHand: true, status: true},
        {id: 3, userName: "Romigo Panamera", isHand: true, status: false},
    ]);


    // make State by default - is current logging user
    const stateCurUser = useState({id: -1, userName: "", isHand: false, status: false})

    const createUser = (newUser) => {
        stateCurUser[1](newUser)
        stateItems[1]([...stateItems[0], newUser])
    }

    const removeUser = (user) => {
        stateItems[1](stateItems[0].filter(item => item.id !== user.id)); // Это не удаляет, оно лишь фильтрует и создает новый список
    }

    return (
        <div className="App">
            <Login create={createUser}/>
            <MainWindow stateCurUser={stateCurUser} items={stateItems[0]} remove={removeUser}/>

        </div>
    );

}


export default App;
