import React, {useState, useEffect} from 'react';

import './App.css';
import Form from "./components/Form";
import Snackbar from "./components/Snackbar";

function App() {
    const [show, setShow] = useState("");

    useEffect(
        () => {
            let timer1 = setTimeout(() => setShow(""), 3000);

            // this will clear Timeout when component unmount like in willComponentUnmount
            return () => {
                clearTimeout(timer1)
            }
        },
        [show] //useEffect will run only one time
    );

    return (
        <>
            <Snackbar show={show}/>
            <Form setShow={setShow} show={show}/>
        </>
    );
}

export default App;
