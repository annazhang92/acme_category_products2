import React, { Component } from 'react';
import store, { saveUser,deleteUser }  from './store';


class UserForm extends Component{
    constructor(props){
      super(props); //was ist das???
      const user = this.findUser(); 
      this.state = {
        input: user ? user.name : '' 
      };

      this.onSave=this.onSave.bind(this)
      this.onChangeName=this.onChangeName.bind(this)
      this.onDestroy=this.onDestroy.bind(this)
    }
    findUser(){
        return store.getState().users.find( user=> user.id === this.props.id);
      }
    componentWillUnmount(){
      this.unsubscribe();
    }
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> {
            const user = this.findUser();
            if(user){
              this.setState({ input: user.name });
            }
          });//was is das?????
    }

    // componentWillReceiveProps(nextProps){
    //     if(!nextProps.id){
    //       this.setState({ name: '' });
    //     }
    //   } //was is das?????

    onChangeName(ev){
        this.setState({ input: ev.target.value });
      }

      onDestroy(ev){
        ev.preventDefault();
        console.log(store.getState())
        deleteUser(this.props.id)
        .then(()=> {
          this.props.history.push('/');
        });
      }

    // onSave(ev){
    //     ev.preventDefault();
    //     const user={name:this.state.input};
    //     console.log(store.getState());
    //     createUser(user)
    //       .then(()=> {
    //         this.props.history.push('/');
    //       });
    //   }

    onSave(ev){
        ev.preventDefault();
        console.log(store.getState())
        const user = { id: this.props.id, name: this.state.input };
        saveUser(user)
          .then(()=> {
            this.props.history.push('/');
          });
      }

      render(){
        const { onChangeName, onSave, onDestroy } = this;
        const { input } = this.state;
        const { id } = this.props;
        return (
          <div>
          <form onSubmit={ onSave }>
            <input value={ input } onChange={ onChangeName }/>
            <button>{ id ? ('Update') : ('Create') }</button>
          </form>
          {
            id && (
              <button onClick={ onDestroy }>Delete</button>
            )
          }
          </div>
        );
      }

//   render(){
//     const { onChangeName, onSave, onDestroy } = this;
//     const { name } = this.state;
//     const { id } = this.props;
//     return (
//       <div>
//       <form onSubmit={ onSave }>
//         <input value={ name } onChange={ onChangeName }/>
//         <button>{ id ? ('Update') : ('Create') }</button>
//       </form>
//       {
//         id && (
//           <button onClick={ onDestroy }>Delete</button>
//         )
//       }
//       </div>
//     );
//   }
  };
  
  export default UserForm;
