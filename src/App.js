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

    // makes State by default - is current user
    const stateCurUser = useState({id: -1, userName: "", isHand: false, status: false})

    const createUser = (newUser) => {
        stateCurUser[1](newUser)
        stateItems[1]([...stateItems[0], newUser])

       // send request for create user
    }

    const removeUser = (user) => {
        stateItems[1](stateItems[0].filter(item => item.id !== user.id)); // Это не удаляет, оно лишь фильтрует и создает новый список

        // send request for remove user
    }

    const actionHand = (curUser) => {
        stateCurUser[1]({...curUser, isHand: curUser.isHand !== true})
        console.log(stateCurUser[0])
        //
        // stateItems[0].find(value => {
        //     if (value.id === curUser.id) {
        //         value.isHand = curUser.isHand
        //     }
        // })

        // send request for changing hand action
    }
    return (
        <div className="App">
            <Login create={createUser}/>

            {stateItems[0].length !== 0
                ?
                <MainWindow curUser={stateCurUser[0]} items={stateItems[0]} remove={removeUser} action={actionHand}/>
                :
                <h1 style={{textAlign: "center"}}>
                    Элементов нет !
                </h1>
            }
        </div>
    );

}


export default App;
