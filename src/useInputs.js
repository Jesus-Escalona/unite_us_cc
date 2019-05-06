import { useState } from 'react';

// Custom hook
export const useInputs = () => {
    const [inputs, setInputs] = useState({name: "", lastName: "", email: "", check: false, text: "", select: "Select Service Type"});

    const handleInput = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target[e.target.name === 'check' ? 'checked' : 'value']}));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    };

    return {
        inputs,
        handleInput,
        handleSubmit,
    }
};

