import React from 'react';

export default function Footer() {
    const date = new Date();
    return (
        <footer className="text-center mt-5" style={{backgroundColor: "#ffa500"}}>
            <div className="text-center p-3">
                <p className="text-dark">© {date.getFullYear()} TENBIN Ramen</p>
                <p className="text-dark" >Made with ❤️ by Po</p>
            </div>
        </footer>
    )
}
