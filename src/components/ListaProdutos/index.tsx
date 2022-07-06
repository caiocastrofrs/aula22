import { Product } from "../../types";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProductsStarted, fetchProductsThunk, filterProductsThunk } from '../../store/actions/products.actions';
import { useEffect, useState } from 'react';
import store from '../../store/index';

interface RootState {
  products: Product[]
}
  
const ListaProdutos = () => {
  const [content, setContent] = useState<string | Product[]>(""); 
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const productsState = store.getState().products;
 
  useEffect(()=> {
    store.dispatch(fetchProductsStarted());
    fetchProductsThunk()(dispatch);
  },[]);

  const inputHandler = (value: string) => {
    setFilterValue(value);
  }

  const buttonHandler = () => {
    
    if(!filterValue) {
      fetchProductsThunk()(dispatch);
    } else {
      filterProductsThunk(filterValue)(dispatch);
    }
        
  }

  const clearFilter = () => {
    setFilterValue("");
  }
  return (

    <>
    <ol>
      {productsState.isFetching && 
        <li>"Carregando..."</li>
      }
    
      {productsState.errorMessage && 
        <li>`Mensagem de erro: ${productsState.errorMessage}`</li>
      }
    
      {productsState.products && 
        productsState?.products.map((product: Product) => <li key={product.id}>{product.title}</li>)
      }
    </ol>
    <div>
      <input className="txt-input" type="text" value={filterValue} onChange={(e) => inputHandler(e.target.value)} />
      <button className="btn-filter" onClick={buttonHandler}>Filtrar</button>
      <button className="btn-filter" onClick={clearFilter}>Limpar filtro</button>
    </div>
    </>
      )
}

const MapStateToProps = (state: RootState) => { 
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ fetchProductsThunk, filterProductsThunk }, dispatch)
}
export default connect(MapStateToProps, mapDispatchToProps)(ListaProdutos);
