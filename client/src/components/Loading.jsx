import React from 'react'

export default function Loading() {
    return (
        <div className="spinner-border text-light" style={{width: "5rem", height: "5rem", marginTop: "20vh"}} aria-hidden="true" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}
