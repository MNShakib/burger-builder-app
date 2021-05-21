import React, { Component } from 'react'
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Logout from './container/Auth/Logout/Logout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent.js/asyncComponent';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./container/BurgerBuilder/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./container/BurgerBuilder/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./container/Auth/Auth');
})

class App extends Component{

  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }

  render() {
    
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
      );

      if( this.props.isAuthenticated ){
        routes = (
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
        )
      }

    return (
    <div>
      <Layout>
        { routes }
      </Layout>
    </div>
  )}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
