import React from 'react';

import classes from './ControlIngredients.css';
import ControlIngredient from './ControlIngredient/ControlIngredient';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const controlIngredients = props => {

    return (
        <div className={classes.ControlIngredients}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map( element => { 
                return <ControlIngredient 
                    key={element.label} 
                    label={element.label}
                    added={() => props.added(element.type)}
                    removed={() => props.removed(element.type)}
                    buttonStatus={props.buttonInfo[element.type]}/>
            }) 
        }
        <button 
            className={classes.OrderButton}
            disabled={!props.isPurchasable}
            onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
}

export default controlIngredients;