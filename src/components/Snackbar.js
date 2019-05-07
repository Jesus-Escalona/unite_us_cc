import React from 'react';

function Snackbar(props) {
    const {show} = props;
    return (
        <div className={`snackbar ${show.length ? "show" : ""}`}>
            <h2>{show}</h2>
        </div>
    );
}

export default Snackbar;
