import React, {useState} from 'react';
import Login from "./components/Login";

function App() {
    const state = useState(0)
    const [stat, setStat] = useState(0);
    console.log(setStat)
    function incrFun() {
        count++;
        console.log(count)
        setStat(stat + 1)
    }

    return (
        <div className="App">
            <Login/>
        </div>
    );

}

let count = 5;

export default App;
