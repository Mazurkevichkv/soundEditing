import React from 'react';
import './PageNotFound.scss';

export default () => {
    return (
        <section className="page-not-found flex centered">
            <span role="img" aria-label="beer">
                Page not found &#127867;
            </span>
        </section>
    );
};
