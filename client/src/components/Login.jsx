import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/userSlice';
import Loading from './Loading';
import { Navigate, Link } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const currentUser = useSelector((state) => state.user.currentUser);
    const { loading, error, success } = userState;
    const [input, setInput] = React.useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const signIn = (e) => {
        dispatch(loginUser(input));
        setInput({
            email: "",
            password: ""
        });
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-transparent text-white" style={{ borderRadius: "1rem", borderColor: "#ffa500" }}>
                            <div className="card-body p-5 text-center">
                                <div className="cardDiv mb-md-5 mt-md-4 pb-5">
                                    <h2 className="mb-2 text-uppercase">Login</h2>
                                    <p className="text-white mb-5">Please Enter Your Email and Password</p>
                                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-4">
                                        <Form.Control
                                            onChange={handleChange}
                                            name="email"
                                            value={input.email}
                                            type="email"
                                            placeholder="name@example.com" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingPassword" label="Password" className='mb-4'>
                                        <Form.Control
                                            onChange={handleChange}
                                            name="password"
                                            value={input.password}
                                            type="password"
                                            placeholder="Password" />
                                    </FloatingLabel>

                                    <button onClick={signIn} className="btn btn-outline-light btn-lg mb-4" type="submit">Login</button>
                                    {error && <div class="alert alert-danger" role="alert">
                                        Your email or password is incorrect
                                    </div>}
                                    {loading && <Loading />}
                                    {success && currentUser !== null && <Navigate to="/" />}
                                </div>
                                <div>
                                    <p className="mb-0">Don't have an account? <Link className="signUpLink" to="/register">Sign Up</Link>
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
