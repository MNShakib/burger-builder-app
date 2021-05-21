import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad:10,
    cheese:20,
    meat:30,
    bacon:15
};

const addIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1};
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = { 
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatingIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] - 1};
    const updatingIngredients = updateObject(state.ingredients, updatingIngredient);
    const updatingState = { 
        ingredients: updatingIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatingState);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false
    })
}

const fetchIngredientFailed = (state, action) => {
    return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
        case actionTypes.FETCHING_INGREDIENTS_Failed: return fetchIngredientFailed(state, action);
        default: return state
    }
}

export default reducer;