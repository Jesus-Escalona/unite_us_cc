import { useState, useEffect } from 'react';

// Custom hook
export const useInputs = (callback) => {

    const inputState = {
        name: "",
        lastName: "",
        email: "",
        check: false,
        text: "",
        select: "Select Service Type",
    };

    const errorsState = {
        name: false,
        lastName: false,
        email: false,
        emailReg: false,
    };


    const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [inputs, setInputs] = useState(inputState);
    const [errors, setErrors] = useState(errorsState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Callback executed on each change of input
    const handleInput = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target[e.target.name === 'check' ? 'checked' : 'value']}));

        if(e.target.name === 'email') {
            setErrors({...errors, emailReg: !reg.test(inputs.email), email: inputs.email.length < 1});
        } else {
            setErrors({...errors, [e.target.name]: inputs[e.target.name].length < 1 });
        }
    };

    // CDM and CDU hook
    useEffect(() => {
        if (Object.values(errors).every(e => !e) && isSubmitting) {
            callback();
        } else {
            setIsSubmitting(false);
        }
    }, [errors]);

    const validateForm = () => {
        return {...errors, name: inputs.name.length < 1, lastName: inputs.lastName.length < 1, email: inputs.email.length < 1, emailReg: !reg.test(inputs.email)}
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm());
        setIsSubmitting(true);
    };

    return {
        inputs,
        errors,
        handleInput,
        handleSubmit,
    }
};

