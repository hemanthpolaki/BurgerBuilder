import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import ControlIngredients from '../../components/Burger/ControlIngredients/ControlIngredients';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 10,
    bacon: 7,
    cheese: 10,
    meat: 30
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        basePrice: 30,
        totalPrice: 30,
        isPurchasable: false,
        purchasing: false,
        orderLoading: false
    };

    addIngredientHandler = (type) => {
        const oldQuantity = this.state.ingredients[type];
        const newQuantity = oldQuantity + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newQuantity;

        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        });
        this.updatePurchasableHandler(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldQuantity = this.state.ingredients[type];
        if (oldQuantity <= 0) return;

        const newQuantity = oldQuantity - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newQuantity;

        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        });
        this.updatePurchasableHandler(updatedIngredients);
    }

    updatePurchasableHandler = (ingredients) => {
        const totalIngredients = Object.keys(ingredients)
        .map( (igKey) => { return ingredients[igKey]; })
        .reduce( (totalIngredients, el) => {
                return totalIngredients + el;
        }, 0);
        this.setState({isPurchasable: totalIngredients > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({orderLoading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Keerthana',
                email: 'test@test.com',
                address: {
                    drNo: '44-34-1/D',
                    line1: 'Nandagiri Nagar',
                    line2: 'Akkayyapalem',
                    city: 'Visakhapatnam',
                    zip: 530016
                }
            },
            deliveryMode: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({orderLoading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({orderLoading: false, purchasing: false});
            });
    }

    initialPriceHandler = () => {
        let updatedPrice = this.state.basePrice;
        const ingredients = this.state.ingredients;
        Object.keys(ingredients).forEach(ig => {
            updatedPrice += (ingredients[ig] * INGREDIENT_PRICES[ig]);
        });
        this.setState({totalPrice: updatedPrice});
    }

    render () {

        let buttonInfo = 0;
        let burger = <Spinner />;
        let orderSummary = <Spinner />;

        if (this.state.ingredients) {
            
            buttonInfo = {...this.state.ingredients};
            for(let key in buttonInfo) { buttonInfo[key] = Number(buttonInfo[key]) <= 0;}

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <ControlIngredients 
                        ingredients={this.state.ingredients}
                        added={this.addIngredientHandler}
                        removed={this.removeIngredientHandler}
                        buttonInfo={buttonInfo}
                        price={this.state.totalPrice}
                        isPurchasable={this.state.isPurchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>;
        }

        if (this.state.orderLoading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then( response => {
                this.setState({ingredients: response.data});
                this.initialPriceHandler();
                this.updatePurchasableHandler({...response.data});
            })
            .catch( error => {
                
            });
    }
}

export default withErrorHandler(BurgerBuilder, axios);