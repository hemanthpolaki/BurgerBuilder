import React from 'react';

import classes from './ControlIngredient.css';

const controlIngredient = props => {
    return (
        <div className={classes.ControlIngredient}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                className={classes.Less} 
                onClick={props.removed}
                disabled={props.buttonStatus}>Remove</button>
            <button 
                className={classes.More} 
                onClick={props.added}>Add</button>
            <div>{props.quantity}</div>
        </div>
    );
}

export default controlIngredient;