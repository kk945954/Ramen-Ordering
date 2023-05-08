import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { addToCart } from '../features/cartSlice';

export default function Ramen({ ramen }) {
    const [size, setSize] = useState("Regular");
    const [quantity, setQuantity] = useState(1);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    function addSize(e) {
        setSize(() => e.target.value);
    };

    function addQuantity(e) {
        setQuantity(() => parseInt(e.target.value));
    };

    function addtoCart() {
        dispatch(addToCart({ ramen, quantity, size }));
    }

    return (
        <div className='col-md-3 m-1'>
            {ramen &&
                <div className='ramen-container shadow-sm p-2 mb-2 rounded'>
                    <div onClick={handleShow}>
                        <h2>{ramen.name}</h2>
                        <img src={ramen.image} className='img-fluid d-block mx-auto' title='Click me for more info!' />
                    </div>
                    <div className='flex-container'>
                        <div className='w-100 m-2'>
                            <p className='size'>Size:</p>
                            <select className='form-select' value={size} onChange={addSize}>
                                {ramen.size.map((eachSize, index) => {
                                return (<option key={index} value={eachSize}>
                                        {eachSize}
                                    </option>);
                                })}
                            </select>
                        </div>
                        <div className='w-100 m-2'>
                            <p className='quantity'>Quantity: </p>
                            <select className='form-select' value={quantity} onChange={addQuantity}>
                                {[...Array(10).keys()].map((x, index) => {
                                    return (<option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>);
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='flex-container'>
                        <div className='w-100 m-2'>
                            <p className='price'>Price: ${ramen.price[0][size] * quantity}</p>
                        </div>
                        <div className='w-100 m-2'>
                            <button className='btn' onClick={addtoCart}>Add To Cart</button>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose} size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton style={{ backgroundColor: '#ffa500' }}>
                            <Modal.Title id="contained-modal-title-vcenter">{ramen.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#000000e2', color: 'white' }}>
                            {ramen.description}
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: '#000000e2' }}>
                            <p>Ingredients: {ramen.ingredients}</p>
                            <button className='btn' onClick={handleClose}>Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }
        </div>
    )
}
