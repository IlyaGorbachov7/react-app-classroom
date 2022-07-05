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
    const stateCurUser = useState({id: Date.now(), userName: "", isHand: false, status: false})

    const createUser = (newUser) => {
        console.log(newUser)
        stateCurUser[1](newUser)
        stateItems[1]([...stateItems[0], newUser])
    }
    return (
        <div className="App">
            <Login create={createUser}/>
            <MainWindow stateCurUser={stateCurUser} items={stateItems[0]}/>

        </div>
    );

}


export default App;
