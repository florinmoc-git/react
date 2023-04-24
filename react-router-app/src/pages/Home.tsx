import React from 'react'
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>HomePage</h1>
            <p><Link to={'products'}>Products</Link></p>
        </div>
    )
}

export default HomePage;
