import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import MP3 from '../../pages/MP3/MP3';
import Waveform from '../../pages/Waveform/Waveform';
import PrivateRoute from '../HOC/PrivateRoute/PrivateRoute';
import routes from './Routes.const';

export default () => (
    <Switch>
        <Route exact path={routes.HOME} component={Home} />
        <Route exact path={routes.MIDI} component={Home} />
        <Route exact path={routes.MP3} component={MP3} />
        <Route exact path={routes.WAVEFORM} component={Waveform} />
        <PrivateRoute component={PageNotFound} />
    </Switch>
);
