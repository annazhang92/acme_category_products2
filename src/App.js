import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import Products from './Products'
import UserForm from './UserForm'
import CategoryForm from './CategoryForm'
import Categorys from './Categorys'
import axios from 'axios'
import store from './store';
import { Provider } from 'react-redux';

const App =()=>{
    return(
        <Provider store={ store }>
        <Router>
        <div>
        <Categorys />
        <Switch>
            {/* <Route exact path='/products' component={ Products } /> */}
            <Route exact path='/categorys/:id' render={({ match, history })=> <CategoryForm id={ match.params.id*1} history={ history }/> } />
            <Route exact path='/users/:id' render={({ match, history })=> <UserForm id={ match.params.id*1} history={ history }/> } />
        </Switch>
        </div>
        </Router>
        </Provider>
    )
}

axios.get('/api/categorys')
.then( result => result.data)
.then( categorys => {
  store.dispatch({
    type: 'SET_CATEGORYS',
    categorys
  });
});

axios.get('/api/products')
.then( result => result.data)
.then( products => {
  store.dispatch({
    type: 'SET_PRODUCTS',
    products
  });
});
export default App;