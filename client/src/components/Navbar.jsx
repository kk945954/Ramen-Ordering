import React from 'react';
import libraImg from '../assets/libra.png';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {logoutUser} from '../features/userSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        fontSize: '12px',
        right: 0,
        top: 9,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const Navbar = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const currentUser = useSelector((state) => state.user.currentUser);
    return (
        <nav className="navbar navbar-expand-lg shadow p-3 mb-5">
            <div className="container-fluid">
                <img src={libraImg} alt="logo" style={{ width: '75px', height: '75px', margin: '0 8px' }} />
                <a href="/" className="navbar-brand">TENBIN Ramen</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Menu</a>
                        </li> */}
                        <li className="nav-item">
                            {currentUser
                                ? <div className="dropdown">
                                    <h3 className="dropdown-toggle m-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {currentUser.name}
                                    </h3>
                                    <ul className="dropdown-menu dropdown-menu-dark m-2">
                                        <li><a className="dropdown-item" onClick={() => dispatch(logoutUser())} href="#">Logout</a></li>
                                    </ul>
                                </div>
                                : <a className="nav-link" aria-current="page" href="/login">Login</a>}
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Cart</a>
                        </li> */}
                    </ul>
                    <Link to="/cart">
                        <IconButton >
                            <StyledBadge badgeContent={cartState.cartItems.map((item) => item.quantity).reduce((a, b) => a + b, 0)} color="secondary">
                                <ShoppingCartIcon style={{ fontSize: "35px" }} />
                            </StyledBadge>
                        </IconButton>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;