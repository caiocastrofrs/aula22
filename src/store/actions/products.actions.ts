import { FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, Product } from "../../types";

export const fetchProductsStarted = () => ({ type: FETCH_PRODUCTS_START })

export const fetchProductsSuccess = (products: Product[]) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: products })

export const fetchProductsError = (errorMessage: string) => ({type: FETCH_PRODUCTS_ERROR, payload: errorMessage}) 

  export const fetchProductsThunk = () => async (dispatch: any) => {
  dispatch(fetchProductsStarted());

  try {
    const response  = await fetch('http://localhost:3001/products');
    const data = await response.json();
    dispatch(fetchProductsSuccess(data));
  
  } catch(error: any) {
    dispatch(fetchProductsError(error.message));
  }
}

export const filterProductsThunk = (filter: string) => async (dispatch: any) => {
  
  try {
    const response  = await fetch(`http://localhost:3001/products?title_like=${filter}`);
    const data = await response.json();
    dispatch(fetchProductsSuccess(data));
  } catch(error: any) {
    dispatch(fetchProductsError(error.message))
  }
}
