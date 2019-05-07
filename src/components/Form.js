import React, {useEffect, useState} from 'react';
import {useInputs} from '../custom_hooks/useInputs'

import '../App.css';
import {getData} from "../Adapter";

// Using React Hooks
function Form(props) {

    const {show, setShow} = props;
    const {inputs: {name, lastName, email, description, check, select}, errors, handleInput, handleSubmit, handleBlur } = useInputs(postAssistance);
    const [options, setOptions] = useState([]);

    // POST request callback for assistance.
    function postAssistance() {
        if(show.length) return;
        const body = {
            assistance_request: {
                contact: {
                    first_name: name,
                    last_name: lastName,
                    email,
                },
                service_type: select,
                description
            }
        };

        getData.post('assistance-requests', body)
            .then(data => {
                if(data.ok) {
                    return data.json();
                } else {
                    throw data
                }
            }).then(answer => {
                setShow(`🎉 ${answer.message}`)
        })
            .catch(e => {
                e.json().then(o => {
                    setShow(`🤕 ${o.message}`)
                })
            });
    }

    // GET request callback to get the service options.
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
            <input className={`input ${errors.name ? "error" : ""}`} placeholder="First Name" value={name} name="name" onChange={handleInput} onBlur={handleBlur}/>
            {errors.name && <label className="required">This field is required</label>}
            <input className={`input ${errors.lastName ? "error" : ""}`} placeholder="Last Name" value={lastName} name="lastName" onChange={handleInput} onBlur={handleBlur}/>
            {errors.lastName && <label className="required">This field is required</label>}
            <input className={`input ${errors.email ? "error" : ""}`} placeholder="Email Address" value={email} name="email" onChange={handleInput} onBlur={handleBlur}/>
            {errors.email && <label className="required">This field is required</label>}
            {errors.emailReg && <label className="required">Please type a valid email</label>}
            <select className={`input ${errors.selected ? "error" : ""}`} name="select" value={select} onChange={handleInput} required>
                <option disabled>Select Service Type</option>
                {options.length && options.map((service, i) => <option
                    key={i}
                    value={service['id']}
                >{service['display_name']}</option>)}
            </select>
            {errors.selected && <label className="required">Please select an option from the list</label>}
            <textarea className={`input ${errors.description ? "error" : ""}`} value={description} name="description" onChange={handleInput} onBlur={handleBlur}/>
            {errors.description && <label className="required">This field is required</label>}
            <div className="checkbox">
                <input className="input" type="checkbox" name="check" checked={check} onChange={handleInput}/>
                <label className="input label">I hereby accept the terms of service for THE NETWORK and the privacy policy.</label>
            </div>
            {errors.check && <label className="required">Please accept the terms of service to continue</label>}
            <button className="input button" onClick={handleSubmit}>Get Assistance</button>
        </form>
    );
}

export default Form;
