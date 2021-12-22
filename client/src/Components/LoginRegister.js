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
        let URL = "http://localhost:8080/user/signin";
        if(!login) URL = "http://localhost:8080/user/signup";

        let status;
        fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDetails),
          })
            .then((res) => {
              status = res.status;
              return res.json();
            })
            .then((data) => {
                console.log(data);
              if (status == 200 || status == 201) {
                // store token and redirect to home page
                window.location.href = "http://localhost:3000/";
                localStorage.setItem("user",data.body.user);
                localStorage.setItem("token",data.body.token);
                setError(initialState);
              } else {
                // console.log(data);
                const res = data.data;
                setError(res);
              }
            })
            .catch((err) => console.log(err));
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
                    <button className="btn" onClick={(e) => submitHandler(e, login)}>{login ? "Login" : "Register"}</button>
                </div>
                {
                    login ? 
                        <p>New user? <span onClick={() =>{setError(initialState); setLogin(false)}}>Register</span></p> : 
                        <p onClick={() => {setError(initialState);setLogin(true)}}>Already a user? <span>Login</span></p>
                }
            </div>
        </div>
    )
}

export default LoginRegister
