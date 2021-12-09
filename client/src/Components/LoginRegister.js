import React, {useState} from 'react'
import Input from '../Utils/Input';
import './LoginRegister.css';

const initialState = {
    email: '',
    password: ''
};

const LoginRegister = () => {

    const [login, setLogin] = useState(true);
    const [formDetails, setFormDetails] = useState(initialState);
    const [error, setError] = useState(initialState);

    const changeHandler = (e) => {
        setFormDetails({...formDetails, [e.target.name]: e.target.value});
    };

    const submitHandler = (e) => {
        console.log(formDetails);
    }

    return (
        <div className="LoginRegister">
            <div className="container">    
                <h2 className="title">{ login ? "Login" : "Register" }</h2>
                <div className="form">
                    <Input 
                        label="Email" 
                        error={error.email}
                        icon="user"
                        properties={{
                            type: "email",
                            name: "email",
                            id: "email",
                            value: formDetails.email,
                            onChange: changeHandler,
                            className: formDetails.email ? "valid": ""
                        }}
                    />
                    <Input 
                        label="Password" 
                        error={error.password}
                        icon="eye"
                        properties={{
                            type: "password",
                            name: "password",
                            id: "password",
                            value: formDetails.password,
                            onChange: changeHandler,
                            className: formDetails.password ? "valid": ""
                        }}
                    />
                    <button className="btn" onClick={submitHandler}>{login ? "Login" : "Register"}</button>
                </div>
                {
                    login ? 
                        <p>New user? <span onClick={() => setLogin(false)}>Register</span></p> : 
                        <p onClick={() => setLogin(true)}>Already a user? <span>Login</span></p>
                }
            </div>
        </div>
    )
}

export default LoginRegister
