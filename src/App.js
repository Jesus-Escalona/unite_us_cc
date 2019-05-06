import React, {useEffect, useState} from 'react';
import {useInputs} from './useInputs'

import './App.css';
import {getData} from "./Adapter";

// Using React Hooks
function App() {

    const {inputs: {name, lastName, email, text, check, select}, errors, handleInput, handleSubmit } = useInputs(postForm);
    const [options, setOptions] = useState([]);

    function postForm() {
        console.log('posting')
    }

    const getServices = (route) => {
        getData.get(route)
            .then(data => {
                if(data.ok) {
                    return data.json();
                } else {
                    throw data
                }
            }).then(services => {
                setOptions(services.data)
        })
            .catch(e => console.log('error', e));
    };

    useEffect( () => {
        getServices('service-types');
    }, []);

    return (
        <form>
            <h1 className="title">New Assistance Request</h1>
            <hr/>
            <input className={`input ${errors.name ? "error" : ""}`} placeholder="First Name" value={name} name="name" onChange={handleInput}/>
            {errors.name && <label className="required">This field is required</label>}
            <input className={`input ${errors.lastName ? "error" : ""}`} placeholder="Last Name" value={lastName} name="lastName" onChange={handleInput}/>
            {errors.lastName && <label className="required">This field is required</label>}
            <input className={`input ${errors.email ? "error" : ""}`} placeholder="Email Address" value={email} name="email" onChange={handleInput} type="email"/>
            {errors.email && <label className="required">This field is required</label>}
            {errors.emailReg && <label className="required">Please type a valid email</label>}
            <select className="input" name="select" value={select} onChange={handleInput} required>
                <option disabled>Select Service Type</option>
                {options.length && options.map((service, i) => <option
                    key={i}
                    value={service['display_name']}
                >{service['display_name']}</option>)}
            </select>
            <textarea className="input" value={text} name="text" onChange={handleInput} required />
            <div className="checkbox">
                <input className="input" type="checkbox" name="check" checked={check} onChange={handleInput}/>
                <label className="input label">I hereby accept the terms of service for THE NETWORK and the privacy policy.</label>
            </div>
            <button className="input button" onClick={handleSubmit}>Get Assistance</button>
        </form>
    );
}

export default App;
