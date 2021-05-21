import React, { Component } from 'react';
import './Auth.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({controls: updatedControls});
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    componentDidMount = () => {
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                defaultValue={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                change={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));

        if(this.props.loading){
            form = <Spinner />;
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{ this.props.error.message }</p>
            );
        }

        let redirect = null;
        if(this.props.isAuthenticated){
            redirect = <Redirect to={ this.props.authRedirectPath }/>;
        }
        return (
            <div className="Auth">
                { redirect }
                { errorMessage }
                <form onSubmit={ this.submitHandler }>
                    { form }
                    <Button btnType="Button Success">SUBMIT</Button>
                </form>
                <Button btnType="Button Danger" clicked={this.switchModeHandler}>SWITCH TO {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);