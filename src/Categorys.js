import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store,{createCategory} from './store';
import { connect } from 'react-redux';

const Categorys = ({categorys,handleSubmit})=> {

      const CategorysList = categorys.map( category => {
        return (
          <li key={ category.id }>
            <Link to={`/categorys/${category.id}`}>
              { category.name }
            </Link>
          </li>
        );
      })
      //
      const newProduct ={
        name:Math.floor(Math.random()*100)+'Category'
      }

      return (
        <div>
        <button onClick={handleSubmit}>Add A Category</button>
        <ul>
        {CategorysList}
        </ul>
        </div>
      );
  }
  
  const mapStateToProps = ({ categorys })=> {
    return {
      categorys
    };
  };
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      handleSubmit: ()=> dispatch(createCategory()),
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(Categorys);

