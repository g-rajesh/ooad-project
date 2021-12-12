import React, {useState} from 'react';
import {FaUser, FaEyeSlash, FaEye} from 'react-icons/fa';
import "./Input.css"

function Input({ properties, error, icon, label }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const changeHandler = () => {
        setPasswordVisible(prevState => !prevState);
    }

    let type=properties.type;
    if(type === "password" || type === "text") {
        if(passwordVisible) type="text"
        else type="password"
    }

    return (
        <div className={error ? "form-group error": "form-group"}>
            <div className="input-details">
                <label htmlFor={properties.name}>{label}</label>
                <input {...properties} type={type} autoComplete="off" />
                {
                    icon === "user" ? 
                        <FaUser className="icon" /> :
                        passwordVisible ? 
                            <FaEye className="icon eye" onClick={changeHandler} /> : 
                            <FaEyeSlash className="icon eye" onClick={changeHandler}  />
                }
            </div>
            {error && <span className="error">{error}</span>}
        </div>
    )
}

export default Input
