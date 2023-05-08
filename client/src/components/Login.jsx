import React, { useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/userSlice';
import Loading from './Loading';

export default function Login() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const { loading, error } = userState;
    const [input, setInput] = React.useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            window.location.href = "/";
        }
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const signIn = (e) => {
        dispatch(loginUser(input));
        console.log(input);
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


                                </div>

                                <div>
                                    <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50">Sign Up</a>
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
