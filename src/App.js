import React, {useState} from 'react';
import Login from "./components/Login";
import MainWindow from "./components/MainWindow";

function App() {
    // Current logging consumer
    const [items, setItems] = useState([
        {id: 1, userName: "Ilya Gorbachev", isHand: true, status: false},
        {id: 2, userName: "Tomas Andersan", isHand: true, status: true},
        {id: 3, userName: "Romigo Panamera", isHand: true, status: false},
    ]);

    const [loginData, setLoginData] = useState({
        name: "",
        status: false
    });

    const funSubmit = function (event) {
        event.preventDefault()
        console.log(loginData)

        const newItem = {
            id: Date.now(),
            userName: loginData.name,
            status: loginData.status,
            isHand: false
        }
        setItems([...items, newItem])
        // Code send request on the server
    }

    return (
        <div className="App">
            <div className="form-popup" id="myForm">
                <form className="form-container">
                    <h1>Join class</h1>

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Name Lastname"
                           value={loginData.name}
                           onChange={event => {
                               setLoginData({...loginData, name: event.target.value})
                           }
                           }
                           required/>

                    <label>
                        <input type="checkbox"
                               checked={loginData.status}
                               onChange={event => setLoginData({...loginData, status: event.target.checked})}/> You are
                        the
                        creator ?
                    </label>

                    <button type="button" className="btn" onClick={funSubmit}>Login</button>
                </form>
            </div>


            <MainWindow items={items}/>

        </div>
    );

}

let count = 5;

export default App;
