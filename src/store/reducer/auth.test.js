import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer',() => {
    expect(reducer(undefined, {})).toEqual({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath:'/'
    });
    expect(reducer({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath:'/'
    },{
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'some-token',
        userId: 'some-user'
    })).toEqual({
        idToken: 'some-token',
        userId: 'some-user',
        error: null,
        loading: false,
        authRedirectPath:'/'
    })
});