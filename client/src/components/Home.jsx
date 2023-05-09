import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ramen from './Ramen';
import { getAllRamens } from '../features/ramenSlice';
import Loading from './Loading';

function Home() {

    const { items, loading, error } = useSelector((state) => state.ramen);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!items || items.length === 0) {
            dispatch(getAllRamens());
        }
    }, [dispatch, items]);

    return (
        <div className='row justify-content-center'>

            {loading ? <Loading /> : error ? 
            (<h1 style={{color: 'white'}}>Something went wrong</h1>) : (
                items && items.map((eachRamen, index) => {
                    return (
                        <Ramen
                            key={index}
                            ramen={eachRamen}
                        />
                    );
                })
            )}
        </div>
    )
}

export default Home