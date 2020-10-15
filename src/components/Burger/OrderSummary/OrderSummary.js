import React from 'react';

import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const orderDetails = Object.keys(props.ingredients)
        .map( (igKey) => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });
    return (
        <Aux>
            <h3>Your Order details</h3>
            <p>Burger looks DELICIOUS with following ingredients!</p>
            { orderDetails }
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Ready to checkout?</p>
            <Button clicked={props.purchaseContinue} btnType={"Success"}>CONTINUE</Button>
            <Button clicked={props.purchaseCancel} btnType={"Danger"}>CANCEL</Button>
        </Aux>
    );
}

export default orderSummary;