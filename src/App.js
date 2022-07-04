import React, {useState} from 'react';
import Login from "./components/Login";
import MainWindow from "./components/MainWindow";

function App() {
    // Current logging consumer
    const [items, setItemsTable] = useState([
        {id: 1, userName: "Ilya Gorbachev", isHand: true, status: "student"},
        {id: 2, userName: "Tomas Andersan", isHand: true, status: "header"},
        {id: 3, userName: "Romigo Panamera", isHand: true, status: "student"},
    ]);

    const stateCurUser = useState(items[1])

    return (
        <div className="App">
            <MainWindow stateCurUser={stateCurUser} items={items}/>

        </div>
    );

}

let count = 5;

export default App;
