import { FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, ActionType, Product } from '../../types/index';

const initialState = {
  isFetching : false,
  products : [],
  errorMessage : undefined,
}

export const fetchProductsReducer = (state = initialState, action: ActionType) => {
  
  switch(action.type) {
    case FETCH_PRODUCTS_START:
      return  {
        ...state,
        isFetching: true
      };
   
    case FETCH_PRODUCTS_SUCCESS:
      return {
        errorMessage: undefined,
        isFetching: false,
        products: action.payload
      };
    
    case FETCH_PRODUCTS_ERROR: 
      return {
        products: [],
        isFetching: false,
        errorMessage: action.payload
      };
    
    default: 
      return state;
  }
}
