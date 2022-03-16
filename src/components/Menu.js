import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <nav>
                <Link to='/MovieList'>All Movies</Link> |{" "}
                <Link to='/AddMovie'>Add movie</Link>
            </nav>
            <Outlet />
        </div>
    )
}

export default Menu;