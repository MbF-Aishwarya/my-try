import { combineReducers } from 'redux';
import contacts from './contactReducer';
import numbers from './contactReducer';

export default combineReducers({
    contacts: contacts,
   numbers:numbers
});