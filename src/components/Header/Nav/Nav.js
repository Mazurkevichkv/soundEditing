import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';
import routes from '../../Routes/Routes.const';

export default () => {
    return (
        <ul className="flex centered nav">
            <NavLink
                className="nav-link"
                activeClassName="nav-link--active"
                to={routes.HOME}
                exact
            >
                MIDI
            </NavLink>
            <NavLink
                className="nav-link"
                activeClassName="nav-link--active"
                to={routes.MP3}
            >
                MP3
            </NavLink>
            <NavLink
                className="nav-link"
                activeClassName="nav-link--active"
                to={routes.WAVEFORM}
            >
                WAVEFORM
            </NavLink>
        </ul>
    );
};
