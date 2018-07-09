import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.CREATE_NEW_CONTACT:
      return [
        ...state,
        Object.assign({}, action.contact)
      ];
      case actionTypes.REMOVE_CONTACT:
      return state.filter((data, i) => i !== action.id);
      default:
            return state;
      case actionTypes.UPDATE_CONTACT:
      return state.map((data, i) => i === action.id ? {...data, editing:!data.editing}:data);
    }
  };