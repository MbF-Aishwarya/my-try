import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    console.log(action, state);
    switch (action.type){
      case actionTypes.CREATE_NEW_CONTACT:
      return state.concat(action.contact);
      
      case actionTypes.REMOVE_CONTACT:
      return state.filter((data, i) => i !== action.id);

      case actionTypes.EDIT_CONTACT:
      return state.map((data, i) => i === action.id ? {...data, editing:!data.editing}:data);

      case actionTypes.UPDATE_CONTACT:
      return state.map((data, i) => {
      if(data.id === action.id.id)
         {
          return{
            ...data,
            name:action.id.name,
            number:action.id.number,
            editing:!data.editing
          }
        }
        else return data;
      });
      default:
      return state;
    }
  };

  