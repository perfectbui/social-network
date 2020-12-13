import * as actionTypes from './actionTypes'

export const saveAuth = (dataUser) => {
    return {type:actionTypes.SAVE_AUTH, payload:dataUser}
}

export const removeAuth = () => {
    return {type:actionTypes.REMOVE_AUTH}
}