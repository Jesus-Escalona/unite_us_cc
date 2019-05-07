import { useState, useEffect } from 'react';

// Custom hook
export const useInputs = (callback) => {

    // Initial State for inputs.
    const inputState = {
        name: "",
        lastName: "",
        email: "",
        check: false,
        description: "",
        select: "Select Service Type",
        selected: false,
    };

    // Initial State for errors.
    const errorsState = {
        name: false,
        lastName: false,
        email: false,
        emailReg: false,
        check: false,
        selected: false,
        description: false,
    };

    // Email RegExp
    const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [inputs, setInputs] = useState(inputState);
    const [errors, setErrors] = useState(errorsState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Callback executed on each change of input.
    const handleInput = (e) => {
        e.persist();
        if(e.target.name === 'select') {
            setInputs(inputs => ({
                ...inputs,
                select: e.target.value,
                selected: true
            }));
        } else {
            setInputs(inputs => ({
                ...inputs,
                [e.target.name]: e.target[e.target.name === 'check' ? 'checked' : 'value']
            }));
        }
    };

    const handleBlur = (e) => {
        e.persist();
        if(e.target.name === 'email') {
            setErrors({...errors, emailReg: !reg.test(inputs.email), email: inputs.email.length < 1});
        } else {
            setErrors({...errors, [e.target.name]: inputs[e.target.name].length < 1 });
        }
    };

    // CDM and CDU hook.
    useEffect(() => {
        if (Object.values(errors).every(e => !e) && isSubmitting) {
            // Post Request
            callback();
        }
        setIsSubmitting(false);
    }, [errors]);

    // Callback that validates the whole form and sets errors.
    const validateForm = () => {
        return {
            ...errors,
            name: inputs.name.length < 1,
            lastName: inputs.lastName.length < 1,
            email: inputs.email.length < 1,
            emailReg: !reg.test(inputs.email),
            selected: !inputs.selected,
            check: !inputs.check,
            description: inputs.description.length < 1,
        }
    };

    // Callback that handles the form submit action.
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
        handleBlur
    }
};

