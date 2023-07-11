import React, { useState } from 'react';
import InputControl from "./InputControl";
import axios from 'axios';
import { Link } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPWD] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        const newUser = { name, email, password };

        try {
            const response = await axios.post('http://localhost:5000/admin/register', newUser);
            console.log('User Registration Successful');
            alert('Admin registered successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to register admin');
        }

    }
   
    return (
        <>
        <div>
            <div style={{ backgroundImage: `url('https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: 670,
                        color: 'black',
                        fontFamily: 'sans-serif',
                        fontSize: '20',
                        overflow: 'hidden', }}>
                <h1 style={{marginTop: '10%', color: 'black', marginLeft: '700px', }}>Signup</h1>
                <br />
                <InputControl
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} /><br />
                <InputControl
                    label="Email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} /><br />
                <InputControl
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPWD(e.target.value)} />

                <div>
                    <b style={{ color: 'red', fontSize: '10px', marginRight: '30px', fontWeight: '500' }}>{errorMsg}</b>
                    <button onClick={register} disabled={submitButtonDisabled} className="btn btn-primary" style={{ marginLeft: '700px' }}>
                        Signup
                    </button>
                    <p style={{ marginLeft: '670px', color: 'black' }}>
                        Already have an account?{" "}
                        <span>
                            <Link to="/login">LogIn</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div></>
    );
}

export default Signup