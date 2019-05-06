import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {};
    const handleChange = (e) => {
        `set${e.target.name}`(e.target.value)
    };

    return (
        <form className="form">
            <h1 className="title">New Assistance Request</h1>
            <hr/>
            <input className="input" placeholder="First Name" value={name} onChange={handleChange} name="Name" required/>
            <input className="input" placeholder="Last Name" value={lastName} name="LastName" required/>
            <input className="input" placeholder="Email Address" value={email} type="Email" name="email" required/>
            <select className="input" defaultValue="Select Service Type" required>
                <option disabled >Select Service Type</option>
            </select>
            <textarea className="input" required />
            <div className="checkbox">
                <input className="input" type="checkbox" />
                <label className="input label">I hereby accept the terms of service for THE NETWORK and the privacy policy</label>
            </div>
            <button className="input button">Get Assistance</button>
        </form>
    );
}

export default App;
