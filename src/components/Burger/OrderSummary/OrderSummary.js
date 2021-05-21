import React from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}><span style={{textTransform: 'Capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>)
        });
        
    return (
        <Auxi>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: Rs. {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Button Danger" clicked={props.purchaseClosed}>CANCEL</Button>
            <Button btnType="Button Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxi>
    )
};

export default orderSummary;