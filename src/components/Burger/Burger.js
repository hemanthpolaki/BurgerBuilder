import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let countOfIngTypes = 0;
    let ingredientsChoosen = Object.keys(props.ingredients).map(igKey => {
        if (props.ingredients[igKey] > 0) countOfIngTypes++;
        return [...Array(props.ingredients[igKey])].map( (_, idx) => {
            return <BurgerIngredient type={igKey} key={igKey + idx} />
        });
    });

    if (countOfIngTypes === 0) {
        ingredientsChoosen = <p>Start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            { ingredientsChoosen }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;