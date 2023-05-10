import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/userSlice';
import { Navigate, Link } from 'react-router-dom';

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

    const isDisabled = !input.name || !input.email || !input.password || !input.confirmPassword || input.password !== input.confirmPassword;

    function signUp() {
        const user = {
            name: input.name,
            email: input.email,
            password: input.password
        };
        dispatch(registerUser(user));
        setInput({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const signUpSuccess = useSelector((state) => state.user.success);

    if (signUpSuccess) {
        return <Navigate to="/login" />;
    }

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

                                </div>

                                <div>
                                    <p className="mb-0">Already have an account? <Link className="signInLink" to="/login">Login here</Link>
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
