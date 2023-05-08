import React from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addQuantity, substractQuantity, clearCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
    const cartState = useSelector(state => state.cart);
    // const userLoginState = useSelector(state => state.user.currentUser);

    // const isUserLoggedIn  = () => {
    //     if (userLoginState === null) {
    //         window.alert("Please login first");
    //     }
    // }

    const dispatch = useDispatch();
    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartState.cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <div className="start-your-order">
                        <Link to="/">
                            <ArrowCircleLeftIcon style={{ color: "#ffa500" }} />
                            <span>Start Your Order</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="titles">
                        <h3 className="product-title">Product</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {cartState.cartItems &&
                            cartState.cartItems.map((item) => {
                                return (<div className="cart-item" key={item._id}>
                                    <div className="cart-product">
                                        <img src={item.image} alt={item.name} />
                                        <div>
                                            <h3>{item.name} [{item.size}]</h3>
                                            <button onClick={() => {
                                                const id = item._id;
                                                const size = item.size;
                                                dispatch(removeFromCart({ id, size }));
                                            }}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">${item.price}</div>
                                    <div className="cart-product-quantity">
                                        <button onClick={() => {
                                            const id = item._id;
                                            const size = item.size;
                                            if (item.quantity === 1) {
                                                return dispatch(removeFromCart({ id, size }));
                                            }
                                            dispatch(substractQuantity({ id, size }));
                                        }}>-</button>
                                        <div className="count">{item.quantity}</div>
                                        <button onClick={() => {
                                            const id = item._id;
                                            const size = item.size;
                                            dispatch(addQuantity({ id, size }));
                                        }}>+</button>
                                    </div>
                                    <div className="cart-product-total-price">
                                        ${item.prices.toFixed(2)}
                                    </div>
                                </div>)
                            })}
                    </div>
                    <div className="cart-summary">
                        <button onClick={() => dispatch(clearCart())} className="clear-btn">
                            Clear Cart
                        </button>
                        <div className="cart-checkout">
                            <div className="subtotal">
                                <span>Subtotal :</span>
                                <span className="amount">${cartState.cartItems.map((item) => item.prices).reduce((a, b) => a + b, 0).toFixed(2)}</span>
                            </div>
                            <p>Taxes and shipping calculated at checkout</p>
                            <button onClick={() => window.alert("Checkout not available yet")}>Check Out</button>
                            <div className="continue-ordering">
                                <Link to="/">
                                    <ArrowCircleLeftIcon style={{ color: "#ffa500" }} />
                                    <span>Continue Ordering</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
