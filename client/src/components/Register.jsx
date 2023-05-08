import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/userSlice';

export default function Register() {
    
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function onInputChange(e) {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isDisabled = !input.name || !input.email || !input.password || !input.confirmPassword ||input.password !== input.confirmPassword;

    function signUp() {
        const user = {
            name: input.name,
            email: input.email,
            password: input.password
        };
        dispatch(registerUser(user));
        console.log(user);
        setInput({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-transparent text-white" style={{ borderRadius: "1rem", borderColor: "#ffa500" }}>
                            <div className="card-body p-5 text-center">
                                <div className="cardDiv mb-md-5 mt-md-4 pb-5">
                                    <h2 className="mb-2 text-uppercase">Sign up</h2>
                                    <p className="text-white mb-5">Please Enter Your Information</p>

                                    <FloatingLabel controlId="floatingInput_1" label="Username" className="mb-4" required>
                                        <Form.Control
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                            value={input.name}
                                            onChange={onInputChange} />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingInput_2" label="Email address" className="mb-4" required>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            name="email"
                                            value={input.email}
                                            onChange={onInputChange} />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingPassword_1" label="Password" className="mb-4" required>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={input.password}
                                            onChange={onInputChange} />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingPassword_2" label="Confirm Password" className="mb-4" required>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            value={input.confirmPassword}
                                            onChange={onInputChange} />
                                    </FloatingLabel>

                                    <button
                                        className="btn btn-outline-light btn-lg"
                                        disabled={isDisabled}
                                        onClick={signUp}
                                        type="submit">Sign Up
                                    </button>


                                    {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                    </div> */}

                                </div>

                                <div>
                                    <p className="mb-0">Already have an account? <a href="/login" className="text-white-50">Login here</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
