import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Nav from './Nav/Nav';
import routes from '../Routes/Routes.const';

export default () => {
    return (
        <header className="flex centered">
            <ul className="flex centered">
                <Nav />
            </ul>
            <div className="auth-menu">
                <Link to={routes.LOGIN}>Login</Link>
            </div>
        </header>
    );
};
