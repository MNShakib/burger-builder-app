import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it taste well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button btnType="Button Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Button Success" clicked={props.checkoutContinue}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;