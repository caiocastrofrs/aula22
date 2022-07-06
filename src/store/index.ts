import { legacy_createStore as createStore, applyMiddleware, compose} from "redux";
import { reducers } from './reducers/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    composeWithDevTools()));

export default store;
