import React, { Component } from 'react';
import store, { saveUser,deleteCategory,deleteProduct }  from './store';
import { connect } from 'react-redux';

const CategoryForm = ({category,handleDelete,id,newproducts,handleDeleteProduct})=>{
  const ProductsList = newproducts.map( product => {
    return (
      <li key={ product.id }>
          { product.name }
          <button onClick={()=>handleDeleteProduct(product.id)}>Delete Product</button>
      </li>
    );
  })


    return (
      <div>
        {category&&<h1>{category.name}</h1>}
        {newproducts&&<p>There are {newproducts.length} in this category</p>}
        {ProductsList}
        <p></p>
        <button onClick={()=>handleDelete(id)}>Delete Category</button>
      </div>
    );
  }

  
  const mapStateToProps = ({ categorys,products }, { id })=> {
    const category = categorys.find( category => category.id === id);
    const newproducts = products.filter(product=>product.categoryId===id)
    return {
      category,
      newproducts

    };
  }
  
  const mapDispatchToProps = (dispatch, { history })=> {
    return {
      // saveUser: (user)=> dispatch(saveUser(user, history)),
      handleDelete: (id)=> dispatch(deleteCategory(id, history)),
      handleDeleteProduct:(id)=> dispatch(deleteProduct(id, history))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);