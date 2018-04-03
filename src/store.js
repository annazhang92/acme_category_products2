import { createStore, combineReducers,applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const categorysReducer = (state=[], action)=> {
    switch(action.type){
      case 'SET_CATEGORYS':
        state = action.categorys;
        break;
        case 'CREATE_CATEGORY':
        state = [...state, action.category];
        break;
        case 'DESTROY_CATEGORY':
        state = state.filter( category=> category.id !== action.category.id); 
        break;
    }
    return state;
  };

  const productsReducer = (state=[], action)=> {
    switch(action.type){
      case 'SET_PRODUCTS':
        state = action.products;
        break;
        case 'CREATE_USER':
        state = [...state, action.user];
        break;
        case 'DESTROY_PRODUCT':
        state = state.filter( product=> product.id !== action.product.id); 
        break;
    }
    return state;
  };
  
  const reducer = combineReducers({
    categorys: categorysReducer,
    products: productsReducer
  });
  
  const store = createStore(reducer,applyMiddleware(thunk));


  // const saveUser = (user)=> {
  //   const { id } = user;
  //   const method = id ? 'put' : 'post';
  //   const action = id ? 'UPDATE_USER' : 'CREATE_USER';
  //   const url = `/api/users/${ id ? id : ''}`;
  //   return axios[method](url, user)
  //   .then( result => result.data)
  //   .then( user => store.dispatch({
  //     type: action,
  //     user
  //   }))
  // }

  const deleteCategory = (id,history)=> {
    return (dispatch)=> {
    return axios.delete(`/api/categorys/${id}`) 
    .then( result => result.data)
    .then( () => store.dispatch({
      type: 'DESTROY_CATEGORY',
      category: { id  }
    }))
    .then( ()=> history.push('/'));
  }
  }

  const deleteProduct = (id,history)=> {
    return (dispatch)=> {
    return axios.delete(`/api/products/${id}`) 
    .then( result => result.data)
    .then( () => store.dispatch({
      type: 'DESTROY_PRODUCT',
      product: { id  }
    }))
  }
  }

  const createCategory = ()=> {
    return (dispatch)=> {
    return axios.post('/api/categorys/')
    .then( result => result.data)
    .then( category => store.dispatch({
      type: 'CREATE_CATEGORY',
      category
    }))
    // .then( ()=> history.push('/'));
  }
}


  export default store;
  export { createCategory,deleteCategory,deleteProduct};