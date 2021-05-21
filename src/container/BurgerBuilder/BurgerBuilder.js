import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

    state={ 
        purchasable:false,
        purchasing:false
    }

    componentDidMount(){
        this.props.onInitIngredient();
    }

    updatePurchaseState (ingredients) {
        let sum = Object.values(ingredients)
        sum=sum.reduce((total, ele)=>{return total+ele},0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({ pathname:'/checkout' });
    }

    render() {
        const disabledInfo={
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burger =this.props.error?<p>Some Error!!</p>:<Spinner/>;
        if(this.props.ings){
            burger = (<Auxi>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}
                    price={this.props.price}
                    isAuth={this.props.isAuthenticated}
                    purchasable={this.updatePurchaseState(this.props.ings)}/>
            </Auxi>);
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings}
                                purchaseClosed={this.purchaseCancelHandler}
                                purchaseContinue={this.purchaseContinueHandler}
                                totalPrice={this.props.price}>
                            </OrderSummary>
        }

        if(this.state.loading){
            orderSummary=<Spinner/>;
        }

        return (
            <Auxi>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    {burger}
            </Auxi>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        buildingBurger: state.burgerBuilder.building,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));