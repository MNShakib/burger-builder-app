import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}

export const setIngredient = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCHING_INGREDIENTS_Failed
    };
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://react-my-burger-a8d4f-default-rtdb.firebaseio.com/ingredients.json')
                .then( response => {
                    dispatch(setIngredient(response.data));
                })
                .catch((error) => {
                    dispatch(fetchIngredientFailed());
                })
    }
}