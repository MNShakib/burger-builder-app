import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-details');
    }

    render() {
        let summary = <Redirect to="/"/>;
        const purchasedRedirect = this.props.purchased?<Redirect to="/"/>:null;

        if(this.props.ings!==null){
            summary = (<React.Fragment>
                        {purchasedRedirect}
                        <CheckoutSummary 
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinue={this.checkoutContinueHandler}
                            ingredients={this.props.ings}/>
                        <Route path={this.props.match.path + '/contact-details'} 
                            component={ContactData}/>
                    </React.Fragment>);
        }

        return(
            <div>
               {summary} 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);