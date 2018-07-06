import { createStore } from 'redux';
import rootReducer from '../reducers';


export default function configureStore(InitialState){
	return  createStore(rootReducer,InitialState);
}