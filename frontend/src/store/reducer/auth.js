import * as actionTypes from '../action/actionTypes'

const initialState = {
    authenticated:false,
    dataUser:null
}

export const authReducer = (state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.SAVE_AUTH:
            return {
                authenticated:true,
                dataUser:action.payload
            }
        case actionTypes.REMOVE_AUTH:
            return {
                authenticated:false,
                dataUser:null
            }
        default:
            return state;
    }
}

