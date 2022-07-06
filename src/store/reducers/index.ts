import { combineReducers } from "redux";
import { fetchProductsReducer } from './products';

export const reducers = combineReducers({
    products: fetchProductsReducer,
  })
